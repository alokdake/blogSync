import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  private storageSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    const data = localStorage.getItem('your_key');
    this.storageSubject.next(data);
  }

  getData(): Observable<string | null> {
    return this.storageSubject.asObservable();
  }

  setData(data: string) {
    localStorage.setItem('your_key', data);
    this.storageSubject.next(data);
  }

  removeData() {
    localStorage.removeItem('your_key');
    this.storageSubject.next(null);
  }
}
