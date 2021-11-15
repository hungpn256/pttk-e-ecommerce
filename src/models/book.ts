export interface Author{
  id: number;
  name: string;
  biography: string;
}

export interface Publisher{
  id: number;
  name: string;
  address: string
}

export interface Book{
  id: number;
  barcode: string;
  title: string;
  summary: string;
  pages: string;
  languge: string;
  publisher: Publisher;
  author: Author;
}

export interface BookItem{
  id: number;
  image: string;
  price: number;
  discount: number;
  book:Book
}
