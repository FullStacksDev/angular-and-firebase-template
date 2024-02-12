import { Injectable } from '@angular/core';
import { injectAuth } from '@app-shared/firebase/auth';
import { createLogger } from '@app-shared/logger';
import {
  ActionCodeSettings,
  AuthError,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth';

const logger = createLogger('LoginService');

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly #auth = injectAuth();

  async triggerLoginLink(email: string, returnUrl: string): Promise<void> {
    try {
      const actionCodeSettings = {
        url: returnUrl,
        handleCodeInApp: true,
      } satisfies ActionCodeSettings;
      await sendSignInLinkToEmail(this.#auth, email, actionCodeSettings);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      this.handleFirebaseError(error);
    }
  }

  isLoginLink(url: string): boolean {
    return isSignInWithEmailLink(this.#auth, url);
  }

  async handleLoginLink(url: string, email: string): Promise<void> {
    try {
      if (this.isLoginLink(url)) {
        await signInWithEmailLink(this.#auth, email);
      } else {
        throw new Error('Invalid login link');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      this.handleFirebaseError(error);
    }
  }

  private handleFirebaseError(error: AuthError): string {
    logger.error('Firebase Auth error:', error);

    let message = 'Unknown error';

    if (error && error.code) {
      message = this.getAuthErrorMessageForCode(error.code);
    }

    throw new Error(message);
  }

  private getAuthErrorMessageForCode(code: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return `The email address you entered doesn't look right.`;
      case 'auth/network-request-failed':
        return `There may be a problem with your network or connection. Please try again when you're connected to the Internet.`;
      case 'auth/too-many-requests':
        return 'Logins from your device are currently being blocked. Please try again later.';
      case 'auth/user-disabled':
        return 'Your account has been disabled. Please contact us to find out more.';
      case 'auth/web-storage-unsupported':
        return (
          `Your browser doesn't support web storage (or it is disabled) - ` +
          `this is needed to log you in and store who you are on your device.`
        );
      case 'auth/invalid-action-code':
        return `The login link you clicked is invalid. Please request another and try again.`;
      case 'auth/expired-action-code':
        return `The login link you clicked has expired. Please request another and try again.`;
      default:
        return (
          `Sorry, something went wrong when logging you in. ` +
          `We've been notified about this. Please try again later in case it was a temporary issue.`
        );
    }
  }
}
