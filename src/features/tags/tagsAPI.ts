import { api } from "../api/api";



export const fetchTags = async () => {


  const response = await api.get('tags');


  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Get Tags')
};