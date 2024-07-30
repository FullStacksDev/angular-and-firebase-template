import { ActivatedRoute, Router } from '@angular/router';
import { MockBuilder, ngMocks } from 'ng-mocks';
import { LoginService } from '../data/login.service';
import { LoginFlowStore, LoginFlowStoreInstanceType } from './login-flow.store';

describe('LoginFlowStore', () => {
  beforeEach(() =>
    MockBuilder(LoginFlowStore).mock(LoginService).mock(ActivatedRoute).mock(Router),
  );

  it('should create', () => {
    const store = ngMocks.get<LoginFlowStoreInstanceType>(LoginFlowStore);
    expect(store).toBeTruthy();
  });
});
