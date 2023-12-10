export interface IFilterDTO {
  value: string;
  label: string;
  count?: number;
}

export interface IFacet {
  groupName: string;
  values: { value: string; count: number }[];
}
