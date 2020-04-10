import { Time } from '@angular/common';

export interface Ordonnance {
    id: number
    titre: string
    description: string
    dateDebut: Date
    dateFin: Date
    medocs: Medoc[]
}

export interface Medoc {
    id: number
    nom: string
    nbBoiteMax: number
    nbBoiteAchetees: number
    nbMedocParBoite: number
    nbFoisParJour: number
    nbFoisParSemaine: number
    finDeLaPrise: Date
    heuresPrises: PriseMedoc[]
}

export interface PriseMedoc {
    id: number
    heurePrise: Time;
    pris: boolean;
}

export class GsbProvider {

    constructor(){}

}