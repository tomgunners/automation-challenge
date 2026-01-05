import { faker } from '@faker-js/faker';

export const buildProductPayload = () => {
  return {
    title: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    category: faker.commerce.department(),
  };
};
