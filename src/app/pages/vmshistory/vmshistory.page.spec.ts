import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VmshistoryPage } from './vmshistory.page';

describe('VmshistoryPage', () => {
  let component: VmshistoryPage;
  let fixture: ComponentFixture<VmshistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmshistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VmshistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
