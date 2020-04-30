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

//TODO : Faire en sorte qu'on arrive au milieu de la liste
//TODO : Virer les dates trop éloignés

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1Page {

  currentStep = "list"
  // gsbProvider: GsbProvider = new GsbProvider();
  // gsbMainService.listeDesPrises: PriseMedoc[] = []

  // Calendar params
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  daysInWeek = 3;
  events: CalendarEvent[] = [];

  constructor(private gsbMainService: GsbMainService, public navController: NavController, private calendar: Calendar) {

    // this.calendar.createCalendar('GsbCalendar').then(
    //   (msg) => { console.log("Google calendar link message : " + msg); },
    //   (err) => { console.error("Google calendar link error : " + err); }
    // )
    
    // this.updateData()

    // this.gsbMainService.refresh();

    // window.setInterval(() => {

    //   this.events = this.gsbMainService.listeDesPrises.map(obj => obj.event)
    //   this.refresh.next()
      
    // }, 2000);

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
    // this.refresh.next()
    this.currentStep = step;
  }

  public switch() {
    if (this.currentStep === "calendar") {
      this.currentStep = "list"
    }
    else {
      this.currentStep = "calendar"
      // this.gsbMainService.refreshEventList()
    }
  }

  public printDate(date: Date): string {
    const listeJours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    return dateFormater.asString(`${listeJours[date.getDay()]} dd/MM, hh:mm`, date)
  }

  // public async updateData() {

  //   await this.gsbMainService.refresh();
  //   // this.gsbMainService.listeDesPrises = this.gsbMainService.listeDesPrises;
  //   // this.events = []
  //   // this.gsbMainService.listeDesPrises.forEach(element => {
  //   //   this.events.push(element.event)
  //   // });

  // }

  refresh: Subject<any> = new Subject();
  eventTimesChanged({event, newStart}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    this.gsbMainService.listeDesPrises.map(obj => obj.event).forEach(GSBevent => {
      if (GSBevent.id === event.id) {
        GSBevent.start = newStart
      }
    });
    console.log(`Event ${event.title} changed to ${event.start}`);
    this.refresh.next();
  }
 
}