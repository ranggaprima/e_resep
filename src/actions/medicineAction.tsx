import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export const fetchMedicines = (query: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch({ type: 'FETCH_MEDICINE_REQUEST' });
  try {
    const url = `http://116.193.190.138:9000/api/masterdata_auto/e_resep_barang_with_stok_auto?q=${query}&cekstok=true&margin_option=Layanan&page=1`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    dispatch({ type: 'FETCH_MEDICINE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_MEDICINE_FAILURE', error });
  }
};
