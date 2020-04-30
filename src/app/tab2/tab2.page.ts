import { Component } from '@angular/core';
import { Ordonnance, Medoc } from '../interfaces';
import { GsbMainService } from '../gsb-main.service';
// import { Animation, AnimationController } from '@ionic/angular';
// import { createAnimation } from "@ionic/core";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  // TODO: Add an edit page for ordonnance

  // listeOrdonnances: Ordonnance[] = []
  currentStep: string = "main"
  selectedOrdonnance: Ordonnance 
  selectedMedoc: Medoc
  formMedocList: Medoc[] = []
  formInternalId = 0
  formEditMedoc: boolean = false
  formSelectedMedoc: Medoc
  formSelectedMedocIndex: number
  formSavedOrdonnance: any


  constructor(private gsbMainService: GsbMainService) {
    this.updateData()
  }

  public checkStep(step: string) {
    return step === this.currentStep
  }

  public changeStepTo(step: string) {
    this.currentStep = step;
  }

  public selectOrdonnance(id: number) {

    for (let index = 0; index < this.gsbMainService.data.ordonnances.length; index++) {
      const ordonnance = this.gsbMainService.data.ordonnances[index];
      if (ordonnance.id === id) {
        this.selectedOrdonnance = ordonnance
        // console.log("this.selectedOrdonnance : ", this.selectedOrdonnance)
      }
    }

    if (this.selectedOrdonnance == undefined) {

      this.gsbMainService.alertInfo("Erreur : ", "Il semblerait que cette ordonnance n'existe pas ...")

    } else {

      this.currentStep = "ordonnance-details"

    }

  }

  public selectMedoc(id: number) {

    for (let index = 0; index < this.gsbMainService.data.ordonnances.length; index++) {
      const ordonnance: Ordonnance = this.gsbMainService.data.ordonnances[index];
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
      this.currentStep = "medoc-details"
    }

  }

  public startAddOrdonnance() {
    this.formSavedOrdonnance = {
      titre: "",
      description: "",
      dateDebut: "",
      dateFin: ""
    }
    this.formMedocList = []
    this.currentStep = "ordonnance-add"
  }

  public addOrdonnance(form: any) {

    try {

      // console.log(form.form.value)

      this.formMedocList.forEach((medoc: Medoc) => {
        medoc.id = GsbMainService.generateId()
      });

      const formedOrdonnance =
      {
        id: GsbMainService.generateId(),
        titre: form.form.value.titre,
        description: form.form.value.description,
        dateDebut: form.form.value.dateDebut,
        dateFin: form.form.value.dateFin,
        medocs: this.formMedocList
      }

      console.log("Adding Ordonnance : ", formedOrdonnance)

      this.gsbMainService.data.ordonnances.push(formedOrdonnance)
      this.gsbMainService.data.ordonnances = this.gsbMainService.data.ordonnances

      form.reset();
      this.formMedocList = []
      this.changeStepTo('main');

    }
    catch (err) {
      console.error(err)
      this.gsbMainService.alertInfo("Erreur", `Une erreur s'est produite : ${err}`)
    }

  }

  public startAddMedoc(form: any) {

    this.formSavedOrdonnance = {
      titre: form.form.value.titre,
      description: form.form.value.description,
      dateDebut: form.form.value.dateDebut,
      dateFin: form.form.value.dateFin
    }

    this.currentStep = "medoc-add"

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
        prises: []
      }

      this.formMedocList.push(formedMedoc)

      this.formInternalId++;

      form.reset();
      this.changeStepTo('ordonnance-add');

    }
    catch (err) {
      console.error(err)
      this.gsbMainService.alertInfo("Erreur", `Une erreur s'est produite : ${err}`)
    }

  }

  public startEditMedoc(id: number, form: any) {

    this.formSavedOrdonnance = {
      titre: form.form.value.titre,
      description: form.form.value.description,
      dateDebut: form.form.value.dateDebut,
      dateFin: form.form.value.dateFin
    }

    for (let index = 0; index < this.formMedocList.length; index++) {
      const medoc = this.formMedocList[index];
      if (medoc.id === id) {
        this.formSelectedMedoc = medoc
        this.formSelectedMedocIndex = index
      }
    }

    if (this.formSelectedMedoc == undefined) {
      this.gsbMainService.alertInfo("Erreur : ", "Il semblerait que cette ordonnance n'existe pas ...")
    } else {
      this.currentStep = "medoc-edit"
    }

  }

  public editMedoc(form: any) {

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
        prises: []
      }

      this.formMedocList[this.formSelectedMedocIndex] = formedMedoc

      form.reset();
      this.changeStepTo('ordonnance-add');

    }
    catch (err) {
      console.error(err)
      this.gsbMainService.alertInfo("Erreur", `Une erreur s'est produite : ${err}`)
    }

  }

  public selectColor(color: string) {
    // console.log("Color changed to :", color)
    this.selectedMedoc.couleur = color

    this.gsbMainService.data.ordonnances.forEach((ordonnance: Ordonnance) => {
      if (ordonnance.id === this.selectedOrdonnance.id) {
        ordonnance.medocs.forEach((medoc: Medoc) => {
          if (medoc.id === this.selectedMedoc.id) {
            medoc.couleur = color
          }
         });
      }
    });

  }

  private async updateData() {
    await this.gsbMainService.refresh();
    // this.listeOrdonnances = this.gsbMainService.data.ordonnances
  }
  

}
