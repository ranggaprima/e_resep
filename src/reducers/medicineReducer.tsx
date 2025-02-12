interface MedicineData {
  id: number;
  name: string;
}

interface FetchMedicineRequestAction {
  type: 'FETCH_MEDICINE_REQUEST';
}

interface FetchMedicineSuccessAction {
  type: 'FETCH_MEDICINE_SUCCESS';
  payload: {
    data: MedicineData[];
  };
}

interface FetchMedicineFailureAction {
  type: 'FETCH_MEDICINE_FAILURE';
  error: string;
}

type MedicineAction =
  | FetchMedicineRequestAction
  | FetchMedicineSuccessAction
  | FetchMedicineFailureAction;

const initialState = {
  loading: false,
  medicine: [] as MedicineData[],
  error: null as string | null,
};

const medicineReducer = (state = initialState, action: MedicineAction) => {
  switch (action.type) {
    case 'FETCH_MEDICINE_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_MEDICINE_SUCCESS':
      return { ...state, loading: false, medicine: action.payload.data };
    case 'FETCH_MEDICINE_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default medicineReducer;
