import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
public formArray = new BehaviorSubject<any>(null);
public formValue = new BehaviorSubject<any>(null);
public persondetails = new BehaviorSubject<any>(null);
  constructor() { }
}
