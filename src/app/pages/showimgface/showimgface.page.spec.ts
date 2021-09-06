import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowimgfacePage } from './showimgface.page';

describe('ShowimgfacePage', () => {
  let component: ShowimgfacePage;
  let fixture: ComponentFixture<ShowimgfacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowimgfacePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowimgfacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
