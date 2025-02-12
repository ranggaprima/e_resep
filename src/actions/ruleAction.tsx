import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export const fetchRules = (query: string, page: number, id_medicine: number) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch({ type: 'FETCH_RULE_REQUEST' });
  try {
    const url = `http://116.193.190.138:9000/api/masterdata_auto/aturan_pakai_auto?q=${query}&page=${page}&id_sediaan=${id_medicine}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    dispatch({ type: 'FETCH_RULE_OPTIONS_SUCCESS', payload: data.data });
  } catch (error) {
    dispatch({ type: 'FETCH_RULE_OPTIONS_FAILURE', error });
  }
};
