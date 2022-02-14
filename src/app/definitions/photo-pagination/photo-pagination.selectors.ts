import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State, featureKey, feature } from './photo-pagination.reducer'
import { selectFeature as selectPhotoFeature } from '../photos-page/photo.selectors'
import { Photo } from '../photos-page/photo.model';

export const selectFeature = createFeatureSelector<State>(
  featureKey
);

export const selectMaxPageNumber = createSelector(
  selectFeature,
  selectPhotoFeature,
  (photoPagination, photo) =>
    Math.ceil(photo.totalCount / photoPagination.limit)
)

export const selectStart = createSelector(
  selectFeature,
  ({ currentPageNumber, limit }) =>
    (currentPageNumber - 1) * limit
)

export const selectDisplayedPhotos = createSelector(
  selectStart,
  feature.selectLimit,
  selectPhotoFeature,
  (start, limit, photo) => (
    Object.values(photo.entities)
      .filter(photo =>
        photo !== undefined &&
        photo.sortId >= start &&
        photo.sortId < start + limit
      // We filtered out the undefined values,
      // so we can safely cast to Photo[].
      ) as Photo[]
  )
    .sort((a, b) => a.sortId - b.sortId)
)