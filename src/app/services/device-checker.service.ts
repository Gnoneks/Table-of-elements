import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  Subject,
  takeUntil,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceCheckerService implements OnDestroy {
  private _isMobile = new BehaviorSubject<boolean>(false);
  private readonly _destroy$ = new Subject<void>();

  isMobile() {
    return this._isMobile.asObservable();
  }

  checkDevice() {
    this._isMobile.next(window.innerWidth <= 768);

    fromEvent(window, 'resize')
      .pipe(
        takeUntil(this._destroy$),
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe((event) => {
        const w = event.target as Window;

        this._isMobile.next(w.innerWidth <= 768);
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
