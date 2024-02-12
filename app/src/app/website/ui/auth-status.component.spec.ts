import { signal } from '@angular/core';
import { AuthStore } from '@app-shared/auth/data/auth.store';
import { LogoutService } from '@app-shared/auth/data/logout.service';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';
import { AuthStatusComponent } from './auth-status.component';

describe('AuthStatusComponent', () => {
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

    MockRender(AuthStatusComponent);

    const el = ngMocks.find('a');
    expect(el).toBeTruthy();
    expect(el.nativeElement.textContent).toContain('Log in');
  });

  it('shows a log out button when authenticated', () => {
    MockInstance(AuthStore, 'isAuthenticated', signal(true));

    MockRender(AuthStatusComponent);

    const el = ngMocks.find('button');
    expect(el).toBeTruthy();
    expect(el.nativeElement.textContent).toContain('Log out');
  });
});
