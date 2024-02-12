import { FIREBASE_AUTH } from '@app-shared/firebase/auth';
import { RuntimeService } from '@app-shared/runtime.service';
import { MockBuilder, MockRender } from 'ng-mocks';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => MockBuilder(AuthService).mock(RuntimeService).mock(FIREBASE_AUTH));

  it('should be created', () => {
    const fixture = MockRender(AuthService);

    const service = fixture.point.componentInstance;
    expect(service).toBeTruthy();
  });
});
