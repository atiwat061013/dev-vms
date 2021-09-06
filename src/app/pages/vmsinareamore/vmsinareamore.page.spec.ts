import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VmsinareamorePage } from './vmsinareamore.page';

describe('VmsinareamorePage', () => {
  let component: VmsinareamorePage;
  let fixture: ComponentFixture<VmsinareamorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmsinareamorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VmsinareamorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
