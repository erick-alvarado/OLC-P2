"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOperation = exports.Type = void 0;
var Type;
(function (Type) {
    Type[Type["NUMERIC"] = 0] = "NUMERIC";
    Type[Type["STRING"] = 1] = "STRING";
    Type[Type["BOOLEAN"] = 2] = "BOOLEAN";
    Type[Type["DOUBLE"] = 3] = "DOUBLE";
    Type[Type["CHAR"] = 4] = "CHAR";
    Type[Type["VOID"] = 5] = "VOID";
    Type[Type["COMA"] = 6] = "COMA";
})(Type = exports.Type || (exports.Type = {}));
var TypeOperation;
(function (TypeOperation) {
    TypeOperation[TypeOperation["SUMA"] = 0] = "SUMA";
    TypeOperation[TypeOperation["RESTA"] = 1] = "RESTA";
    TypeOperation[TypeOperation["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TypeOperation[TypeOperation["DIVISION"] = 3] = "DIVISION";
    TypeOperation[TypeOperation["MENOSUNARIO"] = 4] = "MENOSUNARIO";
    TypeOperation[TypeOperation["MAYOR"] = 5] = "MAYOR";
    TypeOperation[TypeOperation["MENOR"] = 6] = "MENOR";
    TypeOperation[TypeOperation["MAYOR_IGUAL"] = 7] = "MAYOR_IGUAL";
    TypeOperation[TypeOperation["MENOR_IGUAL"] = 8] = "MENOR_IGUAL";
    TypeOperation[TypeOperation["ADICION"] = 9] = "ADICION";
    TypeOperation[TypeOperation["SUBSTRACCION"] = 10] = "SUBSTRACCION";
    TypeOperation[TypeOperation["OR"] = 11] = "OR";
    TypeOperation[TypeOperation["AND"] = 12] = "AND";
    TypeOperation[TypeOperation["NOT"] = 13] = "NOT";
    TypeOperation[TypeOperation["XOR"] = 14] = "XOR";
    TypeOperation[TypeOperation["IGUAL_IGUAL"] = 15] = "IGUAL_IGUAL";
    TypeOperation[TypeOperation["DISTINTO"] = 16] = "DISTINTO";
    TypeOperation[TypeOperation["IGUAL"] = 17] = "IGUAL";
    TypeOperation[TypeOperation["PARENTESIS"] = 18] = "PARENTESIS";
})(TypeOperation = exports.TypeOperation || (exports.TypeOperation = {}));
//# sourceMappingURL=Tipo.js.map