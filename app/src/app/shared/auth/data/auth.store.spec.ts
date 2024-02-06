import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthStore } from './auth.store';

describe('AuthStore', () => {
  MockInstance.scope();

  beforeEach(() => MockBuilder(AuthStore).mock(AuthService));

  it('should be created', () => {
    MockInstance(AuthService, 'user$', of(null));

    const fixture = MockRender(AuthStore);

    const service = fixture.point.componentInstance;
    expect(service).toBeTruthy();
  });
});
