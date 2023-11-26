import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as carRepairsListActions from '../actions/car-repairs-list.actions';
import { CarRepairsListService } from '../car-repairs-list.service';

@Injectable()
export class CarRepairsListEffects {
  fetchCarRepairsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(carRepairsListActions.fetchCarRepairsList),
      mergeMap(() =>
        this.carRepairsListService.fetchCarRepairs().pipe(
          map(carRepairs => carRepairsListActions.fetchCarRepairsListSuccess({ carRepairs })),
          catchError(error => of(carRepairsListActions.fetchCarRepairsListFail()))
        )
      )
    ),
  );

  advanceCarRepair$ = createEffect(() =>
    this.actions$.pipe(
      ofType(carRepairsListActions.advanceCarRepair),
      mergeMap(action =>
        this.carRepairsListService.advanceCarRepair(action.carRepair).pipe(
          map(updatedRepair => carRepairsListActions.advanceCarRepairSuccess({ carRepair: updatedRepair })),
          catchError(error => of(carRepairsListActions.advanceCarRepairFail()))
        )
      )
    ),
  );

  constructor(
    private actions$: Actions,
    private carRepairsListService: CarRepairsListService,
  ) { }
}
