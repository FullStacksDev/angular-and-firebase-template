import { FIREBASE_AUTH } from '@app-shared/firebase/auth';
import { MockBuilder, ngMocks } from 'ng-mocks';
import { LoginService } from './login.service';

describe('LoginService', () => {
  beforeEach(() => MockBuilder(LoginService, null).mock(FIREBASE_AUTH));

  it('should create', () => {
    const service = ngMocks.get(LoginService);
    expect(service).toBeTruthy();
  });
});
