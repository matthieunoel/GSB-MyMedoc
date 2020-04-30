export interface Data {
    id: number
    login: string
    password: string
    ordonnances: Ordonnance[]
}

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
    prises: PriseMedoc[]
    color?: string 
}

export interface PriseMedoc {
    id: number
    datePrise: Date;
    pris: boolean;
    event?: {
        title: string,
        start: Date,
        allDay: boolean,
        draggable: boolean,
        color?: {
            primary: string,
            secondary: string,
        }
    },
}

// export interface PriseForManip {
//     id: number
//     datePrise: Date;
//     pris: boolean;
//     event: {
//         title: string,
//         start: Date,
//         allDay: boolean,
//         draggable: boolean
//     },
// }

// export class GsbProvider {

//     constructor() {}

// }