import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';
import { CalendarView, CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { GsbMainService } from '../gsb-main.service';
import { PriseMedoc } from '../interfaces';
const dateFormater = require('date-format');
// import { colors } from '../demo-utils/colors';
// import { EventColor } from '';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1Page {

  currentStep = "list"
  // gsbProvider: GsbProvider = new GsbProvider();
  listeJours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];


  prisesListe: PriseMedoc[] = [
    // {
    //   id: 1, 
    //   datePrise: addHours(startOfDay(new Date()), 8),
    //   pris: false,
    //   event: {
    //     title: 'Salbutamol',
    //     start: addHours(startOfDay(new Date()), 8),
    //     allDay: false,
    //     draggable: true
    //   },
    // },
  ]

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  daysInWeek = 3;
  events: CalendarEvent[] = [
    // {
    //   start: addHours(startOfDay(new Date()), 8),
    //   title: 'Salbutamol',
    //   // eventBackgroundColor: '#ffffff',
    //   allDay: false,
    //   draggable: true,
    //   id: 1
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 20),
    //   title: 'Salbutamol',
    //   // color: ,
    //   allDay: false,
    //   draggable: true,
    //   id: 2
    // },
    // {
    //   start: addHours(startOfDay(addDays(new Date(), 1)), 20),
    //   title: 'Salbutamol',
    //   // color: colors.blue,
    //   allDay: false,
    //   draggable: true,
    //   id: 3
    // }
  ];

  constructor(private gsbMainService: GsbMainService, public navController: NavController, private calendar: Calendar) {

    // this.calendar.createCalendar('GsbCalendar').then(
    //   (msg) => { console.log("Google calendar link message : " + msg); },
    //   (err) => { console.error("Google calendar link error : " + err); }
    // )
    
    this.updateData()

    // this.currentStep = "calendar"

    // setTimeout(() => {
    //   console.log("Ok?");
    //   this.currentStep = "calendar"
    // }, 2500);

  }

  public checkStep(step: string) {
    return step === this.currentStep
  }

  public changeStepTo(step: string) {
    this.currentStep = step;
  }

  public switch() {
    if (this.currentStep === "calendar") {
      this.currentStep = "list"
    }
    else {
      this.currentStep = "calendar"
    }
  }

  public printDate(date: Date): string {
    return dateFormater.asString(`${this.listeJours[date.getDay()]} dd/MM, hh:mm`, date)
  }

  public async updateData() {

    // console.log("Updating data ...");
    // this.prisesListe = this.gsbMainService.getPrisesList();
    await this.gsbMainService.refresh();
    this.prisesListe = this.gsbMainService.listeDesPrises;
    // console.log("Data updated : ", this.prisesListe);
    this.events = []
    this.prisesListe.forEach(element => {
      this.events.push(element.event)
    });

  }

  refresh: Subject<any> = new Subject();
  eventTimesChanged({event, newStart}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    console.log(`Event ${event.title} changed to ${event.start}`);
    this.refresh.next();
  }
 
}