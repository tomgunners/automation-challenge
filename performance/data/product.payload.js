export function buildProductPayload() {
  return JSON.stringify({
    title: 'Performance Test Product',
    price: 199.99,
    description: 'Product created during performance test',
    image: 'https://picsum.photos/200',
    category: 'electronics',
  });
}
