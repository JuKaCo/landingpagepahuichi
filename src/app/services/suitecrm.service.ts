import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuitecrmService {
  //token:string;
  constructor(private http: HttpClient) { }

  gettokenoauth(data: any): Observable<any>{
    data=environment.data_oauth;
    let url = environment.url_crm_oauth2;
    return this.http.post(url, data).pipe(
      
    );
  }

  guardaprospecto(data: any, token: string): Observable<any>{
    token = "Bearer "+token;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', "application/json");
    headers = headers.set('Authorization', token);
    let url = environment.url_api_crm+"/V8/module";
    return this.http.post(url, data, {headers: headers}).pipe(
      
    );
  }

  obtienevendedor(data: any): Observable<any>{
    console.log("este es la ciudad-->"+data);
    if(data==null||data==''){
      data="SANTA CRUZ";
    }
    data=data.replaceAll(" ","_");
    let url = environment.url_api_slim3+"/api/crm/vendedor/"+data;
    return this.http.get(url, data).pipe(
      
    );
  }

  obtienevendedorv2(data: any): Observable<any>{
    console.log("este es la ciudad-->"+data);
    if(data.ciudad==null||data.ciudad==''){
      data.ciudad="SANTA CRUZ";
    }
    data=data.ciudad.replaceAll(" ","_");
    let url = environment.url_api_slim3+"/api/crm/vendedor/"+data.ciudad+"/"+data.nombre+"/"+data.apellido+"/"+data.telefono;
    return this.http.get(url, data).pipe(
      
    );
  }
  obtine_tipo_prospecto(data: any): Observable<any>{
    let url = environment.url_crm+"/?entryPoint=Call_SP_EntryPoint&action=listar_tipo_prospecto&kv=y";
    return this.http.get(url, data).pipe(
      
    );
  }
  
}
