import { Component } from '@angular/core';
import { GsbMainService } from '../gsb-main.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private gsbMainService: GsbMainService) {}

  DELETE_ME() {
    // this.gsbMainService.notificate(
    //   "GSB-MyMedoc",
    //   "Le bouton a été cliqué il y a 5s ;)",
    //   {
    //     data: "any?"
    //   })
  }

}
