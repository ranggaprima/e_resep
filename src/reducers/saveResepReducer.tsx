interface SaveResepRequestAction {
  type: 'SAVE_RESEP_REQUEST';
}

interface SaveResepSuccessAction {
  type: 'SAVE_RESEP_SUCCESS';
  payload: any[];
}

interface SaveResepFailureAction {
  type: 'SAVE_RESEP_FAILURE';
  error: string;
}

type ruleAction =
  | SaveResepRequestAction
  | SaveResepSuccessAction
  | SaveResepFailureAction;


const initialState = {
  loading: false,
  rule: [] as any[],
  error: null,
};

const saveResepReducer = (state = initialState, action: ruleAction) => {
  console.log('SAVE: ', action)
  switch (action.type) {
    case 'SAVE_RESEP_REQUEST':
      return { ...state, loading: true };
    case 'SAVE_RESEP_SUCCESS':
      return { ...state, loading: false, rule: action.payload };
    case 'SAVE_RESEP_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default saveResepReducer;
