import { APIRequestContext } from '@playwright/test';

export class ProductsClient {
  constructor(private request: APIRequestContext) {}

  private getHeaders() {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };

    // Evita bloqueio da API no CI (retorno HTML / Cloudflare)
    if (process.env.ENV === 'ci') {
      headers['User-Agent'] = 'Mozilla/5.0 (Playwright API Tests - CI)';
    }

    return headers;
  }

  async getAllProducts() {
    return this.request.get('/products', {
      headers: this.getHeaders(),
    });
  }

  async getProductById(id: number) {
    return this.request.get(`/products/${id}`, {
      headers: this.getHeaders(),
    });
  }

  async createProduct(payload: any) {
    return this.request.post('/products', {
      data: payload,
      headers: this.getHeaders(),
    });
  }

  async updateProduct(id: number, payload: any) {
    return this.request.put(`/products/${id}`, {
      data: payload,
      headers: this.getHeaders(),
    });
  }

  async deleteProduct(id: number) {
    return this.request.delete(`/products/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
