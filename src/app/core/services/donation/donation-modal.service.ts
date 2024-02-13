import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DonationModalService {

  constructor() { }

  modalOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  donationModal(): Observable<boolean> {
    return this.modalOpened.asObservable();
  }
}
