import { FIREBASE_AUTH } from '@app-shared/firebase/auth';
import { MockBuilder, MockRender } from 'ng-mocks';
import { LogoutService } from './logout.service';

describe('LogoutService', () => {
  beforeEach(() => MockBuilder(LogoutService).mock(FIREBASE_AUTH));

  it('should be created', () => {
    const fixture = MockRender(LogoutService);

    const service = fixture.point.componentInstance;
    expect(service).toBeTruthy();
  });
});
