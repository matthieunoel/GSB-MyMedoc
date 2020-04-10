import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GsbMainService {

  constructor(private alertController: AlertController) { }

  async alertInfo(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });

    await alert.present();
  }
  
}
