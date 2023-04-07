const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '10499035-4c19632db287de98b060ef18d';


export const galleryApi = (searchText, page) => {
  return fetch(
    `${BASE_URL}?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
};