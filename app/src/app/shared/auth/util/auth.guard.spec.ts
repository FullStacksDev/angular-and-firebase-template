import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';
import { RuntimeService } from '@app-shared/runtime.service';
import { MockBuilder } from 'ng-mocks';
import { AuthStore } from '../data/auth.store';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard('authed')(...guardParameters));

  beforeEach(() => MockBuilder().mock(RuntimeService).mock(AuthStore));

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
