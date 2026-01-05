import { test, expect } from '@playwright/test';
import { ProductsClient } from '../clients/products.client';
import { buildProductPayload } from '../builders/product.builder';
import { productSchema } from '../schemas/product.schema';
import { validateSchema } from '../utils/schema.validator';

test.describe.serial('Fake Store API – Products', () => {
  let productId: number;
  let createdProduct: any;

  async function parseJsonResponse(response: any) {
    const contentType = response.headers()['content-type'] || '';

    console.log('➡️ STATUS:', response.status());
    console.log('➡️ URL:', response.url());
    console.log('➡️ CONTENT-TYPE:', contentType);

    const text = await response.text();

    if (!contentType.includes('application/json')) {
      console.error('❌ Resposta não é JSON. Body recebido:');
      console.error(text.substring(0, 300));
      throw new Error('Resposta da API não é JSON');
    }

    return JSON.parse(text);
  }

  test('Deve listar todos os produtos', async ({ request }) => {
    const client = new ProductsClient(request);

    const response = await client.getAllProducts();
    const body = await response.json();

    console.log('📥 LIST response:', body);

    const products = Array.isArray(body)
      ? body
      : body.products;

    expect(products).toBeDefined();
    expect(products.length).toBeGreaterThan(0);
    expect(validateSchema(productSchema, products[0])).toBe(true);
  });


  test('Deve buscar um produto por ID', async ({ request }) => {
    const client = new ProductsClient(request);

    const response = await client.getProductById(1);
    const body = await parseJsonResponse(response);

    console.log('📥 GET response:', body);

    expect(body.id).toBe(1);
    expect(validateSchema(productSchema, body)).toBe(true);
  });

  test('Deve criar um novo produto', async ({ request }) => {
    const client = new ProductsClient(request);
    const payload = buildProductPayload();

    console.log('📤 CREATE payload:', payload);

    const response = await client.createProduct(payload);
    const body = await parseJsonResponse(response);

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
    const body = await parseJsonResponse(response);

    console.log('📥 UPDATE response:', body);

    expect(body.id).toBe(productId);
    expect(body.title).toBe(updatedPayload.title);
    expect(body.price).toBe(updatedPayload.price);
    expect(validateSchema(productSchema, body)).toBe(true);
  });

  test('Deve deletar o produto criado', async ({ request }) => {
    const client = new ProductsClient(request);

    console.log(`🗑️ DELETE productId: ${productId}`);

    const response = await client.deleteProduct(productId);

    console.log('➡️ STATUS:', response.status());
    console.log('➡️ URL:', response.url());

    expect(response.status()).toBe(200);
  });
});
