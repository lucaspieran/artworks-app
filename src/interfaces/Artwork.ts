export interface ArtworksResponse {
  pagination: Pagination;
  data: ArtworkInterface[];
  info: Info;
  config: Config;
}

export interface Config {
  iiif_url: string;
  website_url: string;
}

export interface ArtworkInterface {
  id: number;
  title: string;
  main_reference_number: string;
  artist_title: string;
  artist_display: string;
  place_of_origin: string;
  department_title: string;
}

export interface Info {
  license_text: string;
  license_links: string[];
  version: string;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string;
}
