export class Token {
    fila: Number;
    columna: Number;
    tipo: String;
    descripcion: String;

    constructor( fila: Number, columna: Number,tipo: String, descripccion: String){
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.descripcion = descripccion;
    }

}