import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { catchError, map } from 'rxjs/operators';
import { GeneralService } from './general.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http : HttpClient
  ) { }
  isValid(): boolean{
    return false;
  }

  url : any = GeneralService.WS_URL + "products";

  getById(id: number): any {
    const headers = new HttpHeaders(GeneralService.HEADERS('application/json'));
  	return this.http.get(this.url + '/getById/' + id, {headers: headers}); 
  }

  listAll(): any {
  const headers = new HttpHeaders(GeneralService.HEADERS('application/json'));
  return this.http.get(this.url , {headers : headers});
  }

  create(data:any): any {
    let params =(data);
    const headers = new HttpHeaders(GeneralService.HEADERS('application/json'));
  	return this.http.post(this.url + '/create', params, {headers: headers}); 
  }

  update(data:any): any {
    let params =(data);
    const headers = new HttpHeaders(GeneralService.HEADERS('application/json'));
  	return this.http.put(this.url + '/update', params, {headers: headers}); 
  }

  delete(id: number): any {
  const headers = new HttpHeaders(GeneralService.HEADERS('application/json'));
  	return this.http.delete(this.url + '/delete/' + id, {headers: headers}); 
  }
}
