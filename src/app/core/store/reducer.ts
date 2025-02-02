import { createReducer, on } from '@ngrx/store';
import { Address, Nullable, User } from '@sc-models/core';
import { logInActions, addressActions } from './action';
import { SchoolProfile } from '@sc-models/school';

export interface AddressState {
  [state: string]: {
    [district: string]: Address[];
  };
}

export interface SharedState {
  loggedInUser: User;
  schoolProfile: SchoolProfile;
  addressHelper: AddressState;
  fetchingStates: boolean;
  fetchingDistricts: boolean;
  fetchingPincodes: boolean;
  fetchingTowns: boolean;
}

export const initialState: Nullable<SharedState> = {
  loggedInUser: null,
  schoolProfile: null,
  addressHelper: null,
  fetchingStates: false,
  fetchingDistricts: false,
  fetchingPincodes: false,
  fetchingTowns: false,
};

export const SharedStoreReducer = createReducer(
  initialState,
  // #region Login
  on(logInActions.logInSuccess, (state, action) => ({
    ...state,
    loggedInUser: {
      ...action.response.userProfile.user,
      profileImageUrl: action.response.userProfile.profileImageUrl,
    },
    schoolProfile: action.response.userProfile.school,
    addressHelper: state.addressHelper || {},
  })),
  on(logInActions.userProfileSuccess, (state, action) => ({
    ...state,
    loggedInUser: {
      ...action.response.user,
      profileImageUrl: action.response.profileImageUrl,
    },
    schoolProfile: action.response.school,
    addressHelper: state.addressHelper || {},
  })),

  // #endregion Login

  // #region Address
  on(addressActions.loadStates, (state) => ({ ...state, fetchingStates: true })),
  on(addressActions.loadStatesSuccess, (state, { states }) => {
    const addressHelper = { ...state.addressHelper };
    states.forEach((stateName) => {
      addressHelper[stateName] = {};
    });
    return { ...state, addressHelper, fetchingStates: false };
  }),
  on(addressActions.loadStatesFailure, (state) => ({
    ...state,
    fetchingStates: false,
  })),

  on(addressActions.loadDistricts, (state) => ({ ...state, fetchingDistricts: true })),
  on(addressActions.loadDistrictsSuccess, (state, { state: stateName, districts }) => {
    const addressHelper = { ...state.addressHelper };
    districts.forEach((district) => {
      addressHelper[stateName] = {
        ...addressHelper[stateName],
        [district]: [],
      };
    });
    return { ...state, addressHelper, fetchingDistricts: false };
  }),
  on(addressActions.loadDistrictsFailure, (state) => ({
    ...state,
    fetchingDistricts: false,
  })),

  on(addressActions.loadPincodes, (state) => ({ ...state, fetchingPincodes: true })),
  on(addressActions.loadPincodesSuccess, (state, { state: stateName, district, addresses }) => {
    const addressHelper = { ...state.addressHelper };
    addressHelper[stateName] = {
      ...addressHelper[stateName],
      [district]: addresses,
    };
    return { ...state, addressHelper, fetchingPincodes: false };
  }),
  on(addressActions.loadPincodesFailure, (state) => ({
    ...state,
    fetchingPincodes: false,
  })),

  // #endregion Address

  // #region Logout
  on(logInActions.logOut, () => ({
    ...initialState,
  })),
  // #endregion Logout
);
