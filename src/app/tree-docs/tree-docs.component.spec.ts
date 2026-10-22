import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeDocsComponent } from './tree-docs.component';

describe('TreeDocsComponent', () => {
  let component: TreeDocsComponent;
  let fixture: ComponentFixture<TreeDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeDocsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
