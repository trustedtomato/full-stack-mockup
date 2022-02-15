import * as fromPhotoPagination from './photo-pagination.actions';

describe('loadPhotoPaginations', () => {
  it('should return an action', () => {
    expect(fromPhotoPagination.updateCurrentPageNumber({ newPageNumber: 10 }).type).toBe('[PhotoPagination] Load PhotoPaginations');
  });
});
