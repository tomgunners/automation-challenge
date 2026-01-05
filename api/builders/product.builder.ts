export function buildProductPayload() {
  return {
    title: 'Produto QA Automation',
    description: 'Produto criado via testes automatizados',
    price: 299,
    discountPercentage: 10,
    rating: 4.5,
    stock: 50,
    brand: 'QA Brand',
    category: 'smartphones',
    thumbnail: 'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
    images: [
      'https://dummyjson.com/image/i/products/1/1.jpg',
    ],
  };
}
