import { APIRequestContext } from '@playwright/test';

export class ProductsClient {
  constructor(private request: APIRequestContext) { }

  async getAllProducts() {
    return this.request.get('/products');
  }

  async getProductById(id: number) {
    return this.request.get(`/products/${id}`);
  }

  async createProduct(payload: any) {
    const response = await this.request.post('/products', {
      data: payload
    });

    const body = await response.json();
    return response;
  }

  async updateProduct(id: number, payload: any) {
    return this.request.put(`/products/${id}`, {
      data: payload,
    });
  }

  async deleteProduct(id: number) {
    return this.request.delete(`/products/${id}`);
  }
}
