import { APIRequestContext } from '@playwright/test';

export class ProductsClient {
  constructor(private request: APIRequestContext) {}

  async getAllProducts() {
    return this.request.get('/products');
  }

  async getProductById(id: number) {
    return this.request.get(`/products/${id}`);
  }

  async createProduct(payload: any) {
    return this.request.post('/products/add', {
      data: payload,
    });
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
