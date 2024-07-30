import { MockBuilder, MockInstance, ngMocks } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthStore, AuthStoreInstanceType } from './auth.store';

describe('AuthStore', () => {
  MockInstance.scope();

  beforeEach(() => MockBuilder(AuthStore, null).mock(AuthService));

  it('should create', () => {
    MockInstance(AuthService, 'user$', of(null));

    const store = ngMocks.get<AuthStoreInstanceType>(AuthStore);
    expect(store).toBeTruthy();
  });
});
