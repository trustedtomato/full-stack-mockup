import { createAction, props } from '@ngrx/store';

export const updateCurrentPageNumber = createAction(
  '[PhotoPagination] Update current page',
  props<{ newPageNumber: number }>()
);

export const updateLimit = createAction(
  '[PhotoPagination] Update limit',
  props<{ newLimit: number }>()
);




