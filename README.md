# Manual de Usuario


El presente manual de usuario, tiene como finalidad dar a conocer de una manera detallada y sencilla la estructura de "Traductor" para que cualquier usuario pueda utilizar la aplicacion. Esta tiene como objetivo realizar la traduccion de lenguaje java hacia python y javascript respectivamente, por lo que hace uso de dos analizadores lexicos y sintacticos, cada uno genera de forma independiente las graficas y reportes del codigo a traducir. 

La aplicacion esta compuesta de un panel principal con las siguientes areas:

  - Area de entrada: en esta el usuario debera introducir el codigo de java que desea ser traducido.
  - Area de consola: en esta area se mostraran los errores lexicos/sintacticos en caso de haberlos.
  - Area de graficas: se mostrara en imagenes reajustables el proceso que tuvo el analizador, mediante un arbol de analisis sintactico.

La aplicacion cuenta con un area de botones con las siguientes configuraciones:
- Errores: este descarga en formato de tabla los errores encontrados en el analisis.
- Tokens: este descarga en formato de tabla los tokens reconocidos por la aplicacion.
- Graficar: este genera las graficas del arbol de analisis sintactico.
- Traduccion: este genera los archivos traducidos en lenguaje python o javascript respectivamente y los descarga en la computadora.
- Traducir: este boton es encargado de iniciar la ejecucion.

# Manual tecnico

El presente manual tecnico, tiene como fin proporcionar la logica con la que la aplicacion ha sido desarrollada. Asimismo brindar al programador los comandos necesarios para que esta funcione de forma correcta. 

## Golang
Para el manejo de peticiones y el servicio del cliente se utilizo el lenguaje Golang. Este posee todas las plantillas html, css y js necesarias para que el cliente funciona de forma adecuada. Para iniciar la ejecucion se hace uso del comando: 

```sh
$ go run main.go
```
## Servidores

 Para la simulacion de servicios aislados se hizo uso de Nodejs y Express para montar los servidores. Para instalar las dependencias necesarias de estos se debe ejecutar en consola el comando:

```sh
$ npm install
```
Estos fueron desarrollados haciendo uso de typescript por lo que el codigo generado debe de traducirse a js, para esto se hace uso del comando: 
```sh
$ tsc -w
```
Para iniciar la ejecucion del servidor se utiliza el comando:

```sh
$ node dist
```

### JISON

Para generar el codigo equivalente se debe estar colocado en la carpeta de Gramatica, y posteriormente se genera el archivo en js mediante el comando:

```sh
$ jison gramatica.jison
```
### Puertos

A continuacion se definen los puertos por los cuales los servidores reciben peticiones.

| Server | Puerto |
| ------ | ------ |
| JISON | [localhost:3000][PlDb] |
| PAREA | [localhost:4000][PlGh] 
| GOLANG | [localhost:8000][PlGh] 

### Gramatica JISON

Esta gramatica es aplicable a cualquier analizador de tipo ascendente, y es necesario asignar la precedencia de operadores en la herramienta.



        CLASES : CLASES CLASE 
		        | CLASE 


        CLASE: public_ class_ identificador BLOQUE_SENTENCIAS
	         | public_ interface_ identificador BLOQUE_SENTENCIAS 
	         | public_ static_ void_ main_ parAbre string_ corchetes args_ parCierra BLOQUE_SENTENCIAS 


        INSTRUCCIONES : INSTRUCCIONES INSTRUCCION
	                  | INSTRUCCION 


        INSTRUCCION : DECLARACION
	                | ASIGNACION	
	                | INCRE_DECRE pcoma	
	                | FUNCION_CLASE	
	                | FUNCION_INTERFACE	
	                | LLAMADA		
	                | WHILE			
	                | DO_WHILE		
	                | FOR			
	                | IF			
	                | PRINT			
	                | break_ pcoma				
	                | continue_ pcoma			
	                | return_ EXPRESION pcoma	

        INCRE_DECRE: identificador mas_mas 			
	               | identificador menos_menos  		

        FUNCION_CLASE:  public_ TIPO identificador parAbre PARAMETROS parCierra BLOQUE_SENTENCIAS 
	                 | public_ void_ identificador parAbre PARAMETROS parCierra BLOQUE_SENTENCIAS 


        FUNCION_INTERFACE:  public_ TIPO identificador parAbre PARAMETROS parCierra pcoma
	                     | public_ void_ identificador parAbre PARAMETROS parCierra pcoma 

        BLOQUE_SENTENCIAS : llaveAbre llaveCierra 
	                      | llaveAbre INSTRUCCIONES llaveCierra 
	
        PARAMETROS : PARAMETROS coma PARAMETRO
	               | PARAMETRO 

        PARAMETRO : TIPO identificador

        DECLARACION : TIPO identificador pcoma 
			        | TIPO identificador coma DECLARA pcoma 
			        | TIPO identificador igual EXPRESION pcoma 
			        | TIPO identificador igual EXPRESION coma DECLARA pcoma 

        DECLARA:  identificador igual EXPRESION  		
	           | identificador igual EXPRESION coma DECLARA 
	           | identificador coma DECLARA	 			
	           | identificador 	 						 
	

        LLAMADA : identificador parAbre PRIMITIVOS parCierra pcoma

        TIPO : numeric_ 
	         | string_ 	
	         | boolean_	
	         | double_ 	
	         | char_ 	

        ASIGNACION : identificador igual EXPRESION pcoma 

        WHILE : while_ parAbre EXPRESION parCierra BLOQUE_SENTENCIAS

        DO_WHILE : do_ BLOQUE_SENTENCIAS while_ parAbre EXPRESION parCierra pcoma 

        FOR: for_ parAbre DECLARACION  EXPRESION pcoma EXPRESION parCierra BLOQUE_SENTENCIAS


        IF: if_ parAbre EXPRESION parCierra BLOQUE_SENTENCIAS ELSE 
	      | if_ parAbre EXPRESION parCierra BLOQUE_SENTENCIAS
	
        ELSE: else_ BLOQUE_SENTENCIAS 
	        | else_ IF 				  

        PRINT : system_ punto out_ punto print_ parAbre EXPRESION parCierra pcoma 
	        | system_ punto out_ punto println_ parAbre EXPRESION parCierra pcoma

        EXPRESION : EXPRESION mas EXPRESION		
	              | EXPRESION menos EXPRESION		
	              | EXPRESION por EXPRESION		
	              | EXPRESION division EXPRESION	
	              | INCRE_DECRE					
	
	              | EXPRESION mayorQ_igual EXPRESION	
	              | EXPRESION mayorQ EXPRESION	
	              | EXPRESION menorQ_igual EXPRESION	
	              | EXPRESION menorQ EXPRESION	
	              | EXPRESION igual_igual EXPRESION	
	              | distinto EXPRESION	
	
	              | EXPRESION or_ EXPRESION		
	              | EXPRESION and_ EXPRESION		
	              | EXPRESION xor_ EXPRESION		
	              | not_ EXPRESION				
	              | menos EXP %prec uMenos		
	              | parAbre EXPRESION parCierra	
	              | PRIMITIVO						
	

        PRIMITIVOS : PRIMITIVOS coma PRIMITIVO 
	               | PRIMITIVO

        PRIMITIVO : decimal		
	              | entero		
	              |  caracter		
	              | cadena		
	              | true_			
	              | false_		
	              | identificador 
	

### Gramatica PAREA

En el metodo de parea se utilizo la misma gramatica utilizada en JISON, las unicas modificaciones pertinentes se realizaron en las listas, cambiando la recursividad de la izquierda como en el siguiente ejemplo. Cabe recalcar que dicha gramatica es aplicable a los analizadores descendentes unicamente.
        
        CLASES : CLASES CLASE 
		        | CLASE 
La gramatica anterior se modifico y se utilizo como:
        
        CLASES : CLASE CLASES  
		        | CLASE 

Para llevar a cabo dicha accion, se utilizo 1 token de reconocimiento previo. Asimismo las expresiones necesitaron un cambio, removiendo la recursividad por la izquierda y ambiguedades que existiesen en esta, por lo que la gramatica de expresiones se utilizo de la siguiente manera:

        E : T EP  
        
		EP : + T EP
		   | - T EP
		   | > T EP
		   | < T EP
		   | >= T EP
		   | <= T EP
		   | == T EP
		   | != T EP
		   | || T EP
		   | && T EP
		   | ^ T EP
		   | e
		   
		T:  F TP
		TP : * F TP
		   | / F EP
		   | e
        
        F : (E)
          | -E
          | ! E
          | PRIMITVO
License
----

201800546 - Erick Alvarado


**Si sale compi!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
