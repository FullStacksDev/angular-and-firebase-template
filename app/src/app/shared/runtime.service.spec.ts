import { MockBuilder, MockRender } from 'ng-mocks';
import { RuntimeService } from './runtime.service';

describe('RuntimeService', () => {
  beforeAll(() => MockBuilder(RuntimeService, null));

  it('should be created', () => {
    const fixture = MockRender(RuntimeService);

    const service = fixture.point.componentInstance;
    expect(service).toBeTruthy();
  });

  it('should be running on the client', () => {
    const fixture = MockRender(RuntimeService);

    const service = fixture.point.componentInstance;
    expect(service.isServer).toBeFalse();
  });
});
