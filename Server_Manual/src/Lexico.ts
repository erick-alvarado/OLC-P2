import { Token } from "./ast/Token";
import { Error_ } from "./ast/Error_";
import { StringLiteral } from "typescript";
export class Lexico{
    fila: number=1;
    columna: number=0;
    char: string;
    cadena:string = "";
    numero: number;
    texto: String;
    lista_Token : Array<Token>=[];
    lista_Error : Array<Token>=[];

    dict = {
        "int": 'numeric_',
        "string":'string_',
        "String":'string_',
        "char":'char_',	
        "boolean":'boolean_',		
        "double":'double_',	

        "for":'for_',	
        "do":'do_',	
        "while":'while_',
        "if":'if_',	
        "else":'else_',	

        "break":'break_',		
        "return":'return_',
        "continue":'continue_',	

        "public":'public_',
        "class"	:'class_',
        "interface":'interface_',
        "void":'void_',	
        "static":'static_',
        "main"	:'main_',
        "args"	:'args_',

        "system":'system_',	
        "out":'out_',
        "print":'print_',
        "println":'println_',

        "==":'igual_igual',	
        "++":'mas_mas',
        "--":'menos_menos',	
        "!=":'distinto',
        "&&":'and_',	
        "<=":'menorQ_igual',
        ">=":'mayorQ_igual',
        "||":'or_',	

        "="	:'igual',	
        ","	:'coma',	
        "[]":'corchetes',	
        ";"	:'pcoma',
        "{":'llaveAbre',	
        "}"	:'llaveCierra',	
        "."	:'punto',	

        "+"	:'mas',	
        "-"	:'menos',	
        "*"	:'por',

        "/"	:'division',
        "("	:'parAbre',
        ")"	:'parCierra',


        "<"	:'menorQ',	
        ">"	:'mayorQ',

        "!"	:'not_',
        "^"	:'xor_',	

        "true":'true_',
        "false":'false_'	
    };    

    constructor(texto: String){
        this.texto=texto;
    }
    

    Analizar() {
        let n = 0;
        while(n!= this.texto.length-1){
            this.char = this.texto[n];
            
           
            switch(this.char){
                case ' ':
                    this.columna++;
                    break;
                case '\n':
                    this.columna=0;
                    this.fila++;
                case '\t':
                    break;
                case '\r':
                    break;
                case "'":
                    let retorno2 = n;
                    n++;  this.columna++;
                    this.char = this.texto[n];
                    if(this.texto[n+=1]=="'"){
                        this.columna++;
                        this.lista_Token.push(new Token(this.fila,this.columna,"caracter","'"+this.char+"'"));
                    }
                    else{
                        this.columna-=n-retorno2;
                        this.cadena+="'";
                        this.guardar();
                        n=retorno2;
                    }
                    break;
                case '"':
                    let retorno = n;
                    this.columna++;
                    n++;
                    this.char = this.texto[n];
                    while(this.char!='"'){
                        this.columna++;
                        n++;
                        this.cadena+=this.char;
                        this.char = this.texto[n];
                        if(n==this.texto.length-1){
                            this.columna-=n-retorno;
                            n = retorno;
                            this.cadena='"';
                            this.guardar();
                            break;
                        }
                    }
                    if(this.char=='"'){
                        this.lista_Token.push(new Token(this.fila,this.columna,"cadena",'"'+this.cadena+'"'));
                        this.cadena="";
                    }
                    break;
                case '/':
                    n++;
                    this.columna++;
                    this.char = this.texto[n];
                    switch(this.char){
                        case '/':
                            while(this.char!='\n'){
                                n++;
                                this.columna++;
                                this.char = this.texto[n];
                                if(n==this.texto.length-2){
                                    break;
                                }
                                
                            }
                            this.fila++;
                            this.columna=0;
                            break;
                        case '*':
                            let retorno = n;
                            n++;
                            this.columna++;
                            this.char = this.texto[n];
                            while(true){
                                if(this.char=='\n'){
                                    this.fila++;
                                }
                                n++;
                                this.columna++;
                                this.char = this.texto[n];
                                if(this.char=='*'&& this.texto[n+1]=='/'){
                                    n++;
                                    this.columna++;
                                    break;
                                }
                                if(n==this.texto.length-1){
                                    n = retorno;
                                    this.cadena='/';
                                    this.guardar();
                                    this.cadena='*';
                                    this.guardar();
                                    break;
                                }
                                
                            }
                            break;
                        default:
                            n--;  this.columna--;
                            this.cadena+="/";
                            this.guardar();
                            break;


                    }
                    break;
                case '!':
                    n++;  this.columna++;
                    this.char = this.texto[n];
                    if(this.char =="="){
                        this.cadena+="!=";
                        this.guardar();
                    }
                    else{
                        n--;  this.columna--;
                        this.cadena+="!";
                        this.guardar();
                    }
                    break;
                case '>':
                    n++;  
                    this.columna++;
                    this.char = this.texto[n];
                    if(this.char =="="){
                        this.cadena+=">=";
                        this.guardar();
                    }
                    else{
                        n--;  this.columna--;
                        this.cadena+=">";
                        this.guardar();
                    }
                    break;

                case '<':
                    n++;  
                    this.columna++;
                    this.char = this.texto[n];
                    if(this.char =="="){
                        this.cadena+="<=";
                        this.guardar();
                    }
                    else{
                        n--;  
                        this.columna-=1;
                        this.cadena+="<";
                        this.guardar();
                    }
                    break;

                case '=':
                    n++;  
                    this.columna++;
                    this.char = this.texto[n];
                    if(this.char =="="){
                        this.cadena+="==";
                        this.guardar();
                    }
                    else{
                        n--;  this.columna--;
                        this.cadena+="=";
                        this.guardar();
                    }
                    break;

                case '+':
                    n++;  
                    this.columna++;
                    this.char = this.texto[n];
                    if(this.char =="+"){
                        this.cadena+="++";
                        this.guardar();
                    }
                    else{
                        n--;  this.columna--;
                        this.cadena+="+";
                        this.guardar();
                    }
                    break;

                case '-':
                    n++;  this.columna++;
                    this.char = this.texto[n];
                    if(this.char =="-"){
                        this.cadena+="--";
                        this.guardar();
                    }
                    else{
                        n--;  this.columna--;
                        this.cadena+="-";
                        this.guardar();
                    }
                    break;

                case '[':
                    n++;  this.columna++;
                    this.char = this.texto[n];
                    if(this.char =="]"){
                        this.cadena+="[]";
                        this.guardar();
                    }
                    else{
                        n--;  this.columna--;
                        this.cadena+="[";
                        this.guardar();
                    }
                    break;
                case '&':
                    n++;  this.columna++;
                    this.char = this.texto[n];
                    if(this.char =="&"){
                        this.cadena+="&&";
                        this.guardar();
                    }
                    else{
                        n--;  this.columna--;
                        this.cadena+="&";
                        this.guardar();
                    }
                    break;
                case '|':
                    n++;  this.columna++;
                    this.char = this.texto[n];
                    if(this.char =="|"){
                        this.cadena+="||";
                        this.guardar();
                    }
                    else{
                        n--;  this.columna--;
                        this.cadena+="|";
                        this.guardar();
                    }
                    break;
                default:
                    if(this.isLetter(this.char)){
                        while(this.isLetter(this.char)||this.isNumber(this.char)||this.char=="_"){
                            this.cadena += this.char;
                            n++;  
                            this.char = this.texto[n];
                            this.columna++;
                        }
                        this.columna--;
                        if(this.cadena[this.cadena.length-1]=='\n'){
                            this.cadena= this.cadena.replace('\n',"");
                            n--;
                        }
                        if(this.dict[this.cadena] == undefined){
                            this.lista_Token.push(new Token(this.fila,this.columna,"identificador",this.cadena));
                            this.cadena="";
                        }
                        else{
                            this.guardar();
                        }
                        
                    }
                    else if(this.isNumber(this.char)){
                        while(this.isNumber(this.char)){
                            this.cadena += this.char;
                            n++; 
                            this.char = this.texto[n];
                            this.columna++;
                        }
                        if(this.char=='.'){
                            if(this.isNumber(this.texto[n+1])){
                                this.cadena += this.char;
                                n++;  this.columna++;
                                this.char = this.texto[n];
                                while(this.isNumber(this.char)){
                                    this.cadena += this.char;
                                    n++;  this.columna++;
                                    this.char = this.texto[n];
                                    
                                }
                                this.lista_Token.push(new Token(this.fila,this.columna,"decimal",this.cadena));
                                this.cadena="";
                            }

                        }
                        else{
                            this.lista_Token.push(new Token(this.fila,this.columna,"entero",this.cadena));
                            this.cadena="";
                            
                        }
                    }
                    else{
                        this.cadena+=this.char;
                        this.guardar();
                        n++;  this.columna++;
                    }
                    this.columna--;
                    n-=1;
                    break;
            }
            this.columna++;
            n++;  
        }
    }

    guardar(){
            if(this.dict[this.cadena] != undefined){
                this.lista_Token.push(new Token(this.fila,this.columna-this.cadena.length,this.dict[this.cadena],this.cadena));
            }
            else{
                this.lista_Error.push(new Error_("LEXICO",this.fila,this.columna-this.cadena.length,this.cadena));
            }
            this.cadena="";
        
    }

    isLetter(c:String): boolean {
        if(c==" "){
            return false;
        }
        return c.toLowerCase() != c.toUpperCase();
    }

    isNumber(c: String): boolean{
        if(c==" "){
            return false;
        }
        if(isNaN(+c)){
            return false;
        }
        else {
            return true
        }
    }

}