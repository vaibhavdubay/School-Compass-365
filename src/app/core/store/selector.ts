import { createFeatureSelector, createSelector } from '@ngrx/store';
import { STORE_FEATURES } from '@sc-enums/store';
import { SharedState } from './reducer';

const selectSharedState = createFeatureSelector<SharedState>(STORE_FEATURES.SHARED);

export const selectLoggedInUser = createSelector(selectSharedState, (state) => state.loggedInUser);
export const selectSchoolProfile = createSelector(selectSharedState, (state) => state.schoolProfile);

export const selectLoggedInUserWithSchool = createSelector(selectSharedState, ({ loggedInUser, schoolProfile }) => ({
  loggedInUser,
  schoolProfile,
}));

export const selectAddress = createSelector(selectSharedState, (state) => state.addressHelper);
export const selectAddressStates = createSelector(selectSharedState, (state) => Object.keys(state.addressHelper || {}));
export const selectAddressDistricts = (stateName: string) =>
  createSelector(selectSharedState, (state) => Object.keys(state.addressHelper?.[stateName] || {})
);
export const selectAddressPincodes = (stateName: string, districtName: string, town?: string) =>
  createSelector(selectSharedState, (state) => {
    const towns = state.addressHelper?.[stateName]?.[districtName] || [];
    return towns
      .reduce<string[]>((unique, add) => {
        if (!town || add.town?.toLowerCase() === town.toLowerCase()) {
          const pincode = add.pincode as string;
          if (!unique.includes(pincode)) {
            unique.push(pincode);
          }
        }
        return unique;
      }, [])
      .sort();
  });
export const selectAddressTowns = (stateName: string, districtName: string, pincode?: string) =>
  createSelector(selectSharedState, (state) => {
    const towns = state.addressHelper?.[stateName]?.[districtName] || [];
    return towns
      .reduce<string[]>((unique, add) => {
        if (!pincode || add.pincode?.toLowerCase() === pincode.toLowerCase()) {
          const town = add.town as string;
          if (!unique.includes(town)) {
            unique.push(town);
          }
        }
        return unique;
      }, [])
      .sort();
  });
