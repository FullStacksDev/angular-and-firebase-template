import { Component, Input } from '@angular/core';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { LoginFormComponent } from './login-form.component';

@Component({
  standalone: true,
  template: `<app-login-form [processing]="processing" />`,
  imports: [LoginFormComponent],
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
    MockRender(TestComponent);

    const el = ngMocks.find('form');
    expect(el).toBeTruthy();
  });

  it('renders the progress bar when processing', () => {
    MockRender(TestComponent, { processing: true });

    const el = ngMocks.find('mat-progress-bar');
    expect(el).toBeTruthy();
  });
});
