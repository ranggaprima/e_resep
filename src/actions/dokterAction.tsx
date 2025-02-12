import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export const fetchDokters = (query: string, page: number) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch({ type: 'FETCH_DOKTER_OPTIONS_REQUEST' });
  try {
    const url = `http://116.193.190.138:9000/api/masterdata_auto/dokter_auto?q=${query}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('FETCH DOKTER: ', data)
    console.log(data)
    dispatch({ type: 'FETCH_DOKTER_OPTIONS_SUCCESS', payload: data.data });
  } catch (error) {
    dispatch({ type: 'FETCH_DOKTER_OPTIONS_FAILURE', error });
  }
};
