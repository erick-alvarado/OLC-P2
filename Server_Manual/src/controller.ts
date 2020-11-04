import { Request, Response } from "express";
import { AnalizarJava, getGrafo, getListaErrores, getTraduccion } from './Analisis';

export let analizar = (req:Request, res: Response) => {
    //console.log("query: ",req.query.codigo)
    let codigo:string = req.body.codigo.toString();
    console.log(codigo)
    let tokens = AnalizarJava(codigo);
    let errores = getListaErrores();
    let grafo="";
    let traduccion="";
    console.log(errores)
    if(errores.length==0){
        grafo = getGrafo();
        traduccion= getTraduccion();
    }
    let a = [{'tokens': tokens},{'errores': errores}, {'grafo': grafo}, {'traduccion': traduccion}]
    res.send(JSON.stringify(a));
}

export let miAuxiliar = (req:Request, res: Response) => {
    console.log("params: ",req.params)
    res.send("no me motiva a echarle ganas al curso :'v");
}

