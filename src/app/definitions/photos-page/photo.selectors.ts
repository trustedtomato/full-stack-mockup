import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State, featureKey } from './photo.reducer'

export const selectFeature = createFeatureSelector<State>(
  featureKey
);
