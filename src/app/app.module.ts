import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Calendar } from '@ionic-native/calendar/ngx';

import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { CalendarWeekHoursViewModule } from 'angular-calendar-week-hours-view';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { LocalNotifications } from '../../node_modules/@ionic-native/local-notifications/ngx';

declare const require: any;

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    // CalendarWeekHoursViewModule,
  ],
  providers: [
    StatusBar,
    Calendar,
    SplashScreen,
    LocalNotifications,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
