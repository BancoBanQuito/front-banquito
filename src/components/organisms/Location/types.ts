export interface Province {
  provinceName: string;
  cantons: Canton[];
}

export interface Canton {
  cantonName: string;
  parishes: Parish[];
}

export interface Parish {
  parishName: string;
  zipCode: string;
}
