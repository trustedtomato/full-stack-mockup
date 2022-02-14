import * as fromPhotoPagination from './photo-pagination.actions';

describe('loadPhotoPaginations', () => {
  it('should return an action', () => {
    expect(fromPhotoPagination.loadPhotoPaginations().type).toBe('[PhotoPagination] Load PhotoPaginations');
  });
});
