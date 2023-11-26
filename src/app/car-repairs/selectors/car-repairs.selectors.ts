import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCarRepairs from '../reducers/index';
import * as fromCarRepairsList from '../reducers/car-repairs-list.reducer';

export const selectCarRepairsState = createFeatureSelector<fromCarRepairs.State>(
  fromCarRepairs.carRepairsFeatureKey,
);

export const selectCarRepairsListState = createSelector(
  selectCarRepairsState,
  state => state[fromCarRepairsList.carRepairsListFeatureKey],
);

export const selectIsFetching = createSelector(
  selectCarRepairsListState,
  state => state.isFetching,
);

export const selectHasFetched = createSelector(
  selectCarRepairsListState,
  state => state.hasFetched
);

export const selectIsFetchingNeeded = createSelector(
  selectCarRepairsListState,
  state => !state.hasFetched || (state.hasError && !state.isFetching),
);

export const selectAllCarRepairs = createSelector(
  selectCarRepairsListState,
  state => state.carRepairs,
);

export const selectNewRepairs = createSelector(
  selectAllCarRepairs,
  carRepairs => carRepairs.filter(repair => repair.state === 'New')
);

export const selectInProgressRepairs = createSelector(
  selectAllCarRepairs,
  carRepairs => carRepairs.filter(repair => repair.state === 'In progress')
);

export const selectDoneRepairs = createSelector(
  selectAllCarRepairs,
  carRepairs => carRepairs.filter(repair => repair.state === 'Done')
);

export const selectTotalOfNewCarRepairs = createSelector(
  selectNewRepairs,
  newRepairs => newRepairs.length,
);

export const selectTotalOfInProgressCarRepairs = createSelector(
  selectInProgressRepairs,
  inProgressRepairs => inProgressRepairs.length,
);

export const selectTotalOfDoneCarRepairs = createSelector(
  selectDoneRepairs,
  doneRepairs => doneRepairs.length,
);
