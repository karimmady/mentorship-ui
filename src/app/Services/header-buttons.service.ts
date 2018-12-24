import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderButtonsService {

  public isSignedIn = new BehaviorSubject(false);

  constructor() { }


  setIsSignedIn() {
    this.isSignedIn.next(true);
}

signOut()
{
    this.isSignedIn.next(false); 
}

}
