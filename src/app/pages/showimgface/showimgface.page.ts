import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-showimgface',
  templateUrl: './showimgface.page.html',
  styleUrls: ['./showimgface.page.scss'],
})
export class ShowimgfacePage implements OnInit {

  @Input() imgFaceurl: string;
  @Input() imgCardidurl: string;
  @Input() imgCarurl: string;
  @Input() imgCarnumurl: string;


  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log("test>>",this.imgCarnumurl);
    
  }

  
  async closeModal() {
    await this.modalController.dismiss();
  }

}
