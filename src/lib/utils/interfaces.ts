import type { Country } from 'country-data';
import type { Region } from './constants';

/** @internal */
interface Category {
  /** Categories array */
  category: string[];
}

export interface GameEU {
  age_rating_type: string;
  age_rating_value: string;
  copyright_s: string;
  developer: string;
  excerpt: string;
  fs_id: string;
  game_series_t: string;
  gift_finder_carousel_image_url_s: string;
  gift_finder_description_s: string;
  gift_finder_detail_page_image_url_s: string;
  gift_finder_detail_page_store_link_s: string;
  gift_finder_wishlist_image_url_s: string;
  image_url: string;
  image_url_h2x1_s: string;
  image_url_sq_s: string;
  image_url_tm_s: string;
  originally_for_t: string;
  pretty_agerating_s: string;
  pretty_date_s: string;
  publisher: string;
  sorting_title: string;
  title: string;
  type: string;
  url: string;
  add_on_content_b: boolean;
  club_nintendo: boolean;
  near_field_comm_b: boolean;
  physical_version_b: boolean;
  play_mode_handheld_mode_b: boolean;
  play_mode_tabletop_mode_b: boolean;
  play_mode_tv_mode_b: boolean;
  change_date: Date;
  date_from: Date;
  priority: Date;
  age_rating_sorting_i: number;
  players_from: number;
  players_to: number;
  compatible_controller: string[];
  game_categories_txt: string[];
  game_category: string[];
  language_availability: string[];
  /** Array containing the 14-digit game unique identifier */
  nsuid_txt: string[];
  playable_on_txt: string[];
  /** Array containing the product code */
  product_code_txt: string[];
  system_names_txt: string[];
  system_type: string[];
  title_extras_txt: string[];
}

export interface QueriedGameUS {
  type: string;
  locale: string;
  url: string;
  title: string;
  description: string;
  lastModified: number;
  id: string;
  nsuid: string;
  slug: string;
  boxArt: string;
  gallery: string;
  platform: string;
  releaseDateMask: string;
  characters: string[];
  categories: string[];
  msrp: number | null;
  esrb?: string;
  esrbDescriptors?: string[];
  virtualConsole: string;
  generalFilters: string[];
  filterShops: string[];
  filterPlayers: string[];
  publishers: string[];
  developers: string[];
  players: string;
  featured: boolean;
  freeToStart: boolean;
  priceRange: string | null;
  salePrice: number | null;
  availability: string[];
  objectID: string;
}

export interface GameUS {
  /** @deprecated Product code. Can be parsed for a region wide code. */
  game_code?: string;
  buyonline: boolean;
  front_box_art: string;
  /** USA eShop price (in dollars) */
  eshop_price: number;
  /** 14-digit game unique identifier */
  nsuid: string;
  video_link: string;
  number_of_players: string;
  /** Canada eShop price (in canadian dollars) */
  ca_price: number;
  id: string;
  title: string;
  /** Gaming platform */
  system: string;
  free_to_start: boolean;
  digitaldownload: boolean;
  release_date: string;
  categories: Category;
  /** Game URL name */
  slug: string;
  buyitnow: boolean;
}

/** @internal */
interface AlgoliaResults<T extends GameUS | QueriedGameUS> {
  /** The games found */
  hits: T[];
  /** Total number of hits with current query */
  nbHits: number;
  page: number;
  nbPages: number;
  /** Number of hits per page */
  hitsPerPage: number;
  processingTimeMS: number;
  facets: {
    [key: string]: {
      [key: string]: number;
    };
  };
  /** Filters for the search query */
  facetFilters: string[][];
  exhaustiveFacetsCount: boolean;
  exhaustiveNbHits: boolean;
  query: string;
  params: string;
  index: string;
}

/** @internal */
export interface AlgoliaResponse<T extends GameUS | QueriedGameUS> {
  results: AlgoliaResults<T>[];
}

export interface GameJP extends Record<string, string | number | undefined> {
  /** The game code for the game */
  InitialCode: string;
  /** The game url */
  LinkURL: string;
  /** The Link Target, if it exists */
  LinkTarget: string;
  /** The type of screenshot, if it exists */
  ScreenshotImgFlg: number;
  /** The screenshot URL, if it exists */
  ScreenshotImgURL: string;
  /** The variation of the thumbnail */
  ThumbVariation: string;
  ComingThumb: 'yes' | string;
  /** The game's title */
  TitleName: string;
  /** The title name in Asian characters */
  TitleNameRuby: string;
  SoftType: string;
  D: number;
  SalesDate: string;
  MakerName: string;
  Hard: string;
  Memo: string;
  PlatformID: string;
  Price: string;
  MakerKana: string;
}

export interface EShop {
  code: string;
  country: string;
  currency: string;
  region: Region;
}

export interface PriceResponse {
  error: PriceError;
  personalized: boolean;
  country: Country;
  prices: TitleData[];
}

export interface TitleData {
  title_id: number;
  sales_status: string;
  regular_price: PriceData;
  discount_price?: PriceData;
}

/** @internal */
interface PriceError {
  code: string;
  message: string;
}

/** @internal */
interface PriceData {
  amount: string;
  currency: string;
  raw_value: string;
  start_datetime?: string;
  end_datetime?: string;
}

/** @internal */
interface RequestOptions {
  /**
   * Game count limit (Can only be lower than default page size).
   *
   * @remarks
   * On the US eshop, the max limit is 100. Leave empty to get all the games. */
  limit?: number;
}

export interface EURequestOptions extends RequestOptions {
  /** Game information locale. (EU Only) */
  locale?: string;
}
