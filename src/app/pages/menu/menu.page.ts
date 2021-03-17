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
    // {
    //   title: 'Chack-In',
    //   url: '/menu/chackin',
    //   icon: 'log-in-outline'
    // },
    // {
    //   title: 'Chackout',
    //   url: '/menu/chackout',
    //   icon: 'log-out-outline'
    // },
    // {
    //   title: 'Visitormanage',
    //   url: '/menu/visitormanage',
    //   icon: 'person-outline'
    // },

    {
      title: 'Visitormanage',
      children: [
        {
          title: 'เข้าพื้นที่ทั้งหมดวันนี้',
          url: '/menu/vmscomein',
          icon: 'logo-ionic'
        },
        {
          title: 'ออก จากพื้นที่ทั้งหมดวันนี้',
          url: '/menu/vmsout',
          icon: 'logo-ionic'
        },
        {
          title: 'ยังอยู่ในพื้นที่',
          url: '/menu/vmsinarea',
          icon: 'logo-ionic'
        },
        {
          title: 'ยังอยู่ในพื้นที่ มากกว่าหนึ่งวัน',
          url: '/menu/vmsinareamore',
          icon: 'logo-ionic'
        },
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
