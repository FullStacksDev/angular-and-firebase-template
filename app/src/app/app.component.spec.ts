import { ServiceWorkerModule } from '@angular/service-worker';
import { MockBuilder, MockRender } from 'ng-mocks';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() =>
    MockBuilder(AppComponent, null).keep(ServiceWorkerModule.register('', { enabled: false }), {
      export: true,
    }),
  );

  it('should create the app', () => {
    const fixture = MockRender(AppComponent);

    const app = fixture.point.componentInstance;
    expect(app).toBeTruthy();
  });
});
