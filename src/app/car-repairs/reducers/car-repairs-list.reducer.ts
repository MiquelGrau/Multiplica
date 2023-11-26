import { createReducer, on } from '@ngrx/store';
import * as CarRepairsListActions from '../actions/car-repairs-list.actions';
import { CarRepair } from '../model/car-repair.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const carRepairsListFeatureKey = 'carRepairsList';

export const carRepairsAdapter: EntityAdapter<CarRepair> = createEntityAdapter<CarRepair>({
  selectId: (carRepair: CarRepair) => carRepair.jobNumber
});

export interface State extends EntityState<CarRepair> {
  isFetching: boolean;
  hasError: boolean;
  hasFetched: boolean;
}

export const initialState: State = carRepairsAdapter.getInitialState({
  isFetching: false,
  hasError: false,
  hasFetched: false,
});

export const reducer = createReducer(
  initialState,
  on(CarRepairsListActions.fetchCarRepairsListSuccess, (state, { carRepairs }) =>
    carRepairsAdapter.setAll(carRepairs, { ...state, hasFetched: true, isFetching: false, hasError: false })
  ),
  on(CarRepairsListActions.advanceCarRepairSuccess, (state, { carRepair }) =>
    carRepairsAdapter.upsertOne(carRepair, state)
  ),
);

