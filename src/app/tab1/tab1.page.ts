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
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  currentStep: string = "loading"
  // gsbProvider: GsbProvider = new GsbProvider();
  // gsbMainService.listeDesPrises: PriseMedoc[] = []

  prisesList: PriseMedoc[] =[]

  // Calendar params
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  daysInWeek = 3;
  events: CalendarEvent[] = [];

  // constructor(private gsbMainService: GsbMainService, public navController: NavController, private calendar: Calendar) {

  //   // this.calendar.createCalendar('GsbCalendar').then(
  //   //   (msg) => { console.log("Google calendar link message : " + msg); },
  //   //   (err) => { console.error("Google calendar link error : " + err); }
  //   // )
    
  //   // this.updateData()

  //   // this.gsbMainService.refresh();

  //   // window.setInterval(() => {

  //   //   this.events = this.gsbMainService.listeDesPrises.map(obj => obj.event)
  //   //   this.refresh.next()
      
  //   // }, 2000);

  //   // this.currentStep = "calendar"

  //   // setTimeout(() => {
  //   //   console.log("Ok?");
  //   //   this.currentStep = "calendar"
  //   // }, 2500);

  // }

  constructor(private gsbMainService: GsbMainService, public navController: NavController, private calendar: Calendar) {
    this.gsbMainService.init()
    .then(() => {
      // this.gsbMainService.DELETE_ME_RemoveAllPrisesFromCache()
      this.changeStepTo("list")
    });
  }

  public checkStep(step: string) {
    return step === this.currentStep
  }

  public changeStepTo(step: string) {
    if (step === "list") {  
      this.updatePrisesList()
    }
    this.currentStep = step;
  }

  public updatePrisesList() {
    this.prisesList = this.gsbMainService.getPrisesList()
    console.log("this.prisesList", this.prisesList)
  }

  public switchClick(prise: PriseMedoc) {
    // prise.pris = !prise.pris
    // console.log(`Prise switched from ${!prise.pris} to ${prise.pris}`)
    
    setTimeout(() => {
      // console.log("prise clicked :", prise);
      this.modifyPrise(prise)
    }, 100);
  }

  public modifyPrise(prise: PriseMedoc) {
    this.gsbMainService.changePrise(prise)
  }


  public refreshList(refresher: any) {
    this.updatePrisesList()
    setTimeout(() => {
      refresher.detail.complete()
    }, 1500);
  }

  public DELETE_ME_TEST() {
    // this.updatePrisesList()
    console.log('this.gsbMainService.data :', this.gsbMainService.data);
  }

  // public switch() {
  //   if (this.currentStep === "calendar") {
  //     this.currentStep = "list"
  //   }
  //   else {
  //     this.currentStep = "calendar"
  //     // this.gsbMainService.refreshEventList()
  //   }
  // }


  

  // public async updateData() {

  //   await this.gsbMainService.refresh();
  //   // this.gsbMainService.listeDesPrises = this.gsbMainService.listeDesPrises;
  //   // this.events = []
  //   // this.gsbMainService.listeDesPrises.forEach(element => {
  //   //   this.events.push(element.event)
  //   // });

  // }

  // refresh: Subject<any> = new Subject();
  // eventTimesChanged({event, newStart}: CalendarEventTimesChangedEvent): void {
  //   event.start = newStart;
  //   this.gsbMainService.listeDesPrises.map(obj => obj.event).forEach(GSBevent => {
  //     if (GSBevent.id === event.id) {
  //       GSBevent.start = newStart
  //     }
  //   });
  //   console.log(`Event ${event.title} changed to ${event.start}`);
  //   this.refresh.next();
  // }
 
}