import { api } from "../api/api";
import { Item } from './itemSlice'


export const fetchItems = async (limit: number) => {

  const response = await api.get(`items?_limit=${limit}`)

  // const response = await api.get(`items?limit${limit}${page ? `&page=${page}` : ''}`);


  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Get Items')
};
export const getCompanies = async () => {


  const response = await api.get('companies');


  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Get Companies')
};