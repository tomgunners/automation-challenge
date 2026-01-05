export const productSchema = {
  type: 'object',
  required: [
    'id',
    'title',
    'price',
    'description',
    'category',
    'thumbnail',
    'images',
  ],
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    price: { type: 'number' },
    description: { type: 'string' },
    category: { type: 'string' },
    thumbnail: { type: 'string' },
    images: {
      type: 'array',
      items: { type: 'string' },
    },
  },
};
