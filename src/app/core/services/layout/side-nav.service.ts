import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  constructor() { }

  sideNavOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  sideNav(): Observable<boolean> {
    return this.sideNavOpened.asObservable();
  }
}
