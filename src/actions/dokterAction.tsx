import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import apiConfig from '../config/apiConfig';

export const fetchDokters = (query: string, page: number) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch({ type: 'FETCH_DOKTER_OPTIONS_REQUEST' });
  try {
    console.log(apiConfig)
    const url = apiConfig(`/masterdata_auto/dokter_auto?q=${query}&page=${page}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log('FETCH DOKTER: ', data)
    console.log(data)
    dispatch({ type: 'FETCH_DOKTER_OPTIONS_SUCCESS', payload: data.data });
  } catch (error) {
    dispatch({ type: 'FETCH_DOKTER_OPTIONS_FAILURE', error });
  }
};
