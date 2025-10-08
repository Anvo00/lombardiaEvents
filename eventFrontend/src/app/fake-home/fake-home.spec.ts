import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeHome } from './fake-home';

describe('FakeHome', () => {
  let component: FakeHome;
  let fixture: ComponentFixture<FakeHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakeHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
