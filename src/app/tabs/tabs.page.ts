import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private navController: NavController, public menuController: MenuController) {}

  goTo(address: string) {
    this.navController.navigateForward(address);
    this.menuController.close();
  }

}
