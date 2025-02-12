import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import apiConfig from '../config/apiConfig';

export const saveResep = (formValues: any) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  console.log('SAVING....: ', formValues)
  dispatch({ type: 'SAVE_RESEP_REQUEST' });
  try {
    const url = apiConfig(`pelayanan/e_resep`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    console.log('ACTION SAVE: ', data)

    dispatch({ type: 'SAVE_RESEP_SUCCESS', payload: data });
  } catch (error) {
    console.log('ERROR: ', error)
    alert('Service is undermaintenance. Please try again.');
    dispatch({ type: 'SAVE_RESEP_FAILURE', error });
  }
};
