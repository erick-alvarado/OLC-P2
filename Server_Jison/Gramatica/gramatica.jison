%{
	const { Instruccion } = require("../dist/ast/Instruccion");
	const { Error_ } = require("../dist/ast/Error_");
	const { ParaQueNoTruene } = require("../dist/ast/ParaQueNoTruene");
	const { Token } = require("../dist/ast/Token");
	const { AST } = require("../dist/ast/AST");
	const { Asignacion } = require("../dist/ast/instrucciones/Asignacion");
	const { Sentencia } = require("../dist/ast/instrucciones/Sentencia");
	const { Declaracion } = require("../dist/ast/instrucciones/Declaracion");
	const { Print } = require("../dist/ast/instrucciones/Print");
	const { While } = require("../dist/ast/instrucciones/While");
	const { DoWhile } = require("../dist/ast/instrucciones/DoWhile");
	const { Llamada } = require("../dist/ast/instrucciones/Llamada");
	const { For } = require("../dist/ast/instrucciones/For");
	const { Incre_Decre } = require("../dist/ast/instrucciones/Incre_Decre");

	const { OperacionAritmetica } = require("../dist/ast/expresiones/OperacionAritmetica");
	const { OperacionLogica } = require("../dist/ast/expresiones/OperacionLogica");
	const { OperacionRelacional } = require("../dist/ast/expresiones/OperacionRelacional");
	const { Identificador } = require("../dist/ast/expresiones/Identificador");
	const { Primitivo } = require("../dist/ast/expresiones/Primitivo");
	const { Type } = require("../dist/ast/Tipo");
	const { TypeOperation } = require("../dist/ast/Tipo");
	const { Clase } = require("../dist/ast/clases/Clase");
	const { Interface } = require("../dist/ast/clases/interface");
	const { Main } = require("../dist/ast/clases/Main");
	const { Parametro } = require("../dist/ast/instrucciones/Parametro");
	const { If } = require("../dist/ast/instrucciones/If");
	const { Else } = require("../dist/ast/instrucciones/Else");
	const { Funcion_Clase } = require("../dist/ast/funciones/Funcion_Clase");
	const { Funcion_Interface } = require("../dist/ast/funciones/Funcion_Interface");
	var root = new AST(null, [] , [] );
%}


/* Definició Léxica */
%lex

%options case-insensitive

%%
\s+					//ignorando los espacios en blanco
"//".*				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "Comentario", yytext)); }	/* ignore comment line */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "Comentario multilinea", yytext)); }	/* ignore comment Multilinea*/

"int"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "numeric_", yytext)); return 'numeric_'; }	
"string"		{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "string_", yytext)); return 'string_'; }	
"char"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "char_", yytext)); return 'char_'; }		
"boolean"		{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "boolean_", yytext)); return 'boolean_'; }		
"double"		{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "double_", yytext)); return 'double_'; }	

"for"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "for_", yytext)); return 'for_'; }	
"do"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "do_", yytext)); return 'do_'; }	
"while"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "while_", yytext)); return 'while_'; }	
"if"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "if_", yytext)); return 'if_';}	
"else"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "else_", yytext)); return 'else_';}	

"break"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "break_", yytext)); return 'break_';}		
"return"		{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "return_", yytext)); return 'return_';}	
"continue"		{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "continue_", yytext)); return 'continue_';}	

"public"		{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "public_", yytext)); return 'public_';}	
"class"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "class_", yytext)); return 'class_';}	
"interface"		{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "interface_", yytext)); return 'interface_';}	
"void"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "void_", yytext)); return 'void_';}	
"static"		{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "static_", yytext)); return 'static_';}	
"main"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "main_", yytext)); return 'main_';}	
"args"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "args_", yytext)); return 'args_';}	

"system"		{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "system_", yytext)); return 'system_';}	
"out"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "out_", yytext)); return 'out_';}	
"print"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "print_", yytext)); return 'print_';}	
"println"		{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "println_", yytext)); return 'println_';}	

"=="			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "igual_igual", yytext)); return 'igual_igual';}	
"++"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "mas_mas", yytext)); return 'mas_mas';}	
"--"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "menos_menos", yytext)); return 'menos_menos';}	
"!="			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "distinto", yytext)); return 'distinto';}	
"&&"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "and_", yytext)); return 'and_';}	
"<="			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "menorQ_igual", yytext)); return 'menorQ_igual';}	
">="			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "mayorQ_igual", yytext)); return 'mayorQ_igual';}	
"||"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "or_", yytext)); return 'or_';}	

"="				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "igual", yytext)); return 'igual';}	
","				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "coma", yytext)); return 'coma';}	
"[]"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "corchetes", yytext)); return 'corchetes';}	
";"				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "pcoma", yytext)); return 'pcoma';}	
"{"				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "llaveAbre", yytext)); return 'llaveAbre';}	
"}"				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "llaveCierra", yytext)); return 'llaveCierra';}	
"."				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "punto", yytext)); return 'punto';}	

"+"				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "mas", yytext)); return 'mas';}	
"-"				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "menos", yytext)); return 'menos';}	
"*"				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "por", yytext)); return 'por';}	

"/"				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "division", yytext)); return 'division';}	
"("				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "parAbre", yytext)); return 'parAbre';}	
")"				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "parCierra", yytext)); return 'parCierra';}	


"<"				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "menorQ", yytext)); return 'menorQ';}	
">"				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "mayorQ", yytext)); return 'mayorQ';}	

"!"				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "not_", yytext)); return 'not_';}	
"^"				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "xor_", yytext)); return 'xor_';}	

"true"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "true_", yytext)); return 'true_';}	
"false"			{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "false_", yytext)); return 'false_';}	

\'([^\\\"]|\\.)\'		{  root.addToken(new Token(yylloc.first_line,yylloc.first_column, "caracter", yytext)); return 'caracter'; }

\"[^\"]*\"				{ root.addToken(new Token(yylloc.first_line,yylloc.first_column, "cadena", yytext)); return 'cadena'; /*//"*/ }
[0-9]+"."[0-9]+		{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "decimal", yytext)); return 'decimal';}	
[0-9]+				{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "entero", yytext)); return 'entero';}


([a-zA-Z_])[a-zA-Z0-9_]*	{root.addToken(new Token(yylloc.first_line,yylloc.first_column, "identificador", yytext)); return 'identificador';}	
[ \r\t]+			{}
\n					{}
<<EOF>>				return 'EOF';
.	{ 
		root.addError(new Error_("LEXICO",yylloc.first_line, yylloc.first_column, "El caracter: ' " +yytext+" ' no pertenece al lenguaje"));

	}

/lex

%left 'or_'
%left 'and_'
%left 'xor_'


%left 'igual'  'igual_igual' 'distinto'

%left 'mayorQ' 'menorQ' 'mayorQ_igual' 'menorQ_igual'

%left 'mas' 'menos'
%left 'por' 'division'


%left uMenos
%right 'not_' 
%right 'mas_mas' 'menos_menos'

%start INI

%% 
INI : CLASES EOF {
		root.setInstruccion($1);
		let aux = root
		root = new AST(null, [] , [] );
		return aux; 
	}
	;
CLASES :
	  CLASES CLASE {
		$1.push($2);
		$$ = $1;
	  }
	| CLASE {
		$$ = [$1];
	
	}
	;



CLASE: public_ class_ identificador BLOQUE_SENTENCIAS { $$= new Clase($3,$4, this._$.first_line, this._$.first_column); }
	| public_ interface_ identificador BLOQUE_SENTENCIAS { $$= new Interface($3,$4, this._$.first_line, this._$.first_column); }
	| public_ static_ void_ main_ parAbre string_ corchetes args_ parCierra BLOQUE_SENTENCIAS { $$= new Main(null,$10, this._$.first_line, this._$.first_column); }	
	|  error {
		root.addError(new Error_("SINTACTICO",this._$.first_line, this._$.first_column, yytext));
		$$ = new ParaQueNoTruene(0,0);		
	}
	;


INSTRUCCIONES :
	  INSTRUCCIONES INSTRUCCION {
		$1.push($2);
		$$ = $1;
	  }
	
	| INSTRUCCION {
		$$ = [$1];
	}
	;


INSTRUCCION : 
	DECLARACION	{ $$ = $1;}
	| ASIGNACION	{ $$ = $1; }
	| INCRE_DECRE pcoma	{ $$ = $1; }
	| FUNCION_CLASE	{ $$ = $1; }
	| FUNCION_INTERFACE	{ $$ = $1; }
	| LLAMADA		{ $$ = $1; }
	| WHILE			{ $$ = $1; }
	| DO_WHILE		{ $$ = $1; }
	| FOR			{ $$ = $1; }
	| IF			{ $$ = $1; }
	| PRINT			{ $$ = $1; }
	| break_ pcoma				{ $$= new Sentencia($1, null,this._$.first_line, this._$.first_column); }
	| continue_ pcoma			{ $$= new Sentencia($1, null,this._$.first_line, this._$.first_column); }
	| return_ EXPRESION pcoma	{ $$= new Sentencia($1, $2,this._$.first_line, this._$.first_column); }
	
	;

INCRE_DECRE: identificador mas_mas 			{ $$ = new Incre_Decre( $1,TypeOperation.ADICION,  this._$.first_line, this._$.first_column); }
	| identificador menos_menos  		{ $$ = new Incre_Decre( $1,TypeOperation.SUBSTRACCION,  this._$.first_line, this._$.first_column); }
	;

FUNCION_CLASE:  public_ TIPO identificador parAbre PARAMETROS parCierra BLOQUE_SENTENCIAS { $$= new Funcion_Clase($2, $3, $5,$7, this._$.first_line, this._$.first_column); }
	| public_ void_ identificador parAbre PARAMETROS parCierra BLOQUE_SENTENCIAS { $$= new Funcion_Clase($2, $3, $5,$7, this._$.first_line, this._$.first_column); }
	;
FUNCION_INTERFACE:  public_ TIPO identificador parAbre PARAMETROS parCierra pcoma { $$= new Funcion_Interface($2, $3, $5,$7, this._$.first_line, this._$.first_column); }
	| public_ void_ identificador parAbre PARAMETROS parCierra pcoma { $$= new Funcion_Interface($2, $3, $5,$7, this._$.first_line, this._$.first_column); }
	;

BLOQUE_SENTENCIAS : llaveAbre llaveCierra { $$ = new ParaQueNoTruene( this._$.first_line, this._$.first_column); } 
	| llaveAbre INSTRUCCIONES llaveCierra { $$ = $2; }
	
	;

	

PARAMETROS :
	  PARAMETROS coma PARAMETRO {
		$1.push($3);
		$$ = $1;
	  }
	| PARAMETRO {
		$$ = [$1];
	}
	;

PARAMETRO : 
	  TIPO identificador	{  $$= new Parametro($1, $2,this._$.first_line, this._$.first_column); }
	;



DECLARACION : TIPO identificador pcoma { $$= new Declaracion($1, $2, null,null, this._$.first_line, this._$.first_column); } 
			| TIPO identificador coma DECLARA pcoma { $$= new Declaracion($1, $2, null,$4, this._$.first_line, this._$.first_column); }
			| TIPO identificador igual EXPRESION pcoma { $$= new Declaracion($1, $2, $4,null, this._$.first_line, this._$.first_column); }
			| TIPO identificador igual EXPRESION coma DECLARA pcoma { $$= new Declaracion($1, $2, $4,$6, this._$.first_line, this._$.first_column); }
	;

DECLARA:  identificador igual EXPRESION  		 { $$= new Declaracion(Type.COMA, $1, $3 ,null, this._$.first_line, this._$.first_column); }
	| identificador igual EXPRESION coma DECLARA { $$= new Declaracion(Type.COMA, $1, $3 ,$5, this._$.first_line, this._$.first_column); }
	| identificador coma DECLARA	 			 { $$= new Declaracion(Type.COMA, $1,null,$3, this._$.first_line, this._$.first_column); }
	| identificador 	 						 { $$= new Declaracion(Type.COMA, $1, null,null, this._$.first_line, this._$.first_column); }
	;

LLAMADA : identificador parAbre PRIMITIVOS parCierra pcoma { $$= new Llamada($1, $3, this._$.first_line, this._$.first_column); }
	;

TIPO : numeric_ { $$ = Type.NUMERIC; }
	| string_ 	{ $$ = Type.STRING; }
	| boolean_	{ $$ = Type.BOOLEAN; }
	| double_ 	{ $$ = Type.DOUBLE; }
	| char_ 	{ $$ = Type.CHAR; }
	;

ASIGNACION : identificador igual EXPRESION pcoma { $$ = new Asignacion($1, $3, this._$.first_line, this._$.first_column); }
	;

WHILE : while_ parAbre EXPRESION parCierra BLOQUE_SENTENCIAS { $$ = new While($3, $5, this._$.first_line, this._$.first_column); }
	;

DO_WHILE : do_ BLOQUE_SENTENCIAS while_ parAbre EXPRESION parCierra pcoma { $$ = new DoWhile($5, $2, this._$.first_line, this._$.first_column); }
	;

FOR: for_ parAbre DECLARACION  EXPRESION pcoma EXPRESION parCierra BLOQUE_SENTENCIAS { $$ = new For($3, $4, $6,$8, this._$.first_line, this._$.first_column); }
	;


IF: if_ parAbre EXPRESION parCierra BLOQUE_SENTENCIAS ELSE { $$ = new If($3,$5,$6, this._$.first_line, this._$.first_column); }
	| if_ parAbre EXPRESION parCierra BLOQUE_SENTENCIAS{ $$ = new If($3, $5,null, this._$.first_line, this._$.first_column); }
	;
ELSE: else_ BLOQUE_SENTENCIAS { $$ = new Else(null, $2, this._$.first_line, this._$.first_column); }
	| else_ IF 				  { $$ = new Else($2, null, this._$.first_line, this._$.first_column); }
	;
PRINT : system_ punto out_ punto print_ parAbre EXPRESION parCierra pcoma { $$ = new Print( $7, this._$.first_line, this._$.first_column); }
	| system_ punto out_ punto println_ parAbre EXPRESION parCierra pcoma { $$ = new Print( $7, this._$.first_line, this._$.first_column); }
	;

EXPRESION : 
	// Aritmeticas
	  EXPRESION mas EXPRESION		{ $$ = new OperacionAritmetica( TypeOperation.SUMA, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION menos EXPRESION		{ $$ = new OperacionAritmetica( TypeOperation.RESTA, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION por EXPRESION		{ $$ = new OperacionAritmetica( TypeOperation.MULTIPLICACION, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION division EXPRESION	{ $$ = new OperacionAritmetica( TypeOperation.DIVISION, $1, $3, this._$.first_line, this._$.first_column); }
	| INCRE_DECRE					{ $$ = $1; }
	
	// Relacionales
	| EXPRESION mayorQ_igual EXPRESION	{ $$ = new OperacionRelacional( TypeOperation.MAYOR_IGUAL, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION mayorQ EXPRESION	{ $$ = new OperacionRelacional( TypeOperation.MAYOR, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION menorQ_igual EXPRESION	{ $$ = new OperacionRelacional( TypeOperation.MENOR_IGUAL, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION menorQ EXPRESION	{ $$ = new OperacionRelacional( TypeOperation.MENOR, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION igual_igual EXPRESION	{ $$ = new OperacionRelacional( TypeOperation.IGUAL_IGUAL, $1, $3, this._$.first_line, this._$.first_column); }
	| distinto EXPRESION	{ $$ = new OperacionRelacional( TypeOperation.DISTINTO, $2, null, this._$.first_line, this._$.first_column); }
	
	// Logicas
	| EXPRESION or_ EXPRESION		{ $$ = new OperacionLogica( TypeOperation.OR, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION and_ EXPRESION		{ $$ = new OperacionLogica( TypeOperation.AND, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION xor_ EXPRESION		{ $$ = new OperacionLogica( TypeOperation.XOR, $1, $3, this._$.first_line, this._$.first_column); }
	| not_ EXPRESION				{ $$ = new OperacionLogica( TypeOperation.NOT, $2, null, this._$.first_line, this._$.first_column); }
	| menos EXP %prec uMenos		{ $$ = new OperacionAritmetica( TypeOperation.MENOSUNARIO, $2, null, this._$.first_line, this._$.first_column); }
	| parAbre EXPRESION parCierra	{ $$ = new OperacionAritmetica( TypeOperation.PARENTESIS, $2, null, this._$.first_line, this._$.first_column); }
	| PRIMITIVO						{ $$ = $1; }
	
	;

PRIMITIVOS :
	  PRIMITIVOS coma PRIMITIVO {
		$1.push($3);
		$$ = $1;
	  }
	| PRIMITIVO {
		$$ = [$1];
	}
	; 

PRIMITIVO : 
	  decimal		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| entero		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	|  caracter		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| cadena		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| true_			{ $$ = new Primitivo( true, this._$.first_line, this._$.first_column); }
	| false_		{ $$ = new Primitivo( false, this._$.first_line, this._$.first_column); }
	| identificador { $$ = new Identificador( $1, this._$.first_line, this._$.first_column); }
	;
