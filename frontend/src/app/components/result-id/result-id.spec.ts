import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultId } from './result-id';

describe('ResultId', () => {
  let component: ResultId;
  let fixture: ComponentFixture<ResultId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultId]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultId);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
