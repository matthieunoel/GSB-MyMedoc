import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PriseMedoc, Ordonnance, Medoc } from './interfaces';
import { startOfDay, addHours, addDays } from 'date-fns';
import { Data } from '@angular/router';
import { Parameters } from './parameters'
// const parameters: Parameters = require('./parameters')

@Injectable({
  providedIn: 'root'
})
export class GsbMainService {

  constructor(private alertController: AlertController) {
    // window.setInterval(() => {
    //   this.refresh()
    // }, 5000);
    this.loadParameters()
  }

  private loadParameters() {
    Parameters.heureMatin = 8
    Parameters.heureSoir = 20
  }

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

  dataLoaded: boolean = false;

  niceColors: string[] = ["#ff7b00", "#c23616", "#0097e6", "#8c7ae6", "#e1b12c", "#44bd32"]

  data: Data = {
    id: 0,
    login: 'LOGIN',
    password: 'PASSWORD',
    ordonnances: []
  }
  listeDesPrises: PriseMedoc[] = []

  
  TEST_listeOrdonnances: Ordonnance[] =
    [
      {
        id: 0,
        titre: "Ordonnance du docteur",
        description: "Cette ordonnance est coooooool",
        dateDebut: new Date('2020-03-24T11:15:00'),
        dateFin: new Date('2020-05-24T11:15:00'),
        medocs: [
          {
            id: 0,
            nom: "Salbutamol",
            nbBoiteMax: 2,
            nbBoiteAchetees: 1,
            nbMedocParBoite: 45,
            nbFoisParJour: 3,
            nbFoisParSemaine: 7,
            finDeLaPrise: undefined,
            prises: [
              {
                id: 1,
                datePrise: addHours(startOfDay(addDays(new Date(), -3)), 20),
                pris: false
              },
              {
                id: 2,
                datePrise: addHours(startOfDay(addDays(new Date(), -2)), 20),
                pris: false
              },
              {
                id: 3,
                datePrise: addHours(startOfDay(addDays(new Date(), -1)), 20),
                pris: false
              },
              {
                id: 4,
                datePrise: addHours(startOfDay(new Date()), 20),
                pris: false
              },
            ]
          },
          {
            id: 1,
            nom: "Endorphine",
            nbBoiteMax: 7,
            nbBoiteAchetees: 2,
            nbMedocParBoite: 45,
            nbFoisParJour: 1,
            nbFoisParSemaine: 6,
            finDeLaPrise: new Date('2020-05-24T11:15:00'),
            prises: []
          }
        ]
      }
  ]

  TEST_listePrises: PriseMedoc[] = [
    {
      id: 4,
      datePrise: addHours(startOfDay(new Date()), 20),
      pris: false,
      event: {
        allDay: false,
        draggable: true,
        start: addHours(startOfDay(new Date()), 20),
        title: "CrystalMeth"
      }
    },
    {
      id: 5,
      datePrise: addHours(startOfDay(addDays(new Date(), 1)), 20),
      pris: false,
      event: {
        allDay: false,
        draggable: true,
        // start: new Date("2020-05-01T20:00:00"),
        start: addHours(startOfDay(addDays(new Date(), 1)), 20),
        title: "CrystalMeth"
      }
    },
    {
      id: 5,
      datePrise: addHours(startOfDay(addDays(new Date(), 2)), 20),
      pris: false,
      event: {
        allDay: false,
        draggable: true,
        start: addHours(startOfDay(addDays(new Date(), 2)), 20),
        title: "CrystalMeth"
      }
    }
  ]

  private getData(): Data {
    return this.TEST_listeOrdonnances
  }

  private getPrisesList(data: Data): PriseMedoc[] {
    
    let listeDesPrises: PriseMedoc[] = []
    let listesDatesProgramee: Date[] = []

    data.ordonnances.forEach((ordonnance: Ordonnance) => {
      ordonnance.medocs.forEach((medoc: Medoc) => {

        let color: string

        if (medoc.color != undefined) {
          color = medoc.color
        } else {
          color = "#a3aaaf"
        }

        // On ajoute les prises enregistrées
        medoc.prises.forEach(prise => {

          // listeDesPrises.push({
          //   id: prise.id,
          //   datePrise: prise.datePrise,
          //   pris: prise.pris,
          //   event: {
          //     allDay: false,
          //     draggable: true,
          //     start: prise.datePrise,
          //     title: medoc.nom
          //   }
          // })

          listeDesPrises.push(this.addPriseEvent(prise, medoc.nom, color)) 
        

          // On note au passage les dates de ces prises pour savoir quand en créer et là où n'y en a pas
          if (!listesDatesProgramee.includes(prise.datePrise)) {
            listesDatesProgramee.push(startOfDay(prise.datePrise))
          }

        });

        // On teste les ajout de prises sur 3 jours, le jour actuel comptant
        for (let dayIncrement = 0; dayIncrement < 3; dayIncrement++) {

          // On teste s'il y a déjà des prises pour ce médicament le jour en question
          let founded: boolean = false
          listesDatesProgramee.forEach(date => {
            if (date.getDate() === addDays(startOfDay(new Date()), dayIncrement).getDate()) {
              founded = true
            }
          });

          // console.log("!(medoc.finDeLaPrise < (new Date()))) :", `!(${medoc.finDeLaPrise} < (${new Date()})) :`, !(medoc.finDeLaPrise < (new Date())))
          // console.log("ordonnance.dateFin >= (new Date()) :", `${ordonnance.dateFin} >= (${new Date()}) :`, ordonnance.dateFin >= (new Date()))
          // console.log("\n")

          // Si il n'y a pas de prises ce jour là  ET  qu'il est censé y avoir des prises ce jour là
          // ET  que l'ordonnance est valide  ET  que le médicament est encore prescrit  (en gros s'il faut ajouter une prise)
          if (!founded && this.testNewPriseMedoc((addDays(startOfDay(new Date()), dayIncrement)).getDay(), medoc.nbFoisParSemaine) && ordonnance.dateFin >= (new Date()) && !(medoc.finDeLaPrise < (new Date()))) {

            // console.log(`Creation de ${medoc.nom} : ${addDays(startOfDay(new Date()), dayIncrement)}`)

            // S'il y a un médicament a prendre par jour
            if (medoc.nbFoisParJour === 1) {

              listeDesPrises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureSoir), medoc.nom, color))

            }
            // S'il y a 2 médicaments a prendre par jour
            else if (medoc.nbFoisParJour === 2) {

              listeDesPrises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureMatin), medoc.nom, color))
              listeDesPrises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureSoir), medoc.nom, color))

            }
            // S'il y a plus de 2 médicaments a prendre par jour
            else if (medoc.nbFoisParJour !== 0) {

              listeDesPrises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureMatin), medoc.nom, color))
              listeDesPrises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureSoir), medoc.nom, color))

              const nbFoisEnPlus = medoc.nbFoisParJour - 1

              // On fais une moyenne et on attribue des médicaments entre les heures du matin et du soir
              let timeLeft = (Parameters.heureSoir - Parameters.heureMatin) / nbFoisEnPlus

              for (let index = 1; index < nbFoisEnPlus; index++) {

                listeDesPrises
                  .push(
                    this.createPrise(
                      addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureMatin + index * timeLeft),
                      medoc.nom,
                      color
                    )
                  )
              }
            }
          }
        }
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

    // console.log("listeDesPrises", listeDesPrises)

    return listeDesPrises


  }

  public refresh(): Promise<void> {

    // const provider: GsbProvider = this

    console.log('Loading data ...');
    // console.log("this.data.ordonnances : ", this.data.ordonnances)

    return new Promise(async (resolve, reject) => {

      // TO SIMULATE A CONNECTION
      setTimeout((self: GsbMainService = this) => {

        self.data.ordonnances = self.getData()
        self.listeDesPrises = self.getPrisesList(self.data)

        console.log('Data loading completed : ', this.data.ordonnances)
        this.dataLoaded = true
        resolve();
      }, 1500);

    })
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

  private createPrise(date: Date, medocName, color):PriseMedoc {
    return {
        id: -1,
        datePrise: date,
        pris: false,
        event: {
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

  private addPriseEvent(priseMedoc: PriseMedoc, medocName: string, color: string): PriseMedoc {
    return {
      id: priseMedoc.id,
      datePrise: priseMedoc.datePrise,
      pris: priseMedoc.pris,
      event: {
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

}
