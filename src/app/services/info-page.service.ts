import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InfoPage } from '../interfaces/info-page.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: InfoPage = {};
  cargada = false;

  equipo: any[] = [];

  constructor( private http: HttpClient) {
    
    this.cargarInfo();
    this.cargarEquipo();
    
  }

  private cargarInfo() {
    // Leer el archivo JSON
    this.http.get('assets/data/data-page.json')
    .subscribe( (resp: InfoPage) => {
      this.cargada = true;
      this.info = resp;
    });
  }


  private cargarEquipo() {

     // Leer el archivo JSON
     this.http.get('https://angular-html-429a1-default-rtdb.firebaseio.com/equipo.json')
     .subscribe( (resp: any) => {

       this.equipo = resp;
       // console.log(resp);
     });


    //this.equipo = resp
  }

}
