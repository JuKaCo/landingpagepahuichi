import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

  listarPais(): Observable<any> {
    return this.http.get(environment.urlIndex, {
      params: {
        entryPoint: 'Call_SP_EntryPoint',
        action: 'listar_par_paises',
        kv: 'y'
      }
    }).pipe(map((result: any) => {
      let paises: any[] = [];
      let i = 0, j = 0, k = 0;
      result.data.forEach((a: any) => {
        i = paises.map(function (elem) { return elem.abr_pais }).indexOf(a.abr_pais);
        if (i < 0) {
          paises.push({ abr_pais: a.abr_pais, pais: a.pais, estados: [] });
        }
        i = paises.map(function (elem) { return elem.abr_pais }).indexOf(a.abr_pais);
        j = paises[i].estados.map(function (elem: any) { return elem.abr_estado }).indexOf(a.abr_estado);
        if (j < 0) {
          paises[i].estados.push({ abr_estado: a.abr_estado, estado: a.estado, regiones: [] });
        }
        if (a.codreg) {
          j = paises[i].estados.map(function (elem: any) { return elem.abr_estado }).indexOf(a.abr_estado);
          k = paises[i].estados[j].regiones.map(function (elem: any) { return elem.codreg }).indexOf(a.codreg);
          if (k < 0) {
            paises[i].estados[j].regiones.push({ codreg: a.codreg, region: a.region });
          }
        }
      });
      return paises;
    }));
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