import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsesponse, Gif } from '../../Interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _ApiKey: string = 'n3tIhjRlMiNbb33iu14O4QqwhCmxUkSY';

  private _servicioUrl : string = 'http://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public  respuesta: Gif[] = [];


  constructor(private http: HttpClient){ 
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.respuesta = JSON.parse(localStorage.getItem('url')!) || [];
    //this.respuesta = JSON.parse( localStorage.getItem('url')!) || [];
   }

  get historial(){
    return [...this._historial]
  }

  buscarGifs( query: string){

    query =  query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
    }

    localStorage.setItem('historial', JSON.stringify(this._historial))
    
    const params = new HttpParams()
    .set('api_key', this._ApiKey)
    .set('limit', '10')
    .set('q', query)
    
    this._historial = this._historial.splice(0,10);
    
    this.http.get<SearchGifsesponse>(`${this._servicioUrl}/search`, {params})
      .subscribe((resp ) => {
        console.log(resp.data);
        this.respuesta= resp.data;
        localStorage.setItem('url', JSON.stringify(this.respuesta));
      })
  }

}
