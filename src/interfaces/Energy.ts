export interface EnergyData {
    energy: Energy
}

export interface Energy {
    timeUnit: string
    unit: string
    measuredBy: string
    values: Value[]
}

export interface Value {
    date: string
    value: number
}