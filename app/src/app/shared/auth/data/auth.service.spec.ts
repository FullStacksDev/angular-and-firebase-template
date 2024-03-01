import { FIREBASE_AUTH } from '@app-shared/firebase/auth';
import { RuntimeService } from '@app-shared/runtime.service';
import { MockBuilder, ngMocks } from 'ng-mocks';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => MockBuilder(AuthService).mock(RuntimeService).mock(FIREBASE_AUTH));

  it('should create', () => {
    const service = ngMocks.get(AuthService);
    expect(service).toBeTruthy();
  });
});
