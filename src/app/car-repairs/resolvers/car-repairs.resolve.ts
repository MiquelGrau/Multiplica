import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take, tap, filter, switchMap, catchError } from 'rxjs/operators';
import * as fromCarRepairsSelectors from '../selectors/car-repairs.selectors';
import * as CarRepairsListActions from '../actions/car-repairs-list.actions';

@Injectable({ providedIn: 'root' })
export class CarRepairsResolve implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.store.pipe(
      select(fromCarRepairsSelectors.selectIsFetchingNeeded),
      take(1),
      tap((isFetchingNeeded) => {
        if (isFetchingNeeded) {
          this.store.dispatch(CarRepairsListActions.fetchCarRepairsList());
        }
      }),
      switchMap(isFetchingNeeded => {
        if (isFetchingNeeded) {
          return this.store.pipe(
            select(fromCarRepairsSelectors.selectHasFetched),
            filter(hasFetched => hasFetched),
            take(1)
          );
        }
        return of(true);
      }),
      catchError(() => of(true))
    );
  }
}
