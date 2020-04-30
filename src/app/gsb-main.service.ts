import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PriseMedoc, Ordonnance } from './interfaces';
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
              // {
              //   id: 1,
              //   datePrise: addHours(startOfDay(addDays(new Date(), -3)), 20),
              //   pris: false
              // },
              // {
              //   id: 2,
              //   datePrise: addHours(startOfDay(addDays(new Date(), -2)), 20),
              //   pris: false
              // },
              // {
              //   id: 3,
              //   datePrise: addHours(startOfDay(addDays(new Date(), -1)), 20),
              //   pris: false
              // },
              {
                id: 4,
                datePrise: addHours(startOfDay(new Date()), 20),
                pris: false
              },
            ]
          },
          // {
          //   id: 1,
          //   nom: "Endorphine",
          //   nbBoiteMax: 7,
          //   nbBoiteAchetees: 2,
          //   nbMedocParBoite: 45,
          //   nbFoisParJour: 1,
          //   nbFoisParSemaine: 3,
          //   finDeLaPrise: new Date('2020-05-24T11:15:00'),
          //   prises: []
          // }
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

  public refresh(): Promise<void> {

    // const provider: GsbProvider = this

    console.log('Loading data ...');
    // console.log("this.data.ordonnances : ", this.data.ordonnances)

    return new Promise(async (resolve, reject) => {

      // TO SIMULATE A CONNECTION
      setTimeout((self: GsbMainService = this) => {

        self.data.ordonnances = self.TEST_listeOrdonnances
        // self.listeDesPrises = self.TEST_listePrises

        this.data.ordonnances.forEach(ordonnance => {
          ordonnance.medocs.forEach(medoc => {

            console.log(medoc);

            let listesDatesProgramee: Date[] = []

            // Les anciennes prises
            medoc.prises.forEach(prise => {
              this.listeDesPrises.push({
                id: prise.id,
                datePrise: prise.datePrise,
                pris: prise.pris,
                event: {
                  allDay: false,
                  draggable: true,
                  start: prise.datePrise,
                  title: medoc.nom
                }
              })

              if (!listesDatesProgramee.includes(prise.datePrise)) {
                listesDatesProgramee.push(startOfDay(prise.datePrise))
              }

            });


            for (let dayIncrement = 0; dayIncrement < 3; dayIncrement++) {

              let founded: boolean = false
              listesDatesProgramee.forEach(date => {
                if (date.getDate() === addDays(startOfDay(new Date()), dayIncrement).getDate()) {
                  founded = true
                }
              });

              if (!founded && this.testNewPriseMedoc((addDays(startOfDay(new Date()), dayIncrement)).getDay(), 7)) {
                
                // console.log(`Creation de ${medoc.nom} : ${addDays(startOfDay(new Date()), dayIncrement)}`)

                if (medoc.nbFoisParJour === 1) {

                  this.listeDesPrises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureSoir), medoc.nom))

                }
                else if (medoc.nbFoisParJour === 2) {

                  this.listeDesPrises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureMatin), medoc.nom))
                  this.listeDesPrises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureSoir), medoc.nom))

                }
                else if (medoc.nbFoisParJour !== 0) {

                  this.listeDesPrises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureMatin), medoc.nom))
                  this.listeDesPrises.push(this.createPrise(addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureSoir), medoc.nom))

                  const nbFoisEnPlus = medoc.nbFoisParJour - 1

                  let timeLeft = (Parameters.heureSoir - Parameters.heureMatin) / nbFoisEnPlus

                  for (let index = 1; index < nbFoisEnPlus; index++) {

                    this.listeDesPrises
                    .push(
                      this.createPrise(
                        addHours(startOfDay(addDays(new Date(), dayIncrement)), Parameters.heureMatin + index * timeLeft),
                        medoc.nom
                      )
                    )

                  }

                }

              } 
              
            }

          });
        });

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
    // console.log("   0 1 2 3 4 5 6\n");
    // for (var i: number = 7; i >= 0; i--) {
    //   console.log(`${i} |${monTableau[0][i] ? 1 : 0}|${monTableau[1][i] ? 1 : 0}|${monTableau[2][i] ? 1 : 0}|${monTableau[3][i] ? 1 : 0}|${monTableau[4][i] ? 1 : 0}|${monTableau[5][i] ? 1 : 0}|${monTableau[6][i] ? 1 : 0}`);
    // }

    // console.log(`Test (jour=${idJour}, nb=${nbPrisesSemaines}) = ${monTableau[idJour][nbPrisesSemaines]}`);
    return monTableau[idJour][nbPrisesSemaines];

  }

  private createPrise(date: Date, medocName):PriseMedoc {
    return {
      id: -1,
      datePrise: date,
      pris: false,
      event: {
        allDay: false,
        draggable: true,
        start: date,
        title: medocName
      }
    }
  }

}
