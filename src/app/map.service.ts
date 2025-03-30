import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { getLocalStorage } from 'ngx-webstorage/lib/core/nativeStorage';
import { HomePageComponent } from "../app/components/home-page/home-page.component";

@Injectable({
  providedIn: 'root'
})
export class MapService {


  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v10';
  lat = 18;
  lng = 79;
  zoom = 6.5
  
  constructor() {
    mapboxgl.accessToken = "pk.eyJ1IjoidmlqYXkyOTA0IiwiYSI6ImNrY2QzMDlhdDA2NXoycHF4ZHp2cGdvb2UifQ.vFdym8mvg3_XaR66mUFeHA";
  }
  buildMap(allCases:any) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    })
    
    this.map.addControl(new mapboxgl.NavigationControl());
        allCases.forEach(cases => {
          this.map.on('mouseenter', function() {
            this.map.getCanvas().style.cursor = 'pointer';
          })
        
          new mapboxgl.Marker({
            color:this.getColor(cases.activeCases)
          })
            .setLngLat([cases.longitude, cases.latitude])
            .addTo(this.map)
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
              cases.place + '<br>' +"Confirmed: " + cases.totalCases 
              + '<br>'+"Active cases:" +
              cases.activeCases+ '<br>'+"Recovered cases:" +
              cases.recoveredCases+ '<br>'+"Deceased cases:" +
              cases.deceasedCases
          ))
             
          
        }
          
        )        
  };
    
  

  getColor(active) {
    if(active > 3000) {
      return "red"
    } else if(active > 1000) {
      return "blue"
    } else {
      return "green"
    }
  }
  
  
}
