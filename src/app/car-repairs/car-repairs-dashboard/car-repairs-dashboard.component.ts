import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as fromCarRepairsSelectors from '../selectors/car-repairs.selectors';

@Component({
  selector: 'app-car-repairs-dashboard',
  templateUrl: './car-repairs-dashboard.component.html',
  styleUrls: ['./car-repairs-dashboard.component.css'],
})
export class CarRepairsDashboardComponent implements OnInit {
  totalNewRepairs$: Observable<number> = of(0);
  totalInProgressRepairs$: Observable<number> = of(0);
  totalDoneRepairs$: Observable<number> = of(0);
  isFetching$: Observable<boolean> = of(false);

  constructor(private store: Store) {}

  ngOnInit() {
    this.totalNewRepairs$ = this.store.select(fromCarRepairsSelectors.selectTotalOfNewCarRepairs);
    this.totalInProgressRepairs$ = this.store.select(fromCarRepairsSelectors.selectTotalOfInProgressCarRepairs);
    this.totalDoneRepairs$ = this.store.select(fromCarRepairsSelectors.selectTotalOfDoneCarRepairs);
    this.isFetching$ = this.store.select(fromCarRepairsSelectors.selectIsFetching);
  }
}
