import { Component, Directive } from '@angular/core';
import { Ordonnance, Medoc } from '../GSB-Provider/provider';
import { GsbMainService } from '../gsb-main.service';
import { error } from 'protractor';
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
  selectedMedoc: Medoc
  formMedocList: Medoc[] = []
  formInternalId = 0
  formEditMedoc: boolean = false
  formSelectedMedoc: Medoc
  stringopif: string = "BITE" 

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

    // this.formMedocList.push(
    //   {
    //     id: 100,
    //     nom: "MEDOC100",
    //     nbBoiteMax: 0,
    //     nbBoiteAchetees: 0,
    //     nbMedocParBoite: 0,
    //     nbFoisParJour: 0,
    //     nbFoisParSemaine: 0,
    //     finDeLaPrise: new Date(),
    //     heuresPrises: []
    //   }
    // )

    // this.formMedocList.push(
    //   {
    //     id: 101,
    //     nom: "MEDOC101",
    //     nbBoiteMax: 0,
    //     nbBoiteAchetees: 0,
    //     nbMedocParBoite: 0,
    //     nbFoisParJour: 0,
    //     nbFoisParSemaine: 0,
    //     finDeLaPrise: new Date(),
    //     heuresPrises: []
    //   }
    // )

  }

  public checkStep(step: string) {
    return step === this.subPage
  }

  public changeStepTo(step: string) {
    this.subPage = step;
  }

  public selectOrdonnance(id: number) {

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
      // console.log(document.querySelector(".ordonnance-details"))
      // animated slideInDown

    }

    

  }

  public selectMedoc(id: number) {

    for (let index = 0; index < this.listeOrdonnances.length; index++) {
      const ordonnance: Ordonnance = this.listeOrdonnances[index];
      for (let index2 = 0; index2 < ordonnance.medocs.length; index2++) {
        const medoc: Medoc = ordonnance.medocs[index2];
        if (medoc.id === id) {
          this.selectedMedoc = medoc
        }
      }
    }

    if (this.selectedOrdonnance == undefined) {
      this.gsbMainService.alertInfo("Erreur : ", "Il semblerait que ce médicament n'existe pas ...")
    } else {
      this.subPage = "medoc-details"
    }

  }

  public addOrdonnance(form: any) {

    try {

      // console.log(form.form.value)

      const formedOrdonnance = 
      {
        id: this.formInternalId,
        titre: form.form.value.titre,
        description: form.form.value.description,
        dateDebut: form.form.value.dateDebut,
        dateFin: form.form.value.dateFin,
        medocs: this.formMedocList
      }

      this.listeOrdonnances.push(formedOrdonnance)

      form.reset();
      this.changeStepTo('main');

    }
    catch(err) {
      console.error(err)
      this.gsbMainService.alertInfo("Erreur", `Une erreur s'est produite : ${err}`)
    }

  }

  public addMedoc(form: any) {

    try {
      // console.log(form.form.value)

      const formedMedoc: Medoc = 
        {
          id: this.formInternalId,
          nom: form.form.value.nom,
          nbBoiteMax: form.form.value.nbBoiteMax,
          nbBoiteAchetees: form.form.value.nbBoiteAchetees,
          nbMedocParBoite: form.form.value.nbMedocParBoite,
          nbFoisParJour: form.form.value.nbFoisParJour,
          nbFoisParSemaine: form.form.value.nbFoisParSemaine,
          finDeLaPrise: form.form.value.finDeLaPrise,
          heuresPrises: []
        }

      this.formMedocList.push(formedMedoc)

      this.formInternalId++;

      form.reset();
      this.changeStepTo('ordonnance-add');

    }
    catch(err) {
      console.error(err)
      this.gsbMainService.alertInfo("Erreur", `Une erreur s'est produite : ${err}`)
    }

  }

  public startEditMedoc(id:number) {
    
    console.log("StartEditeMEdoc")

    for (let index = 0; index < this.formMedocList.length; index++) {
      const medoc = this.formMedocList[index];
      if (medoc.id === id) {
        this.formSelectedMedoc = medoc
      }
    }

    console.log(this.formSelectedMedoc)

    if (this.formSelectedMedoc == undefined) {
      this.gsbMainService.alertInfo("Erreur : ", "Il semblerait que cette ordonnance n'existe pas ...")
    } else {
      // this.formEditMedoc = true
      this.subPage = "medoc-edit"
    }

  }

  public editMedoc(form: any) {
    
    // for (let index = 0; index < this.formMedocList.length; index++) {
    //   const medoc = this.formMedocList[index];
    //   if (medoc.id === id) {
    //     this.formSelectedMedoc = medoc
    //   }
    // }

    // if (this.formSelectedMedoc == undefined) {
    //   this.gsbMainService.alertInfo("Erreur : ", "Il semblerait que cette ordonnance n'existe pas ...")
    // } else {
    //   this.formEditMedoc = true
    //   this.subPage = "medoc-add"
    // }

    // this.gsbMainService.alertInfo("TODO", form.form.value)

    try {

      const formedMedoc: Medoc = 
        {
          id: this.formInternalId,
          nom: form.form.value.nom,
          nbBoiteMax: form.form.value.nbBoiteMax,
          nbBoiteAchetees: form.form.value.nbBoiteAchetees,
          nbMedocParBoite: form.form.value.nbMedocParBoite,
          nbFoisParJour: form.form.value.nbFoisParJour,
          nbFoisParSemaine: form.form.value.nbFoisParSemaine,
          finDeLaPrise: new Date(),
          heuresPrises: []
        }

      this.formMedocList.push(formedMedoc)

      this.formInternalId++;

      form.reset();
      this.changeStepTo('ordonnance-add');

    }
    catch(err) {
      console.error(err)
      this.gsbMainService.alertInfo("Erreur", `Une erreur s'est produite : ${err}`)
    }

  }

}
