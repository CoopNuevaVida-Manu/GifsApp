import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private ListHistorial: GifsService){}

  get historial(){
    return this.ListHistorial.historial
  }

  buscar(item:string){
    this.ListHistorial.buscarGifs(item);
    console.log(item)
  }
}
