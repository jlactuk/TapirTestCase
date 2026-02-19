export interface IProduct {
    id: number;
    name: string;
    price: number;
    image: string;
}

export interface IProductResponse {
    products: IProduct[];
    totalPages: number;
}