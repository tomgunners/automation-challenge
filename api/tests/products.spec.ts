import { test, expect } from '@playwright/test';
import { ProductsClient } from '../clients/products.client';
import { buildProductPayload } from '../builders/product.builder';
import { productSchema } from '../schemas/product.schema';
import { validateSchema } from '../utils/schema.validator';

test.describe.serial('DummyJSON – Products API', () => {
  let productId: number;
  let createdProduct: any;

  test('Deve listar todos os produtos', async ({ request }) => {
    const client = new ProductsClient(request);

    const response = await client.getAllProducts();
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products).toBeDefined();
    expect(body.products.length).toBeGreaterThan(0);

    expect(
      validateSchema(productSchema, body.products[0])
    ).toBe(true);
  });

  test('Deve buscar um produto por ID', async ({ request }) => {
    const client = new ProductsClient(request);

    const response = await client.getProductById(1);
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(validateSchema(productSchema, body)).toBe(true);
  });

  test('Deve criar um novo produto', async ({ request }) => {
    const client = new ProductsClient(request);
    const payload = buildProductPayload();

    const response = await client.createProduct(payload);
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.title).toBe(payload.title);
    expect(validateSchema(productSchema, body)).toBe(true);

    productId = body.id;
    createdProduct = body;
  });

  test('Deve atualizar o produto criado', async ({ request }) => {
    const client = new ProductsClient(request);

    const updatedPayload = {
      ...createdProduct,
      title: 'Produto Atualizado QA',
      price: 999,
    };

    const response = await client.updateProduct(productId, updatedPayload);
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.title).toBe(updatedPayload.title);
    expect(body.price).toBe(updatedPayload.price);
  });

  test('Deve deletar o produto criado', async ({ request }) => {
    const client = new ProductsClient(request);

    const response = await client.deleteProduct(productId);
    expect(response.status()).toBe(200);
  });
});
