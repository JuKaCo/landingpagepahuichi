import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {delay} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries() {
  return this.http.get<any>('assets/showcase/data/countriesphonecodes.json')
    .toPromise()
    .then(res => <any[]>res.data)
    .then(data => { return data; });
  }
  getdbCountries(data: any): Observable<any>{
      let url = environment.url_api_slim3 + '/api/landing/paises';
      return this.http.get(url, data).pipe(
        
      );
  }

  getCRMdbCountries(data: any): Observable<any>{
    let url = environment.url_api_slim3 + '/api/landingpahuichi/countriesCRM';
    return this.http.get(url, data).pipe(
      
    );
  }

  getCRMdbStates(data: any): Observable<any>{
    let url = environment.url_api_slim3 + '/api/landingpahuichi/statesCRM/'+data;
    return this.http.get(url, data).pipe(
      
    );
  }

  getdbCities(data: any): Observable<any>{
    let url = environment.url_api_slim3 + '/api/landing/ciudades';
    return this.http.get(url, data).pipe(
      
    );
  }

  getdbimage(data: any): Observable<any>{
    let url = environment.url_api_slim3 + '/api/landing/imagen';
    return this.http.get(url, data).pipe(
      
    );
  }

  getdbmessage(data: any): Observable<any>{
    let url = environment.url_api_slim3 + '/api/landing/mensaje';
    return this.http.get(url, data).pipe(
      
    );
  }

}