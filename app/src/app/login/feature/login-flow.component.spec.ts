import { signal } from '@angular/core';
import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';
import { buildRxMethodSpy } from '../../../testing/helpers';
import { LoginFlowComponent } from './login-flow.component';
import { LoginFlowStore } from './login-flow.store';

describe('LoginFlowComponent', () => {
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
