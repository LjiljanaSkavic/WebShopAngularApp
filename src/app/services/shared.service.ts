import { Injectable } from '@angular/core';
import * as sha512 from 'js-sha512';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {
  }

  getSha512Hash(input: string): string {
    return sha512.sha512(input);
  }
}
