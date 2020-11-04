"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.miAuxiliar = exports.analizar = void 0;
const Analisis_1 = require("./Analisis");
exports.analizar = (req, res) => {
    //console.log("query: ",req.query.codigo)
    let codigo = req.body.codigo.toString();
    console.log(codigo);
    let tokens = Analisis_1.AnalizarJava(codigo);
    let errores = Analisis_1.getListaErrores();
    let grafo = "";
    let traduccion = "";
    console.log(errores);
    if (errores.length == 0) {
        grafo = Analisis_1.getGrafo();
        traduccion = Analisis_1.getTraduccion();
    }
    let a = [{ 'tokens': tokens }, { 'errores': errores }, { 'grafo': grafo }, { 'traduccion': traduccion }];
    res.send(JSON.stringify(a));
};
exports.miAuxiliar = (req, res) => {
    console.log("params: ", req.params);
    res.send("no me motiva a echarle ganas al curso :'v");
};
//# sourceMappingURL=controller.js.map