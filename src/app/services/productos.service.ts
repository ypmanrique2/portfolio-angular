import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoInterface } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: ProductoInterface[] = [];


  constructor( private http: HttpClient ) {
    
    this.cargarProductos();

  }


  private cargarProductos() {

    return new Promise( ( resolve, reject) => {
      
      this.http.get('https://angular-html-429a1-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe( (resp: any) => {
          this.productos = resp;
          this.cargando = false;
          
        });

    });

    
  }

  getProducto ( id: string ) {

    return this.http.get(`https://angular-html-429a1-default-rtdb.firebaseio.com/productos/${ id }.json`)

  }

  buscarProducto( termino: string) {
  
    if ( this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then( ()=>{
        // ejectuar después de tener los productos
        // Aplicar filtro
        this.filtrarProductos( termino );
      });

    } else {
      // aplicar el filtro
      this.filtrarProductos( termino );
    }
 

  }
  
  private filtrarProductos( termino: string ) {

    
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0) {
        this.productosFiltrado.push( prod );
      }
  
    });

    
  }

}