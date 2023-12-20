import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteShellComponent } from './website-shell.component';

describe('WebsiteShellComponent', () => {
  let component: WebsiteShellComponent;
  let fixture: ComponentFixture<WebsiteShellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WebsiteShellComponent],
    });
    fixture = TestBed.createComponent(WebsiteShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
