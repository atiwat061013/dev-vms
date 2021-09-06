import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VmscomeinPage } from './vmscomein.page';

describe('VmscomeinPage', () => {
  let component: VmscomeinPage;
  let fixture: ComponentFixture<VmscomeinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmscomeinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VmscomeinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
