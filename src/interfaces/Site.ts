export interface SiteData {
  overview: Overview;
}

export interface Overview {
  lastUpdateTime: string;
  lifeTimeData: LifeTimeData;
  lastYearData: LastYearData;
  lastMonthData: LastMonthData;
  lastDayData: LastDayData;
  currentPower: CurrentPower;
  measuredBy: string;
}

export interface LifeTimeData {
  energy: number;
  revenue: number;
}

export interface LastYearData {
  energy: number;
}

export interface LastMonthData {
  energy: number;
}

export interface LastDayData {
  energy: number;
}

export interface CurrentPower {
  power: number;
}
