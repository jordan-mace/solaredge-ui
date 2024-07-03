export interface EnvironmentData {
  envBenefits: EnvBenefits;
}

export interface EnvBenefits {
  gasEmissionSaved: GasEmissionSaved;
  treesPlanted: number;
  lightBulbs: number;
}

export interface GasEmissionSaved {
  units: string;
  co2: number;
  so2: number;
  nox: number;
}
