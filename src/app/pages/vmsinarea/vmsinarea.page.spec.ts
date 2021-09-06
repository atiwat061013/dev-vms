import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VmsinareaPage } from './vmsinarea.page';

describe('VmsinareaPage', () => {
  let component: VmsinareaPage;
  let fixture: ComponentFixture<VmsinareaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmsinareaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VmsinareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
