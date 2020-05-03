import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { GsbMainService } from '../gsb-main.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private navController: NavController, public menuController: MenuController, public gsbMainService: GsbMainService) {
    this.navController.navigateForward('/tabs/tab3');
  }

  // TODO: Remmener au "main" d'une page on click

  goTo(address: string) {
    // console.log("address :", address)
    this.navController.navigateForward(address);
    this.menuController.close();
  }

}
