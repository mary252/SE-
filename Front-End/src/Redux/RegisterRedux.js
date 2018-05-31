import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  register: [ 'data' ],
  act: [ 'data' ],
  addSuccess: [ 'token' ],
  addFailure: [ 'error' ]
});
export const RegisterTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  token: null,
  data: {},
  error: null,
  loading: false,
  checked: false,
  user: {}
});

/* ------------- Reducers ------------- */
// Take A state and Merge it With New Values for Initial State Variables The following methods are called register.js in Containters/Notauthenticated
export const register = state => // Registers a client
  state.merge({ loading: true });
export const act = (state, { data }) =>  // Sends data to the Tag assignment page
  state.merge({ loading: false, error: null, data });
export const success = (state, { token }) =>
  state.merge({ loading: false, error: null, token });

export const failure = (state, { error }) =>
  state.merge({ loading: false, error, token: null });


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER]: register,
  [Types.ACT]: act,
  [Types.ADD_SUCCESS]: success,
  [Types.ADD_FAILURE]: failure
});
