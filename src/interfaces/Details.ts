export interface DetailsData {
    powerDetails: PowerDetails
}

export interface PowerDetails {
    timeUnit: string
    unit: string
    meters: Meter[]
}

export interface Meter {
    type: string
    values: Value[]
}

export interface Value {
    date: string
    value?: number
}