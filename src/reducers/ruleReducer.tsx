interface FetchRulesRequestAction {
  type: 'FETCH_RULE_OPTIONS_REQUEST';
}

interface FetchRulesSuccessAction {
  type: 'FETCH_RULE_OPTIONS_SUCCESS';
  payload: any[];
}

interface FetchRulesFailureAction {
  type: 'FETCH_RULE_OPTIONS_FAILURE';
  error: string;
}

type ruleAction =
  | FetchRulesRequestAction
  | FetchRulesSuccessAction
  | FetchRulesFailureAction;


const initialState = {
  loading: false,
  rule: [] as any[],
  error: null,
};

const ruleReducer = (state = initialState, action: ruleAction) => {
  switch (action.type) {
    case 'FETCH_RULE_OPTIONS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_RULE_OPTIONS_SUCCESS':
      return { ...state, loading: false, rule: action.payload };
    case 'FETCH_RULE_OPTIONS_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default ruleReducer;
