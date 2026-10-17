export interface DataItem {
  [field: string]: string | number | number[] | null | undefined;
}

export type SearchDataType = {
  index: number;
  code: string;
  name: string;
  sector?: string;
  weightInP?: number;
  weightInC?: number;
  initialValue?: number;
  expectedReturnAnnual?: number;
  riskAnnual?: number;
  role?: string;
  refPrice: number;
  price: number;
  change: number;
};

export interface AnalysisData {
  salesData: DataItem[];
  cashFlowData: DataItem[];
  searchData: SearchDataType[];
  salesTypeData: DataItem[];
  salesTypeDataOnline: DataItem[];
  salesTypeDataOffline: DataItem[];
  salesTypeDataPortfolio?: DataItem[];
}
