import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api'
const API_KEY = '10499035-4c19632db287de98b060ef18d'


export const galleryApi = async (searchText, page) => {
  const response = await axios.get(
    `${BASE_URL}/api/?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return response.data;
};