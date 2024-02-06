import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { LoaderShellComponent } from './loader-shell.component';

describe('LoaderShellComponent', () => {
  beforeEach(() => MockBuilder(LoaderShellComponent, null));

  it('should create', () => {
    const fixture = MockRender(LoaderShellComponent);

    const component = fixture.point.componentInstance;
    expect(component).toBeTruthy();
  });

  it('has a progress bar', () => {
    MockRender(LoaderShellComponent);

    const el = ngMocks.find('mat-progress-bar');
    expect(el).toBeTruthy();
  });
});
