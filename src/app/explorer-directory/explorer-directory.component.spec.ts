import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerDirectoryComponent } from './explorer-directory.component';

describe('ExplorerDirectoryComponent', () => {
  let component: ExplorerDirectoryComponent;
  let fixture: ComponentFixture<ExplorerDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerDirectoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
