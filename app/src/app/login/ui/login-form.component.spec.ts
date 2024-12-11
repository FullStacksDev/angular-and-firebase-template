import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { LoginFormComponent } from './login-form.component';

@Component({
  imports: [LoginFormComponent],
  template: `<app-login-form [processing]="processing" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {
  @Input() processing = false;
}

describe('LoginFormComponent', () => {
  beforeEach(() =>
    MockBuilder(TestComponent, null).keep(LoginFormComponent, {
      shallow: true,
    }),
  );

  it('should create', () => {
    const fixture = MockRender(TestComponent);

    const component = fixture.point.componentInstance;
    expect(component).toBeTruthy();
  });

  it('renders the form', () => {
    const fixture = MockRender(TestComponent);

    const el = ngMocks.find(fixture, 'form');
    expect(el).toBeTruthy();
  });

  it('renders the progress bar when processing', () => {
    const fixture = MockRender(TestComponent, { processing: true });

    const el = ngMocks.find(fixture, 'mat-progress-bar');
    expect(el).toBeTruthy();
  });
});
