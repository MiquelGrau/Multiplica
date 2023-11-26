import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { CarRepair } from '../model/car-repair.model';
import * as fromCarRepairsSelectors from '../selectors/car-repairs.selectors';
import * as carRepairsListActions from '../actions/car-repairs-list.actions';
@Component({
  selector: 'app-car-repairs-list',
  templateUrl: './car-repairs-list.component.html',
  styleUrls: ['./car-repairs-list.component.css'],
})
export class CarRepairsListComponent implements OnInit {
  newRepairs$: Observable<CarRepair[]> = of([]);
  inProgressRepairs$: Observable<CarRepair[]> = of([]);
  doneRepairs$: Observable<CarRepair[]> = of([]);
  isFetching$: Observable<boolean> = of(false);
  hasFetched$: Observable<boolean> = of(false);

  constructor(private store: Store) {}

  ngOnInit() {
    this.newRepairs$ = this.store.select(fromCarRepairsSelectors.selectNewRepairs);
    this.inProgressRepairs$ = this.store.select(fromCarRepairsSelectors.selectInProgressRepairs);
    this.doneRepairs$ = this.store.select(fromCarRepairsSelectors.selectDoneRepairs);
    this.isFetching$ = this.store.select(fromCarRepairsSelectors.selectIsFetching);
    this.hasFetched$ = this.store.select(fromCarRepairsSelectors.selectHasFetched);
  }
  public advanceCarRepair(carRepair: CarRepair) {
    this.store.dispatch(carRepairsListActions.advanceCarRepair({ carRepair }));
  }
}
