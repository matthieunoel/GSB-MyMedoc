import { Component } from '@angular/core';
import { Ordonnance } from '../GSB-Provider/provider';
import { GsbMainService } from '../gsb-main.service';
// import { Animation, AnimationController } from '@ionic/angular';
// import { createAnimation } from "@ionic/core";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  listeOrdonnances: Ordonnance[] = []
  subPage: string = "main"
  selectedOrdonnance: Ordonnance

  constructor(private gsbMainService: GsbMainService, /*private animationController: AnimationController*/) {

    // For tests
    this.listeOrdonnances.push(
      {
        id: 0,
        titre: "Ordonnance de test 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        dateDebut: new Date(),
        dateFin: new Date(),
        medocs: [
          {
            id: 0,
            nom: "MEDOC1-NOM-XYZ",
            nbBoiteMax: 0,
            nbBoiteAchetees: 0,
            nbMedocParBoite: 12,
            nbFoisParJour: 1,
            nbFoisParSemaine: 7,
            finDeLaPrise: new Date(),
            heuresPrises: []
          },
          {
            id: 0,
            nom: "MEDOC2-NOM-0047-AAB2",
            nbBoiteMax: 4,
            nbBoiteAchetees: 2,
            nbMedocParBoite: 20,
            nbFoisParJour: 2,
            nbFoisParSemaine: 3,
            finDeLaPrise: new Date(),
            heuresPrises: [
              {
                id: 0,
                heurePrise: { hours: 7, minutes: 30 },
                pris: true
              },
              {
                id: 0,
                heurePrise: { hours: 19, minutes: 30 },
                pris: false
              }
            ]
          }
        ]
      }
    )
  }

  checkStep(step: string) {
    return step === this.subPage
  }

  changeStepTo(step: string) {
    this.subPage = step;
  }

  selectOrdonnance(id: number) {

    // console.log(id);

    // let ordonnance: Ordonnance

    for (let index = 0; index < this.listeOrdonnances.length; index++) {
      const ordonnance = this.listeOrdonnances[index];
      if (ordonnance.id === id) {
        this.selectedOrdonnance = ordonnance
      }
    }
    
    // console.log(ordonnance)
    
    // if (condition) {
      
    // }

    if (this.selectedOrdonnance == undefined) {
      
      this.gsbMainService.alertInfo("Erreur : ", "Il semblerait que cette ordonnance n'existe pas ...")

    } else {
      
      this.subPage = "ordonnance-details"

    }

    

  }

}
