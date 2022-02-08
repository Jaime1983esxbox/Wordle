import { Component, OnInit } from '@angular/core';
import { Letra } from 'src/app/models/Letra';
import { Palabra } from 'src/app/models/Palabra';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css']
})
export class WordleComponent implements OnInit {
  mostrarTabla: boolean = false;
  mostrarBoton: boolean = false;
  palabra: string = 'LISTA';
  palabraIntroducida: string = '';
  palabrasIntroducidas: Palabra[] = [];
  letras1: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  listaLetras1: Letra[] = [];
  letras2: string[] = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'];
  listaLetras2: Letra[] = [];
  letras3: string[] = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  listaLetras3: Letra[] = [];

  constructor() {
    for (let i = 0; i < this.letras1.length; i++) {
      let letra1: Letra = new Letra();
      letra1.letra = this.letras1[i];
      this.listaLetras1.push(letra1)
    }
    
    for (let j = 0; j < this.letras2.length; j++) {
      let letra2: Letra = new Letra();
      letra2.letra = this.letras2[j];
      this.listaLetras2.push(letra2)
    }

    for (let k = 0; k < this.letras3.length; k++) {
      let letra3: Letra = new Letra();
      letra3.letra = this.letras3[k];
      this.listaLetras3.push(letra3)
    }
  }

  ngOnInit(): void {
  }

  comprobarPalabra(){
    
    if(JSON.stringify(this.palabra) == JSON.stringify(this.palabraIntroducida)){
      alert('¡Enhorabuena! Has acertado la palabra');
      this.mostrarTabla = true;
      this.mostrarBoton = true;
    }else if(this.palabrasIntroducidas.length == 4){
      alert('Has perdido');
      this.mostrarTabla = true;
      this.mostrarBoton = true;
    }

    if(this.palabraIntroducida.length < 5){
      alert('Debes introducir una palabra de 5 letras');
      this.palabraIntroducida = '';
    }else{
      this.mostrarTabla = true;
      let palabra: Palabra = new Palabra();
      for (let i = 0; i < this.palabraIntroducida.length; i++) {
        let letra = new Letra();
        letra.letra = this.palabraIntroducida[i];
        if(letra.letra == this.palabra.charAt(i)){
          letra.color = 'acierto';
          this.actualizarColoresTeclado(letra.letra, letra.color);
        }else if(letra.letra != this.palabra.charAt(i) && this.palabra.includes(letra.letra)){
          letra.color = 'aciertoNoPosicion';
          this.actualizarColoresTeclado(letra.letra, letra.color);
        }else{
          letra.color = 'fallo';
          this.actualizarColoresTeclado(letra.letra, letra.color);
        }
        palabra.letras.push(letra);
      }
      this.palabraIntroducida = '';
      this.palabrasIntroducidas.push(palabra);   
    }
  }

  actualizarColoresTeclado(letra: string, color: string){
    
    for (let i = 0; i < this.listaLetras1.length; i++) {
      if(letra == this.listaLetras1[i].letra){
        this.listaLetras1[i].color = color;
      }
    }  

    for (let j = 0; j < this.letras2.length; j++) {
      if(letra == this.listaLetras2[j].letra){
        this.listaLetras2[j].color = color;
      }
    }  
    
    for (let k = 0; k < this.letras3.length; k++) {
      if(letra == this.listaLetras3[k].letra){
        this.listaLetras3[k].color = color;
      }
    }
  }

  limpiarColor(){
    for (let i = 0; i < this.listaLetras1.length; i++) {
      this.listaLetras1[i].color = ''
    }

    for (let j = 0; j < this.listaLetras2.length; j++) {
      this.listaLetras2[j].color = ''
    }

    for (let k = 0; k < this.listaLetras3.length; k++) {
      this.listaLetras3[k].color = ''
    }
  }

  volverJugar(){
    this.palabraIntroducida = '';
    this.palabrasIntroducidas = [];
    this.limpiarColor();
    this.mostrarTabla = false;
    this.mostrarBoton = false;
  }

  valor(letra: string){
    if(this.palabraIntroducida.length <= 4){
      this.palabraIntroducida = this.palabraIntroducida + letra;
    }
  }

  borrarLetra(){
    this.palabraIntroducida = this.palabraIntroducida.substring(0, this.palabraIntroducida.length - 1);
  }

  borrarTodo(){
    this.palabraIntroducida = '';
  }
}
