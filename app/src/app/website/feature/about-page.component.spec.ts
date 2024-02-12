import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { AboutPageComponent } from './about-page.component';

describe('AboutPageComponent', () => {
  beforeEach(() => MockBuilder(AboutPageComponent, null));

  it('should create', () => {
    const fixture = MockRender(AboutPageComponent);

    const component = fixture.point.componentInstance;
    expect(component).toBeTruthy();
  });

  it('has a heading', () => {
    MockRender(AboutPageComponent);

    const el = ngMocks.find('h1');
    expect(el).toBeTruthy();
    expect(el.nativeElement.textContent).toContain('About');
  });
});
