import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';
// import { colors } from '../demo-utils/colors';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  daysInWeek = 3;
  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 8),
      // end: addHours(startOfDay(new Date()), 17),
      title: 'Salbutamol (1)',
      // color: ,
      allDay: false,
    },
    {
      start: addHours(startOfDay(new Date()), 20),
      title: 'Salbutamol (2)',
      // color: colors.blue,
      allDay: false,
    },
    {
      start: addHours(startOfDay(addDays(new Date(), 1)), 20),
      // end: addHours(startOfDay(addDays(new Date(), 1)), 18),
      title: 'Salbutamol (3)',
      // color: colors.blue,
      allDay: false,
    }
  ];

  constructor(public navController: NavController, private calendar: Calendar) {

    this.calendar.createCalendar('GsbCalendar').then(
      (msg) => { console.log("Google calendar link message : " + msg); },
      (err) => { console.error("Google calendar link error : " + err); }
    )

  }

  goAnOtherPage(address: string) {
    this.navController.navigateForward(address);
  }
 
}