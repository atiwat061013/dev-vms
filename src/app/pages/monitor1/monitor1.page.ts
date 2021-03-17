import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var google;

var map = undefined;
var marker = undefined;
var position = [13.787885399739247, 100.7293631416505];

var numDeltas = 200;
var delay = 10; //milliseconds
var i = 0;
var deltaLat;
var deltaLng;


@Component({
  selector: 'app-monitor1',
  templateUrl: './monitor1.page.html',
  styleUrls: ['./monitor1.page.scss'],
})
export class Monitor1Page implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  
  

  constructor() {
    
  }

  ngOnInit() {
    this.loadMap();
  }



  loadMap() {
    var latlng = new google.maps.LatLng(position[0], position[1]);
    var myOptions = {
        zoom: 18,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);

    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: "Your current location!"
    });

    google.maps.event.addListener(map, 'click',  () => {
      var result = [13.787639723060378, 100.72843777954036];
      this.transition(result);
    });

  }
  transition(result){
    console.log("result >>",result)
        i = 0;
        deltaLat = (result[0] - position[0])/numDeltas;
        deltaLng = (result[1] - position[1])/numDeltas;
        this.moveMarker();
  }
  moveMarker() {
    position[0] += deltaLat;
    position[1] += deltaLng;
    console.log("resultmoveMarker >>",position[0])
    var latlng = new google.maps.LatLng(position[0], position[1]);
    marker.setTitle("Latitude:"+position[0]+" | Longitude:"+position[1]);
    marker.setPosition(latlng);
    for(i =0;i != numDeltas; i++){
        console.log("i >>>",i)
        setTimeout(this.moveMarker, delay);
    }
  }

}
