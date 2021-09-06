import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Dashboard',
      url: '/menu/dashboard',
      icon: 'podium-outline'
    },
    {
      title: 'Visitormanage',
      children: [
        {
          title: 'ประวัติ',
          url: '/menu/vmshistory',
          icon: 'logo-ionic'
        }
      ]
    }
  ];
  constructor() { }

  ngOnInit() {
  }



}
