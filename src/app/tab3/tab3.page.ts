import { Component } from '@angular/core';
import { GsbMainService } from '../gsb-main.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Parameters } from '../parameters'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  currentStep: string = "menu"
  formIAcceptConditions: boolean
  paramheureMatinPrise = Parameters.heureMatinPrise
  paramheureSoirPrise = Parameters.heureSoirPrise
  paramheureMatinCalend = Parameters.heureMatinCalend
  paramheureSoirCalend = Parameters.heureSoirCalend

  appName = require('../../../package.json').name
  version = require('../../../package.json').version



  constructor(private gsbMainService: GsbMainService, private loadingController: LoadingController, private navController: NavController) {

    this.checkIfLoggedIn()

  }

  public async checkIfLoggedIn() {

    // this.loadingController.create()

    const loading = await this.loadingController.create({
      message: 'Chargement ...',
      backdropDismiss: false
    });
    await loading.present();


    if (await this.gsbMainService.checkIfLoggedIn()) {
      loading.remove()
      this.changeStepTo("main")
      this.navController.navigateForward('/tabs/tab1');
    }
    else {
      loading.remove()
    }
    
    

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!'); 

    if (this.gsbMainService.logedIn) {
      this.changeStepTo("main")
    }

  }

  public checkStep(step: string) {
    return step === this.currentStep
  }

  public changeStepTo(step: string) {
    if (step === 'signUp') {
      this.formIAcceptConditions = false
    }
    this.currentStep = step;
  }


  public async signIn(form: any) {
    console.log('form :', form.form.value)

    const loading = await this.loadingController.create({
      message: 'Chargement ...',
      backdropDismiss: false
    });
    await loading.present();


    if (await this.gsbMainService.signIn(form.form.value.username, form.form.value.password)) {
      loading.remove()
      this.changeStepTo("main")
      this.navController.navigateForward('/tabs/tab1');
    }
    else {
      this.gsbMainService.alertInfo('Erreur', 'Login ou mot de passe incorrect')
      loading.remove()
    }

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!'); 

    // if (this.gsbMainService.logedIn) {
    //   this.changeStepTo("main")
    // }

  }

  public async signUp(form: any) {

    // console.log('form :', form.form.value)

    if (form.form.value.password !== form.form.value.passwordDoubleCheck) {
      this.gsbMainService.alertInfo('Erreur', 'Les mots de passes ne correspondent pas.')
      return
    }

    if (!this.formIAcceptConditions) {
      this.gsbMainService.alertInfo('Erreur', 'Vous n\'avez pas accépté les conditions d\'utilisation.')
      return
    }

    const loading = await this.loadingController.create({
      message: 'Chargement ...',
      backdropDismiss: false
    });
    await loading.present();

    if (await this.gsbMainService.signUp(form.form.value.username, form.form.value.email, form.form.value.password)) {
      loading.remove()
      this.changeStepTo("main")
      this.navController.navigateForward('/tabs/tab1');
    }
    else {
      this.gsbMainService.alertInfo('Erreur', 'Login ou addresse mail déjà prise !')
      loading.remove()
    }

  }

  public signOut() {
    this.gsbMainService.signOut()
    this.changeStepTo('menu')
  }


  public validateParams(form: any) {
    // console.log('form.form.value :', form.form.value)
    this.gsbMainService.changeParams({
      heureMatinPrise: form.form.value.heureMatinPrise,
      heureSoirPrise: form.form.value.heureSoirPrise,
      heureMatinCalend: form.form.value.heureMatinCalend,
      heureSoirCalend: form.form.value.heureSoirCalend
    })
  }

  
  DELETE_ME() {

    // this.gsbMainService.notificate(
    //   "GSB-MyMedoc",
    //   "Le bouton a été cliqué il y a 5s ;)",
    //   {
    //     data: "any?"
    //   })

    // this.gsbMainService.testHTTP()

    // const id = -1 * GsbMainService.generateId()
    // this.gsbMainService.signUp(`UserTest${id}`, `usertest${id}@mail.mail`, `PassPass`)

    this.gsbMainService.signUp(`UserTest1`, `usertest1@mail.mail`, `PassPass`)
  }

}
