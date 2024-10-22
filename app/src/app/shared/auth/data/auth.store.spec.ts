import { MockBuilder, MockInstance, ngMocks } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthStore } from './auth.store';

describe('AuthStore', () => {
  // See: https://github.com/help-me-mom/ng-mocks/issues/10217
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  MockInstance.scope();

  beforeEach(() => MockBuilder(AuthStore, null).mock(AuthService));

  it('should create', () => {
    MockInstance(AuthService, 'user$', of(null));

    const store = ngMocks.get<AuthStore>(AuthStore);
    expect(store).toBeTruthy();
  });
});
