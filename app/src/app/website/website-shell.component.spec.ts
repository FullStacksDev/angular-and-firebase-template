import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { WebsiteShellComponent } from './website-shell.component';

describe('WebsiteShellComponent', () => {
  beforeEach(() => MockBuilder(WebsiteShellComponent, null));

  it('should create', () => {
    const fixture = MockRender(WebsiteShellComponent);

    const component = fixture.point.componentInstance;
    expect(component).toBeTruthy();
  });

  it('has a header', () => {
    MockRender(WebsiteShellComponent);

    const el = ngMocks.find('header');
    expect(el).toBeTruthy();
  });

  // TODO: test the `@defer` block once https://github.com/help-me-mom/ng-mocks/issues/7742 is resolved.
});
