import { api } from "../api/api";


export const fetchItems = async (limit: number, page: number) => {

  // const response = await api.get(`items?_limit=${limit}`)

  const response = await api.get(`items?_limit=${limit}&_page=${page}}`);


  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Get Items')
};
