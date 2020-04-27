import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public navController: NavController, private calendar: Calendar) {

    this.calendar.createCalendar('Calendrier').then(
      (msg) => { console.log("Calendar message : " + msg); },
      (err) => { console.error("Calendar error : " + err); }
    )

    this.calendar.openCalendar(new Date())

  }

  goAnOtherPage(address: string) {
    this.navController.navigateForward(address);
  }
 
}