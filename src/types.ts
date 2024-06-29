export interface Quotes {
  author: string;
  category: string;
  text: string;
}

export interface Quote {
  author: string;
  category: string;
  text: string;
  id: string;
}

export interface ApiQuotes {
  [id: string]: Quotes;
}
