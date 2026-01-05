export const productSchema = {
  type: 'object',
  required: ['id', 'title', 'price', 'description', 'category', 'image'],
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    price: { type: 'number' },
    description: { type: 'string' },
    category: { type: 'string' },
    image: { type: 'string' },
  },
};
