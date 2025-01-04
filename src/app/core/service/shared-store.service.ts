import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreService } from 'src/app/core/service/store.service';
import { SharedState } from '../store/reducer';
import { selectAddressDistricts, selectAddressPincodes, selectAddressStates, selectAddressTowns, selectLoggedInUser, selectLoggedInUserWithSchool, selectSchoolProfile } from '../store/selector';
import { addressActions, logInActions } from '../store/action';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedStoreService extends StoreService<SharedState> {
  constructor() {
    const store = inject(Store);

    super(store);
  }

  get loggedInUserWithSchool$() {
    this.dispatch(logInActions.userProfile());
    return this.select(selectLoggedInUserWithSchool).pipe(
      filter(({ schoolProfile, loggedInUser }) => !!schoolProfile && !!loggedInUser),
    );
  }

  get School$() {
    this.dispatch(logInActions.userProfile());
    return this.select(selectSchoolProfile).pipe(filter((schoolProfile) => !!schoolProfile));
  }

  get loggedInUser$() {
    this.dispatch(logInActions.userProfile());
    return this.select(selectLoggedInUser).pipe(filter((loggedInUser) => !!loggedInUser));
  }

  get addressStates$() {
    this.dispatch(addressActions.loadStates());
    return this.select(selectAddressStates);
  }

  addressDistrict$(state: string) {
    this.dispatch(addressActions.loadDistricts({ state }));
    return this.select(selectAddressDistricts(state));
  }

  addressPincode$(state: string, district: string, town?: string) {
    this.dispatch(addressActions.loadPincodes({ state, district }));
    return this.select(selectAddressPincodes(state, district, town));
  }

  addressTowns$(state: string, district: string, pincode?: string) {
    return this.select(selectAddressTowns(state, district, pincode));
  }
}
