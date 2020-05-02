import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PriseMedoc, Ordonnance, Medoc, Data } from './interfaces';
import { startOfDay, addHours, addDays } from 'date-fns';
import { Parameters } from './parameters'
import { promise } from 'protractor';
// const parameters: Parameters = require('./parameters')

const dateFormater = require('date-format');

@Injectable({
  providedIn: 'root'
})
export class GsbMainService {

  // static availableId: number = 0

  constructor(private alertController: AlertController /* , private localNotifications: LocalNotifications */) {

    // window.setInterval(() => {

    //   this.listeDesPrises = this.getPrisesList(this.data)
    //   if (typeof (Storage) != "undefined") {
    //     localStorage.setItem("ordo", JSON.stringify(this.data.ordonnances))
    //   } else {
    //     console.error("Storage is not available for now ...")
    //   }

    // }, 500);

    // window.setInterval(() => {
    //   console.log(this.data);
    // }, 5000);

    // this.localNotifications.schedule({
    //   id: 1,
    //   title: 'Attention',
    //   text: 'Simons Notification',
    //   data: { mydata: 'My hidden message this is' },
    //   // at: new Date(new Date().getTime() + 5 * 1000)
    //   trigger: {
    //     at: new Date(new Date().getTime() + 5 * 1000)
    //   }
    // });

    this.loadParameters()

  }

  public dataLoaded: boolean = false;
  // public niceColors: string[] = ["#ff7b00", "#c23616", "#0097e6", "#8c7ae6", "#e1b12c", "#44bd32"] /* Custom Palette */
  // public niceColors: string[] = ["#f53b57", "#3c40c6", "#0fbcf9", "#05c46b", "#ffa801", "#1e272e"] /* Swedish Palette */
  public niceColors: string[] = ["#F44336", "#9C27B0", "#2196F3", "#4CAF50", "#FF9800", "#607D8B"] /* Basic Palette */
  public data: Data = {
    id: 0,
    login: 'LOGIN',
    password: 'PASSWORD',
    ordonnances: []
  }


  // listeDesPrises: PriseMedoc[] = []

  

  // TEST_listeOrdonnances: Ordonnance[] =
  //   [
  //     {
  //       id: GsbMainService.generateId(),
  //       titre: "Ordonnance du docteur",
  //       description: "Cette ordonnance est coooooool",
  //       dateDebut: new Date('2020-03-24T11:15:00'),
  //       dateFin: new Date('2020-05-24T11:15:00'),
  //       medocs: [
  //         {
  //           id: GsbMainService.generateId(),
  //           nom: "Salbutamol",
  //           nbBoiteMax: 2,
  //           nbBoiteAchetees: 1,
  //           nbMedocParBoite: 45,
  //           nbFoisParJour: 3,
  //           nbFoisParSemaine: 7,
  //           finDeLaPrise: undefined,
  //           couleur: "#0097e6",
  //           prises: [
  //             {
  //               id: GsbMainService.generateId(),
  //               datePrise: addHours(startOfDay(addDays(new Date(), -3)), 20),
  //               pris: false
  //             },
  //             {
  //               id: GsbMainService.generateId(),
  //               datePrise: addHours(startOfDay(addDays(new Date(), -2)), 20),
  //               pris: false
  //             },
  //             {
  //               id: GsbMainService.generateId(),
  //               datePrise: addHours(startOfDay(addDays(new Date(), -1)), 20),
  //               pris: false
  //             },
  //             {
  //               id: GsbMainService.generateId(),
  //               datePrise: addHours(startOfDay(new Date()), 20),
  //               pris: false
  //             },
  //           ]
  //         },
  //         {
  //           id: GsbMainService.generateId(),
  //           nom: "Endorphine",
  //           nbBoiteMax: 7,
  //           nbBoiteAchetees: 2,
  //           nbMedocParBoite: 45,
  //           nbFoisParJour: 1,
  //           nbFoisParSemaine: 6,
  //           finDeLaPrise: new Date('2020-05-24T11:15:00'),
  //           prises: []
  //         }
  //       ]
  //     }
  // ]

  // TEST_listePrises: PriseMedoc[] = [
  //   {
  //     id: 4,
  //     datePrise: addHours(startOfDay(new Date()), 20),
  //     pris: false,
  //     event: {
  //       id: GsbMainService.generateId(),
  //       allDay: false,
  //       draggable: true,
  //       start: addHours(startOfDay(new Date()), 20),
  //       title: "CrystalMeth"
  //     }
  //   },
  //   {
  //     id: 5,
  //     datePrise: addHours(startOfDay(addDays(new Date(), 1)), 20),
  //     pris: false,
  //     event: {
  //       id: GsbMainService.generateId(),
  //       allDay: false,
  //       draggable: true,
  //       // start: new Date("2020-05-01T20:00:00"),
  //       start: addHours(startOfDay(addDays(new Date(), 1)), 20),
  //       title: "CrystalMeth"
  //     }
  //   },
  //   {
  //     id: 5,
  //     datePrise: addHours(startOfDay(addDays(new Date(), 2)), 20),
  //     pris: false,
  //     event: {
  //       id: GsbMainService.generateId(),
  //       allDay: false,
  //       draggable: true,
  //       start: addHours(startOfDay(addDays(new Date(), 2)), 20),
  //       title: "CrystalMeth"
  //     }
  //   }
  // ]



  private loadParameters() {
    Parameters.heureMatin = 8
    Parameters.heureSoir = 20
  }

  public async init() {
    if (!this.dataLoaded) {
      console.log("Initialisation ...");
      await this.loadData()
      this.dataLoaded = true
    }
  }
 
  public loadData(): Promise<void> {

    // console.log('Loading data ...');

    return new Promise(async (resolve, reject) => {

      // TO SIMULATE A CONNECTION
      setTimeout((self: GsbMainService = this) => {

        self.data.ordonnances = self.getOrdonnances()
        // self.listeDesPrises = self.getPrisesList(self.data)

        resolve();

      }, 1000);

    })
  }

  public saveData() {
    console.log("Saving data ...")
    if (typeof (Storage) != "undefined") {
      localStorage.setItem("ordo", JSON.stringify(this.data.ordonnances))
    } else {
      console.error("Storage is not available for now ...")
    }
  }

  public DELETE_ME_RemoveAllPrisesFromCache() {
    this.data.ordonnances.forEach((ordonnance: Ordonnance) => {
      ordonnance.medocs.forEach((medoc: Medoc) => {
        medoc.prises = []
      });
    });
    this.saveData()
  }


  public getOrdonnances(): Ordonnance[] {

    let ordo: Ordonnance[]
    console.log("Reading cache ...")
    if (typeof (Storage) != "undefined") {
      const str: string = localStorage.getItem("ordo")
      // console.log(str)
      if (str !== "NaN" && str != null && str != undefined) {
        ordo = JSON.parse(str)  
      }
      else {
        ordo = []
      }
      console.log("Data extracted succesfully from cache")
    } else {
      console.error("Cache is not available for now ...")
    }

    return ordo
    // return this.TEST_listeOrdonnances
  }

  public addOrdonnance(ordonnance: Ordonnance) {
    // console.log("addOrdonnance START")
    this.data.ordonnances.push(ordonnance)
    console.log("Ordonnance added :");
    console.log("this.data.ordonnances", this.data.ordonnances)
    this.saveData()
  }

  public changeColor(paramMedoc: Medoc, paramColor: string) {

    this.data.ordonnances.forEach((ordonnance: Ordonnance) => {
      ordonnance.medocs.forEach((medoc: Medoc) => {
        if (medoc.id === paramMedoc.id) {
          medoc.couleur = paramColor
        }
      });
    });

    console.log(`Medoc "${paramMedoc.nom}" color changed to ${paramMedoc.couleur}`)

    this.saveData()
  }

  public modifyOrdonnance(ordonnance: Ordonnance) {
    
    for (let index = 0; index < this.data.ordonnances.length; index++) {
      if (this.data.ordonnances[index].id === ordonnance.id) {
        console.log(`Modifying ordonnance "${this.data.ordonnances[index].titre}" :`, ordonnance)
        this.data.ordonnances[index] = ordonnance
      }
    }

    this.saveData()

  }

  public removeOrdonnance(ordonnance: Ordonnance) {

    for (let index = 0; index < this.data.ordonnances.length; index++) {
      if (this.data.ordonnances[index].id === ordonnance.id) {
        console.log(`Removing ordonnance "${this.data.ordonnances[index].titre}"`)
        this.data.ordonnances.splice(index, 1)
      }
    }

    this.saveData()

  }


  public getPrisesList(): PriseMedoc[] {

    let listeDesPrises: PriseMedoc[] = []
    let listesDatesProgramee: Date[] = []

    this.generateNewPrisesLists()

    this.data.ordonnances.forEach((ordonnance: Ordonnance) => {
      ordonnance.medocs.forEach((medoc: Medoc) => {

        let color: string

        if (medoc.couleur != undefined) {
          color = medoc.couleur
        } else {
          color = "#a3aaaf"
        }

        medoc.prises.forEach(prise => {
          listeDesPrises.push(this.addPriseEvent(prise, medoc.nom, color))
        });
      });
    });

    // Finallement, on trie la liste avant de la renvoyer
    listeDesPrises = listeDesPrises.sort((n1, n2) => {
      if (n1.datePrise > n2.datePrise) {
        return 1;
      }
      if (n1.datePrise < n2.datePrise) {
        return -1;
      }
      return 0;
    });

    // console.log("listeDesPrises :", listeDesPrises)
    return listeDesPrises
  }

  private generateNewPrisesLists() {

    // let listeDesPrises: PriseMedoc[] = []

    this.data.ordonnances.forEach((ordonnance: Ordonnance) => {
      ordonnance.medocs.forEach((medoc: Medoc) => {

        let color: string
        if (medoc.couleur != undefined) {
          color = medoc.couleur
        } else {
          color = "#a3aaaf"
        }

        let listesDatesProgramee: Date[] = []

        // On note les dates de ces prises pour savoir quand en créer et là où n'y en a pas
        medoc.prises.forEach(prise => {
          if (!listesDatesProgramee.includes(new Date(prise.datePrise.toString()))) {
            listesDatesProgramee.push(startOfDay(new Date(prise.datePrise.toString())))
          }
        });

        // console.log(listesDatesProgramee);
        

        // On teste les ajout de prises sur 3 jours, le jour actuel comptant
        for (let dayIncrement = 0; dayIncrement < 3; dayIncrement++) {
          
          // On teste s'il y a déjà des prises pour ce médicament le jour en question
          let founded: boolean = false
          listesDatesProgramee.forEach(date => {
            // console.log(`${} vs ${}`)
            if (date.getDate() === addDays(startOfDay(new Date()), dayIncrement).getDate()) {
              founded = true
            }
          });

          // console.log(`[${medoc.nom}] - The date ${addDays(startOfDay(new Date()), dayIncrement)} was founded :`, founded)

          // console.log("!(medoc.finDeLaPrise < (new Date()))) :", `!(${medoc.finDeLaPrise} < (${new Date()})) :`, !(medoc.finDeLaPrise < (new Date())))
          // console.log("ordonnance.dateFin >= (new Date()) :", `${ordonnance.dateFin} >= (${new Date()}) :`, ordonnance.dateFin >= (new Date()))
          // console.log("\n")

          const actualDate: string = `${(new Date()).getFullYear()}-${(new Date()).getMonth()}-${(new Date()).getDate()}`
          const ordoDate: string = ordonnance.dateFin.toString().substring(0, ordonnance.dateFin.toString().indexOf('T')).replace(/-0/g, '-')
          let medocDate: string
          if (medoc.finDeLaPrise != undefined) {
            medocDate = medoc.finDeLaPrise.toString().substring(0, ordonnance.dateFin.toString().indexOf('T')).replace(/-0/g, '-')
          }
          else {
            medocDate = ""
          }

          // console.log("\n")

          // console.log(!founded && this.testNewPriseMedoc((addDays(startOfDay(new Date()), dayIncrement)).getDay(), medoc.nbFoisParSemaine) && ordoDate >= actualDate && (medocDate >= actualDate || medocDate === ""))

          // Si il n'y a pas de prises ce jour là  ET  qu'il est censé y avoir des prises ce jour là
          // ET  que l'ordonnance est valide  ET  que le médicament est encore prescrit  (en gros s'il faut ajouter une prise)
          if (!founded && this.testNewPriseMedoc((addDays(startOfDay(new Date()), dayIncrement)).getDay(), medoc.nbFoisParSemaine) && ordoDate >= actualDate && (medocDate >= actualDate || medocDate === "")) {

            console.log(`Creation de ${medoc.nom} : ${addDays(startOfDay(new Date()), dayIncrement)}`)


            // S'il y a un médicament a prendre par jour
            if (medoc.nbFoisParJour === 1) {

              medoc.prises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureSoir), medoc.nom, color))
              medoc.prises.push
              // console.log("README-listeDesPrises: ", listeDesPrises)

            }
            // S'il y a 2 médicaments a prendre par jour
            else if (medoc.nbFoisParJour === 2) {

              medoc.prises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureMatin), medoc.nom, color))
              medoc.prises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureSoir), medoc.nom, color))

            }
            // S'il y a plus de 2 médicaments a prendre par jour
            else if (medoc.nbFoisParJour !== 0) {

              medoc.prises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureMatin), medoc.nom, color))
              medoc.prises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureSoir), medoc.nom, color))

              const nbFoisEnPlus = medoc.nbFoisParJour - 1

              // On fais une moyenne et on attribue des médicaments entre les heures du matin et du soir
              let timeLeft = (Parameters.heureSoir - Parameters.heureMatin) / nbFoisEnPlus

              for (let index = 1; index < nbFoisEnPlus; index++) {
                medoc.prises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureMatin + index * timeLeft),medoc.nom,color))
              }

            }

          }

        }
        
      });
    });
  }

  private testNewPriseMedoc(idJour: number, nbPrisesSemaines: number): boolean {

    let monTableau: boolean[][] = [];
    // [DAY][NB]

    monTableau[0] = [false, false, false, false, true, false, false, true]
    monTableau[1] = [false, true, false, true, false, true, true, true]
    monTableau[2] = [false, false, true, false, true, true, true, true]
    monTableau[3] = [false, false, false, true, false, false, true, true]
    monTableau[4] = [false, false, false, false, true, true, true, true]
    monTableau[5] = [false, false, false, true, false, true, true, true]
    monTableau[6] = [false, false, true, false, true, true, true, true]

    /* To print the array */
    // console.log("   0 1 2 3 4 5 6 (DAY)\n");
    // for (var i: number = 7; i >= 0; i--) {
    //   console.log(`${i} |${monTableau[0][i] ? 1 : 0}|${monTableau[1][i] ? 1 : 0}|${monTableau[2][i] ? 1 : 0}|${monTableau[3][i] ? 1 : 0}|${monTableau[4][i] ? 1 : 0}|${monTableau[5][i] ? 1 : 0}|${monTableau[6][i] ? 1 : 0}`);
    // }
    // console.log("(NB)");
    // console.log(`Test (jour=${idJour}, nb=${nbPrisesSemaines}) = ${monTableau[idJour][nbPrisesSemaines]}`)
    // console.log("\n")

    return monTableau[idJour][nbPrisesSemaines];

  }

  private createPrise(date: Date, medocName, color): PriseMedoc {
    return {
      id: GsbMainService.generateId(),
      datePrise: date,
      pris: false,
      event: {
        id: GsbMainService.generateId(),
        allDay: false,
        draggable: true,
        start: date,
        title: medocName,
        color: {
          primary: color,
          secondary: color + "50",
        },
      }
    }
  }

  public getPrisesEventList() {

  }

  public changePrise(paramPrise: PriseMedoc) {

    for (let index1 = 0; index1 < this.data.ordonnances.length; index1++) {
      const ordonnance: Ordonnance = this.data.ordonnances[index1];
      for (let index2 = 0; index2 < ordonnance.medocs.length; index2++) {
        const medoc: Medoc = ordonnance.medocs[index2];
        for (let index3 = 0; index3 < medoc.prises.length; index3++) {
          // let prise: PriseMedoc = medoc.prises[index3];
          // console.log('prise.id === paramPrise.id', `${medoc.prises[index3].id} === ${paramPrise.id}`, medoc.prises[index3].id === paramPrise.id)
          if (medoc.prises[index3].id === paramPrise.id) {
            medoc.prises[index3] = paramPrise
            // console.log("prise nom :", medoc.prises[index3])
          }
        }
      }
    }

    // this.data.ordonnances.forEach((ordonnance: Ordonnance) => {
    //   ordonnance.medocs.forEach((medoc: Medoc) => {
    //     medoc.prises.forEach((prise: PriseMedoc) => {
    //       if (prise.id === paramPrise.id) {
    //         console.log("check prise :", prise)
    //       }
    //     });
    //   });
    // });

    this.saveData()

    // console.log("this.data.ordonnances[0]", this.data.ordonnances[0])

  }





  public addPriseEvent(priseMedoc: PriseMedoc, medocName: string, color: string): PriseMedoc {
    return {
      id: priseMedoc.id,
      datePrise: priseMedoc.datePrise,
      pris: priseMedoc.pris,
      event: {
        id: GsbMainService.generateId(),
        allDay: false,
        draggable: true,
        start: priseMedoc.datePrise,
        title: medocName,
        color: {
          primary: color,
          secondary: color + "50",
        },
      }
    }
  }

  public static generateId(): number {
    // this.availableId--
    // return this.availableId

    let id: number = 0
    if (typeof (Storage) != "undefined") {
      let str = localStorage.getItem("id")
      if (str !== "NaN" && str != null && str != undefined) {
        id = parseInt(str)
      }
    } else {
      console.error("Cache is not available for now ...")
    }

    id--

    if (typeof (Storage) != "undefined") {
      localStorage.setItem("id", id.toString())
    } else {
      console.error("Storage is not available for now ...")
    }

    return id
  }

  // public refreshEventList() {
  //   this.listeDesPrises = this.getPrisesList(this.data)
  // }


  public async alertInfo(header: string, message: string) {
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

  public async alertAreYouSure(header: string): Promise<boolean> {

    return new Promise(async (resolve, reject) => {

      const alert = await this.alertController.create({
        header,
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false)
            }
          },
          {
            text: 'Confirmer',
            handler: () => {
              resolve(true)
            }
          }
        ]
      });

      await alert.present()

      // reject(false)
    })
    
  }

  public printDate(paramDate: Date): string {
    let date = new Date(paramDate.toString())
    const listeJours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    return dateFormater.asString(`${listeJours[date.getDay()]} dd/MM, hh:mm`, date)
  }

}
