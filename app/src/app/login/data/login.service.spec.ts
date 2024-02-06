import { FIREBASE_AUTH } from '@app-shared/firebase/auth';
import { MockBuilder, MockRender } from 'ng-mocks';
import { LoginService } from './login.service';

describe('LoginService', () => {
  beforeEach(() => MockBuilder(LoginService, null).mock(FIREBASE_AUTH));

  it('should be created', () => {
    const fixture = MockRender(LoginService);

    const service = fixture.point.componentInstance;
    expect(service).toBeTruthy();
  });
});
