import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import ROUTES from '../types/routes';
import Consumption from '../types/consumption';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  private uri: String = 'http://localhost:8080';

  private header = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) {
  }

  async getAll(): Promise<any> {
    const res = await this.httpClient.get(`${this.uri}${ROUTES.crud.getAll}`).toPromise();
    return res;
  }

  async insert(element: Consumption) {
    const res = await this.httpClient.post(`${this.uri}${ROUTES.crud.update}`, JSON.stringify(element), {headers: this.header}).toPromise();
    return res;
  }

  async delete(element: any) {
    const res = await this.httpClient.post(`${this.uri}${ROUTES.crud.removeOne}`, JSON.stringify(element), {headers: this.header}).toPromise();
    return res;
  }
}
