import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerAddFileComponent } from './explorer-add-file.component';

describe('ExplorerAddFileComponent', () => {
  let component: ExplorerAddFileComponent;
  let fixture: ComponentFixture<ExplorerAddFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerAddFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerAddFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
