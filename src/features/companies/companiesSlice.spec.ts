import companiesReducer, { getCompanies, CompanyState } from './companiesSlice';




describe('companies reducer', () => {
  const initialState: CompanyState = {
    value: [],
    status: 'idle'
  };
  it('should handle initial state', () => {
    expect(companiesReducer(undefined, { type: 'unknown' })).toEqual({
      value: [],
      status: 'idle'
    });
  });

  it('should  set filter item type', () => {
    const actual = companiesReducer(initialState, getCompanies());
    expect(actual.value[0].name).toEqual('test');
  });

});
