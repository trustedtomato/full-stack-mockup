import { feature, initialState } from './photo-pagination.reducer';

describe('PhotoPagination Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = feature.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
