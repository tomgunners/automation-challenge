import { test, expect } from '@playwright/test';
import { ProductsClient } from '../clients/products.client';
import { buildProductPayload } from '../builders/product.builder';
import { productSchema } from '../schemas/product.schema';
import { validateSchema } from '../utils/schema.validator';

test.describe.serial('Fake Store API – Products', () => {

  let productId: number;
  let createdProduct: any;

  test('Deve listar todos os produtos', async ({ request }) => {
    const client = new ProductsClient(request);

    const response = await client.getAllProducts();
    const body = await response.json();

    console.log('📥 LIST response:', body);

    expect(response.status()).toBe(200);
    expect(body.length).toBeGreaterThan(0);

    expect(validateSchema(productSchema, body[0])).toBe(true);
  });

  test('Deve buscar um produto por ID', async ({ request }) => {
    const client = new ProductsClient(request);

    const response = await client.getProductById(1);
    const body = await response.json();

    console.log('📥 GET response:', body);

    expect(response.status()).toBe(200);
    expect(body.id).toBe(1);

    expect(validateSchema(productSchema, body)).toBe(true);
  });

  test('Deve criar um novo produto', async ({ request }) => {
    const client = new ProductsClient(request);
    const payload = buildProductPayload();

    console.log('📤 CREATE payload:', payload);

    const response = await client.createProduct(payload);
    const body = await response.json();

    console.log('📥 CREATE response:', body);

    expect(response.status()).toBe(201);
    expect(body.title).toBe(payload.title);

    expect(validateSchema(productSchema, body)).toBe(true);

    productId = body.id;
    createdProduct = body;

    expect(productId).toBeDefined();
  });

  test('Deve atualizar o produto criado', async ({ request }) => {
    const client = new ProductsClient(request);

    const updatedPayload = {
      ...createdProduct,
      title: 'Updated Product Title',
      price: 999.99,
    };

    console.log('📤 UPDATE payload:', updatedPayload);

    const response = await client.updateProduct(productId, updatedPayload);
    const body = await response.json();

    console.log('📥 UPDATE response:', body);

    expect(response.status()).toBe(200);
    expect(body.id).toBe(productId);
    expect(body.title).toBe(updatedPayload.title);
    expect(body.price).toBe(updatedPayload.price);

    expect(validateSchema(productSchema, body)).toBe(true);
  });

  test('Deve deletar o produto criado', async ({ request }) => {
    const client = new ProductsClient(request);

    console.log(`🗑️ DELETE productId: ${productId}`);

    const response = await client.deleteProduct(productId);

    expect(response.status()).toBe(200);
  });
});
