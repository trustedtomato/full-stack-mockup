import { Action, createFeature, createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as PhotoPaginationActions from './photo-pagination.actions';

export const featureKey = 'photoPagination';

export interface State {
  currentPageNumber: number
  limit: number
  possibleLimits: number[]
}

export const initialState: State = {
  currentPageNumber: 1,
  limit: 10,
  possibleLimits: [10, 20, 30, 40, 50]
};

export const feature = createFeature({
  name: featureKey,
  reducer: createReducer(
    initialState,
    on(PhotoPaginationActions.updateCurrentPageNumber, (state, action) => ({
      ...state,
      currentPageNumber: action.newPageNumber
    })),
    on(PhotoPaginationActions.updateLimit, (state, action) => ({
      ...state,
      limit: action.newLimit
    }))
  )
})
