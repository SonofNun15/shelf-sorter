import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {
  nextWithin(max: number) {
    const fract = Math.random();
    return Math.floor(fract * max);
  }

  nextTo(max: number) {
    const fract = Math.random();
    return Math.round(fract * max);
  }

  nextInRange(min: number, max: number) {
    const fract = Math.random();
    const range = (max - min);
    return Math.round(fract * range) + min;
  }
}
