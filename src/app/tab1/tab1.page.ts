import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';
import { CalendarView, CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';
import { Subject } from 'rxjs';
// import { colors } from '../demo-utils/colors';
// import { EventColor } from '';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1Page {

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  daysInWeek = 3;
  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 8),
      title: 'Salbutamol (1)',
      // eventBackgroundColor: '#ffffff',
      allDay: false,
      draggable: true,
    },
    {
      start: addHours(startOfDay(new Date()), 20),
      title: 'Salbutamol (2)',
      // color: ,
      allDay: false,
      draggable: true,
    },
    {
      start: addHours(startOfDay(addDays(new Date(), 1)), 20),
      title: 'Salbutamol (3)',
      // color: colors.blue,
      allDay: false,
      draggable: true,
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

  refresh: Subject<any> = new Subject();

  eventTimesChanged({
    event,
    newStart,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    console.log(`Event ${event.title} changed to ${event.start}`);
    this.refresh.next();
  }

  eventClick({
    event,
  }: CalendarEventTimesChangedEvent): void {
    // event.start = newStart;
    console.log(`Event ${event.title} clicked`);
    this.refresh.next();
  }
 
}