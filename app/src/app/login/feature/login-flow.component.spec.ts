import { signal } from '@angular/core';
import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';
import { buildRxMethodSpy } from '../../../test/helpers/ngrx';
import { LoginFlowComponent } from './login-flow.component';
import { LoginFlowStore } from './login-flow.store';

describe('LoginFlowComponent', () => {
  // See: https://github.com/help-me-mom/ng-mocks/issues/10217
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  MockInstance.scope();

  beforeEach(() => MockBuilder(LoginFlowComponent, null).mock(LoginFlowStore));

  it('should create', () => {
    const handleLoginLinkIfAvailableSpy = MockInstance(
      LoginFlowStore,
      'handleLoginLinkIfAvailable',
      buildRxMethodSpy('handleLoginLinkIfAvailable'),
    );
    MockInstance(LoginFlowStore, 'status', signal('idle' as const));

    const fixture = MockRender(LoginFlowComponent);

    const component = fixture.point.componentInstance;
    expect(component).toBeTruthy();
    expect(handleLoginLinkIfAvailableSpy).toHaveBeenCalled();
  });
});
