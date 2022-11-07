
import filterReducer, { filterByItemType, filterByBrand, filterByTag, sort, paginate, FilterState } from './filterSlice';


describe('filter reducer', () => {
  const initialState: FilterState = {
    itemType: "",
    sorting: "",
    brand: "",
    tag: "",
    limit: 16,
    page: 1,
  };
  it('should handle initial state', () => {
    expect(filterReducer(undefined, { type: 'unknown' })).toEqual({
      itemType: "",
      sorting: "",
      brand: "",
      tag: "",
      limit: 16,
      page: 1,
    });
  });

  it('should  set filter item type', () => {
    const actual = filterReducer(initialState, filterByItemType('Any Item Type'));
    expect(actual.itemType).toEqual('Any Item Type');
  });

  it('should set filter brand', () => {
    const actual = filterReducer(initialState, filterByBrand('Any Brand'));
    expect(actual.brand).toEqual('Any Brand');
  });

  it('should set filter tag', () => {
    const actual = filterReducer(initialState, filterByTag('Any Tag'));
    expect(actual.tag).toEqual('Any Tag');
  });
  it('should set sort by feature', () => {
    const actual = filterReducer(initialState, sort('Any Sort Option'));
    expect(actual.sorting).toEqual('Any Sort Option');
  });
  it('should set new page', () => {
    const actual = filterReducer(initialState, paginate(11));
    expect(actual.page).toEqual(11);
  });
});
