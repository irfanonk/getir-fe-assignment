import { FilterState } from './../filter/filterSlice';
import { api } from "../api/api";



export const fetchItems = async (filters: FilterState) => {
  console.log('filters', filters);
  const { page, limit, itemType, sorting, brand, tag } = filters
  const sortParams = sorting && getSortingOrder(sorting)


  const response = await api.get(`items?${itemType ? `&itemType=${itemType}` : ''}${brand ? `&brand=${brand}` : ''}${sortParams ? sortParams : ''}&_limit=${limit}&_page=${page}`);


  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Get Items')
};


const getSortingOrder = (sorting: string) => {
  let sortParam = ""
  switch (sorting) {
    case "Price low to high":
      sortParam = "_sort=price&_order=asc"
      break;

    case "Price high to low":
      sortParam = "_sort=price&_order=desc"
      break;
    case "New to old":
      sortParam = "_sort=added&_order=desc"
      break;
    case "Old to new":
      sortParam = "_sort=added&_order=asc"
      break;

    default:
      sortParam = ""
      break;
  }
  return sortParam
}