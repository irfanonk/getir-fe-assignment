import { FilterState } from './../filter/filterSlice';
import { api } from "../api/api";



export const fetchItems = async (filters: FilterState) => {
  const { page, limit, itemType, sorting, brand, tag } = filters
  const sortParams = sorting && getSortingOrder(sorting)


  const response = await api.get(`items?_limit=${limit}&_page=${page}${brand ? `&manufacturer=${brand}` : ''}${tag ? `&tags_like=${tag}` : ''}${sortParams ? sortParams : ''}${itemType ? `&itemType=${itemType}` : ''}`);


  if (response.status === 200) {

    return {
      data: response.data,
      totalCount: response.headers["x-total-count"] || 0
    };
  }
  throw new Error('Get Items')
};


const getSortingOrder = (sorting: string) => {
  let sortParam = ""
  switch (sorting) {
    case "plh":
      sortParam = "&_sort=price&_order=asc"
      break;

    case "phl":
      sortParam = "&_sort=price&_order=desc"
      break;
    case "nto":
      sortParam = "&_sort=added&_order=desc"
      break;
    case "otn":
      sortParam = "&_sort=added&_order=asc"
      break;

    default:
      sortParam = ""
      break;
  }
  return sortParam
}