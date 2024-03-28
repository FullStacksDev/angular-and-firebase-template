import { MockBuilder, MockInstance, ngMocks } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthStore } from './auth.store';

describe('AuthStore', () => {
  MockInstance.scope();

  beforeEach(() => MockBuilder(AuthStore, null).mock(AuthService));

  it('should create', () => {
    MockInstance(AuthService, 'user$', of(null));

    const store = ngMocks.get(AuthStore);
    expect(store).toBeTruthy();
  });
});
