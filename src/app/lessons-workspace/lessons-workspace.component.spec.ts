import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsWorkspaceComponent } from './lessons-workspace.component';

describe('LessonsWorkspaceComponent', () => {
  let component: LessonsWorkspaceComponent;
  let fixture: ComponentFixture<LessonsWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonsWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
