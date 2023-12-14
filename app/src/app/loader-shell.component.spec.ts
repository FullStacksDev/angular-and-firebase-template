import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderShellComponent } from './loader-shell.component';

describe('LoaderShellComponent', () => {
  let component: LoaderShellComponent;
  let fixture: ComponentFixture<LoaderShellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoaderShellComponent],
    });
    fixture = TestBed.createComponent(LoaderShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
