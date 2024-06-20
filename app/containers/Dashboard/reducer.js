/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import { ODOO_SUCCESS,
  ODOO_REQUEST,
  ODOO_ERROR
} from './constants';

export const initialState = {
  loading: false,
  successful: false,
  error: false,
  odooResponse: {},
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, (draft ) => {
    switch (action.type) {
      case ODOO_REQUEST:
                draft.loading = true;
                break;
            case ODOO_SUCCESS:
                draft.successful = true;
                draft.odooResponse = action.payload;
                draft.loading = false;
                break;
            case ODOO_ERROR:
                draft.error = action.error;
                draft.successful = false;
                draft.loading = false;
                break;
    }
  });

export default dashboardReducer;
