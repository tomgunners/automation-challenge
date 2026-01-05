import { test, expect } from '@playwright/test';
import { ProductsClient } from '../clients/products.client';
import { buildProductPayload } from '../builders/product.builder';
import { productSchema } from '../schemas/product.schema';
import { validateSchema } from '../utils/schema.validator';

test.describe.serial('DummyJSON – Products API', () => {

  test('Deve listar todos os produtos', async ({ request }) => {
    const client = new ProductsClient(request);

    console.log('📤 LIST payload: N/A');

    const response = await client.getAllProducts();
    console.log('➡️ LIST status:', response.status());

    const body = await response.json();
    console.log('📥 LIST response:', JSON.stringify(body, null, 2));

    expect(response.status()).toBe(200);
    expect(body.products).toBeDefined();
    expect(body.products.length).toBeGreaterThan(0);
    expect(validateSchema(productSchema, body.products[0])).toBe(true);
  });

  test('Deve buscar um produto por ID', async ({ request }) => {
    const client = new ProductsClient(request);

    console.log('📤 GET payload:', { id: 1 });

    const response = await client.getProductById(1);
    console.log('➡️ GET status:', response.status());

    const body = await response.json();
    console.log('📥 GET response:', JSON.stringify(body, null, 2));

    expect(response.status()).toBe(200);
    expect(body.id).toBe(1);
    expect(validateSchema(productSchema, body)).toBe(true);
  });

  test('Deve criar um novo produto', async ({ request }) => {
    const client = new ProductsClient(request);
    const payload = buildProductPayload();

    console.log('📤 CREATE payload:', JSON.stringify(payload, null, 2));

    const response = await client.createProduct(payload);
    console.log('➡️ CREATE status:', response.status());

    const body = await response.json();
    console.log('📥 CREATE response:', JSON.stringify(body, null, 2));

    expect(response.status()).toBe(201);
    expect(body.title).toBe(payload.title);
    expect(validateSchema(productSchema, body)).toBe(true);
  });

  test('Deve atualizar o produto com ID = 1', async ({ request }) => {
    const client = new ProductsClient(request);

    const productId = 1;

    const updatedPayload = {
      title: 'Produto Atualizado QA',
      price: 999,
    };

    console.log(
      '📤 UPDATE payload:',
      JSON.stringify({ id: productId, ...updatedPayload }, null, 2)
    );

    const response = await client.updateProduct(productId, updatedPayload);
    console.log('➡️ UPDATE status:', response.status());

    const body = await response.json();
    console.log('📥 UPDATE response:', JSON.stringify(body, null, 2));

    expect(response.status()).toBe(200);
    expect(body.id).toBe(productId);
    expect(body.title).toBe(updatedPayload.title);
    expect(body.price).toBe(updatedPayload.price);
  });

  test('Deve deletar o produto com ID = 1', async ({ request }) => {
    const client = new ProductsClient(request);

    const productId = 1;

    console.log('📤 DELETE payload:', { id: productId });

    const response = await client.deleteProduct(productId);
    console.log('➡️ DELETE status:', response.status());

    const body = await response.json();
    console.log('📥 DELETE response:', JSON.stringify(body, null, 2));

    expect(response.status()).toBe(200);
    expect(body.id).toBe(productId);
  });
});
