import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State, featureKey } from './photo-pagination.reducer'
import { selectFeature as selectPhotoFeature } from '../photos-page/photo.selectors'

export const selectFeature = createFeatureSelector<State>(
  featureKey
);

export const selectMaxPageNumber = createSelector(
  selectFeature,
  selectPhotoFeature,
  (photoPagination, photo) =>
    Math.ceil(photo.totalCount / photoPagination.limit)
)