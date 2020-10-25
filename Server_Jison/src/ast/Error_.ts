export class Error_ {
    tipo: String;
    fila: Number;
    columna: Number;
    descripcion: String;

    constructor(tipo: String, fila: Number, columna: Number, descripccion: String){
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.descripcion = descripccion;
    }

}