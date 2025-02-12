interface FetchDokterRequestAction {
  type: 'FETCH_DOKTER_OPTIONS_REQUEST';
}

interface FetchDokterSuccessAction {
  type: 'FETCH_DOKTER_OPTIONS_SUCCESS';
  payload: any[];
}

interface FetchDokterFailureAction {
  type: 'FETCH_DOKTER_OPTIONS_FAILURE';
  error: string;
}

type ruleAction =
  | FetchDokterRequestAction
  | FetchDokterSuccessAction
  | FetchDokterFailureAction;


const initialState = {
  loading: false,
  dokter: [] as any[],
  error: null,
};

const dokterReducer = (state = initialState, action: ruleAction) => {
  switch (action.type) {
    case 'FETCH_DOKTER_OPTIONS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_DOKTER_OPTIONS_SUCCESS':
      return { ...state, loading: false, dokter: action.payload };
    case 'FETCH_DOKTER_OPTIONS_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default dokterReducer;
