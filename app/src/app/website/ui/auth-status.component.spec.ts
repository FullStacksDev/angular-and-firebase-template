import { signal } from '@angular/core';
import { AuthStore } from '@app-shared/auth/data/auth.store';
import { LogoutService } from '@app-shared/auth/data/logout.service';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';
import { AuthStatusComponent } from './auth-status.component';

describe('AuthStatusComponent', () => {
  // See: https://github.com/help-me-mom/ng-mocks/issues/10217
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  MockInstance.scope();

  beforeEach(() => MockBuilder(AuthStatusComponent, null).mock(AuthStore).mock(LogoutService));

  it('should create', () => {
    MockInstance(AuthStore, 'isAuthenticated', signal(false));

    const fixture = MockRender(AuthStatusComponent);

    const component = fixture.point.componentInstance;
    expect(component).toBeTruthy();
  });

  it('shows a log in link when not authenticated', () => {
    MockInstance(AuthStore, 'isAuthenticated', signal(false));

    const fixture = MockRender(AuthStatusComponent);

    const el = ngMocks.find(fixture, 'a');
    expect(el).toBeTruthy();
    expect(ngMocks.formatText(el)).toContain('Log in');
  });

  it('shows a log out button when authenticated', () => {
    MockInstance(AuthStore, 'isAuthenticated', signal(true));

    const fixture = MockRender(AuthStatusComponent);

    const el = ngMocks.find(fixture, 'button');
    expect(el).toBeTruthy();
    expect(ngMocks.formatText(el)).toContain('Log out');
  });
});
