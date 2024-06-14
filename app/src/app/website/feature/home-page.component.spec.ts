import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  beforeEach(() => MockBuilder(HomePageComponent, null));

  it('should create', () => {
    const fixture = MockRender(HomePageComponent);

    const component = fixture.point.componentInstance;
    expect(component).toBeTruthy();
  });

  it('has a heading', () => {
    const fixture = MockRender(HomePageComponent);

    const el = ngMocks.find(fixture, 'h1');
    expect(el).toBeTruthy();
    expect(ngMocks.formatText(el)).toContain(
      'This is the FullStacksDev Angular and Firebase template running on Firebase',
    );
  });
});
