export interface MedicineType {
  label: string;
  value: string;
}
  
export interface MedicineState {
  options: MedicineType[];
  loading: boolean;
  error: string | null;
}

export interface RuleType {
  label: string;
  value: string;
}
  
export interface RuleState {
  options: RuleType[];
  loading: boolean;
  error: string | null;
}

export interface DokterType {
  label: string;
  value: string;
}
  
export interface DokterState {
  options: DokterType[];
  loading: boolean;
  error: string | null;
}