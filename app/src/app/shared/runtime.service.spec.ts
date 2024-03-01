import { MockBuilder, ngMocks } from 'ng-mocks';
import { RuntimeService } from './runtime.service';

describe('RuntimeService', () => {
  beforeAll(() => MockBuilder(RuntimeService, null));

  it('should create', () => {
    const service = ngMocks.get(RuntimeService);
    expect(service).toBeTruthy();
  });

  it('should be running on the client', () => {
    const service = ngMocks.get(RuntimeService);
    expect(service.isServer).toBeFalse();
  });
});
