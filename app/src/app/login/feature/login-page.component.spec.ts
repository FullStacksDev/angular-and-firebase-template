import { MockBuilder, MockRender } from 'ng-mocks';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  beforeEach(() => MockBuilder(LoginPageComponent, null));

  it('should create', () => {
    const fixture = MockRender(LoginPageComponent);

    const component = fixture.point.componentInstance;
    expect(component).toBeTruthy();
  });

  // TODO: test the `@defer` block once https://github.com/help-me-mom/ng-mocks/issues/7742 is resolved.
});
