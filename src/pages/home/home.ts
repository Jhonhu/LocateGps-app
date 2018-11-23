import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  styles: ['agm-map {  height: 400px;  }'],
  templateUrl: 'home.html',
})
export class HomePage {

  latitude:any;
  longitude:any;
  lat;
  lng;
  loader;

  options = {
        timeout: 3000,
        enableHighAccuracy: true,
        //maximumAge: 2000
      };

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
  ) {

    this.CurrentPosition();
    this.presentLoading(4000);

  }

  presentLoading(time) {
   this.loader = this.loadingCtrl.create({
     content: "Espere...",
     duration: time,
   });
   this.loader.present();
 }

  onChoseLocation(event){
    this.presentLoading(5000);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.loader.dismiss();
  }

  CurrentPosition (){
    this.geolocation.getCurrentPosition().then((position) => {

      this.latitude =  position.coords.latitude
      this.longitude = position.coords.longitude
      this.loader.dismiss();


    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  seePosition(){
   var subscription =  this.geolocation.watchPosition().subscribe((data) => {

        console.log(data);

       this.longitude = data.coords.longitude;
       this.latitude = data.coords.latitude;
       this.loader.dismiss();



    });
  subscription.unsubscribe();
  }

}
