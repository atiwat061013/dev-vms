import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VmsoutPage } from './vmsout.page';

describe('VmsoutPage', () => {
  let component: VmsoutPage;
  let fixture: ComponentFixture<VmsoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmsoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VmsoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
