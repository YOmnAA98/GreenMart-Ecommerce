export interface Products {
  id: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  category: Category;
  imagesURL: string[];
  productQuantity: number;
  productSize: string;
  ratingsAverage: number;
}

export interface Category {
  id: number;
  name: string;
}
