export enum ProductType {
  ALL = "",
  DOORS = "doors",
  WALLPAPER = "wallpaper",
  PAINTS = "paint",
  FLOORING = "flooring",
  RADIATORS = "radiators",
  PLUMBING = "Ванны",
  BATHTUBS = "bathtubs",
  STUCCO_DECOR = "stucco_decor",
  LIGHTNING = "lightning",
}

export interface ProductRequestDto {
  $filter: string;
  $orderby: string;
  $top: string;
  $skip: string;
}

// top - сколько товаров получаю
// skip - сколько товаро пропускаю

export interface ProductDto {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  type: ProductType;
  images: string[];
}

export interface ProductCreateDto extends Omit<ProductDto, "id" | "type"> {
  id: any;
}

export interface ProductCreateDtoAdmin extends Omit<ProductCreateDto, "id"> {}
