/*
 *
 * Dashboard actions
 *
 */

import { ODOO_SUCCESS,
          ODOO_REQUEST,
          ODOO_ERROR
 } from './constants';

export function odooRequest(payload) {
  console.log('action payload request', payload)
  return {
    
    type: ODOO_REQUEST,
    payload
  };
}

export function odooSuccess(payload) {
  console.log('action payload success', payload)
  return {
    type: ODOO_SUCCESS,
    payload
  };
}

export function odooError(error) {
  console.log('action payload error', payload)
  return {
    type: ODOO_ERROR,
    error
  };
}
