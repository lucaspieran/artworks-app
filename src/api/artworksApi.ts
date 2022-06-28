import axios from "axios";

export const artworksApi = axios.create({
  baseURL: 'https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,date_display,main_reference_number,department_title,place_of_origin&'
});

export const artworkSearch = axios.create({
  baseURL: 'https://api.artic.edu/api/v1/artworks/search?fields=id,title,artist_title,date_display,main_reference_number,department_title,place_of_origin&'
})

export const artworkApiDetail = axios.create({
  baseURL: 'https://api.artic.edu/api/v1/artworks'
})