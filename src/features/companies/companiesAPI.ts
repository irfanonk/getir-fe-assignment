import { api } from "../api/api";



export const fetchCompanies = async () => {


  const response = await api.get('companies');


  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Get Companies')
};