import { Injectable } from '@angular/core';
import { injectAuth } from '@app-shared/firebase/auth';
import { signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  readonly #auth = injectAuth();

  async logOut(): Promise<void> {
    return signOut(this.#auth);
  }
}
