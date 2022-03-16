import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InforPage } from '../interfaces/info-page.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: InforPage = {};
  cargada = false;

  constructor( private http: HttpClient) {
    
    //console.log('Servicio de infoPágina listo');

    // Leer el archivo JSON
    this.http.get('assets/data/data-page.json')
        .subscribe( (resp: InforPage) => {
          
          this.cargada = true;
          this.info = resp;
          console.log(resp);



        });


  }


}
