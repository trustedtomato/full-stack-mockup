import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as PhotoActions from './photo.actions';
import { Photo } from './photo.model';

export const photoFeatureKey = 'photo';

export interface State extends EntityState<Photo> {
  // additional entities state properties
  totalCount: number
}

export const adapter: EntityAdapter<Photo> = createEntityAdapter<Photo>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  totalCount: 0
});

export const reducer = createReducer(
  initialState,
  on(PhotoActions.addPhoto,
    (state, action) => adapter.addOne(action.photo, state)
  ),
  on(PhotoActions.upsertPhoto,
    (state, action) => adapter.upsertOne(action.photo, state)
  ),
  on(PhotoActions.addPhotos,
    (state, action) => adapter.addMany(action.photos, state)
  ),
  on(PhotoActions.upsertPhotos,
    (state, action) => adapter.upsertMany(action.photos, state)
  ),
  on(PhotoActions.updatePhoto,
    (state, action) => adapter.updateOne(action.photo, state)
  ),
  on(PhotoActions.updatePhotos,
    (state, action) => adapter.updateMany(action.photos, state)
  ),
  on(PhotoActions.deletePhoto,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PhotoActions.deletePhotos,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(PhotoActions.loadPhotos,
    (state) => state
  ),
  on(PhotoActions.loadPhotosFailure,
    (state) => state
  ),
  on(PhotoActions.clearPhotos,
    state => adapter.removeAll(state)
  ),
  on(PhotoActions.updatePhotosTotalCount,
    (state, action) => ({...state, totalCount: action.count})
  )
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
