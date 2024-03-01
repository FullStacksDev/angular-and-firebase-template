import { FIREBASE_AUTH } from '@app-shared/firebase/auth';
import { MockBuilder, ngMocks } from 'ng-mocks';
import { LogoutService } from './logout.service';

describe('LogoutService', () => {
  beforeEach(() => MockBuilder(LogoutService).mock(FIREBASE_AUTH));

  it('should create', () => {
    const service = ngMocks.get(LogoutService);
    expect(service).toBeTruthy();
  });
});
