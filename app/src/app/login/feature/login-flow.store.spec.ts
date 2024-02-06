import { ActivatedRoute, Router } from '@angular/router';
import { MockBuilder, MockRender } from 'ng-mocks';
import { LoginService } from '../data/login.service';
import { LoginFlowStore } from './login-flow.store';

describe('LoginFlowStore', () => {
  beforeEach(() =>
    MockBuilder(LoginFlowStore).mock(LoginService).mock(ActivatedRoute).mock(Router),
  );

  it('should be created', () => {
    const fixture = MockRender(LoginFlowStore);

    const service = fixture.point.componentInstance;
    expect(service).toBeTruthy();
  });
});
