//Variables 1: con jison (js)   ;     Variables 2: a patita (py)
var listaErrores1=[];
var listaErrores2=[];

var listaTokens1=[];
var listaTokens2=[];

var grafica1="";
var grafica2="";

var traduccion1="";
var traduccion2="";

function reporteGrafica(){
  d3.select("#graph1").graphviz().renderDot(grafica1);
  d3.select("#graph2").graphviz().renderDot(grafica2);
}

function reporteTraduccion(){
  generarTxt("javascript.txt",traduccion1);
  generarTxt("python.txt",traduccion2);
}
function generarTxt(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
function reporteErrores(){
  var a=1;
  if(listaErrores1!=undefined && listaErrores2!=undefined){
    pdfErrores("error")
  }
}
function reporteTokens(){
  if(listaTokens1!=undefined && listaTokens2!=undefined){
    pdfErrores("token")
  }
}

function pdfErrores(tipo){

  var itemNew;
  var itemNew2;
  var doc = new jsPDF();
  
  var col = ["TIPO","FILA","COLUMNA","DESCRIPCION",];
  var rows = [];
  var rows2 = [];
  /* The following array of object as response from the API req  */
  if(tipo=="error"){
    itemNew = listaErrores1;
    itemNew2 = listaErrores2;
  }
  else{
    itemNew = listaTokens1;
    itemNew2 = listaTokens2;
  }

  itemNew.forEach(e => {      
    var temp = [e.tipo,e.fila, e.columna,e.descripcion];
    rows.push(temp);
  });   
  itemNew2.forEach(e => {      
    var temp = [e.tipo,e.fila, e.columna,e.descripcion];
    rows2.push(temp);
  });     

  doc.autoTable(col, rows, {
    startY: 10,
    theme: 'grid',
    tableWidth: 'auto',
    columnWidth: 'wrap',
    showHeader: 'everyPage',
    tableLineColor: 200,
    tableLineWidth: 0,
    columnStyles: {
        0: {
            columnWidth: 30
        },
        1: {
            columnWidth: 30
        },
        2: {
            columnWidth: 30
        },
        3: {
            columnWidth: 70
        }
    },
    headerStyles: {
        theme: 'grid'
    },
    styles: {
        overflow: 'linebreak',
        columnWidth: 'wrap',
        font: 'arial',
        fontSize: 10,
        cellPadding: 8,
        overflowColumns: 'linebreak'
    },
});
  if(tipo=="error"){
    doc.save('Errores_Jison.pdf');
    doc.rows=rows2;
    doc.save('Errores_Manual.pdf');
  }
  else{
    doc.save('Tokens_Jison.pdf');
    doc.rows=rows2;
    doc.save('Tokens_Manual.pdf');

  }
}

function Analizar(){
  console.log("------------Datos de envio en js-------------")
    //Obtengo el texto de mi editor
    let jtxtJSharp = ace.edit("Editor");
    var codigo = String(jtxtJSharp.getSession().getValue());
    console.log("la entrada es: "+codigo);
    codigo = codigo.replace(/\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");

// remove non-printable and other non-valid JSON chars
    codigo = codigo.replace(/[\u0000-\u0019]+/g,"");
    console.log("la entrada es: "+codigo);

    fetch('../traducir', {
        method: 'POST',
        body: JSON.stringify({"Codigo":codigo}),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => view(response));
}
  
function view(response){
    console.log("------------Datos de vuelta en js-------------\n");
    console.log(response)
    listaErrores1=response[1].errores;
    listaTokens1 = response[0].tokens;
    grafica1 = response[2].grafo;
    traduccion1 = response[3].traduccion;

    listaErrores2=response[5].errores;
    listaTokens2 = response[4].tokens;
    grafica2 = response[6].grafo;
    traduccion2 = response[7].traduccion;
    

    console.log("------------MANUAL-------------\n");
    console.log("Lista errores: "+listaErrores2+"\n");
    console.log("Lista tokens: "+listaTokens2+"\n");
    console.log("Grafica: "+grafica2+"\n");
    console.log("Traduccion: "+traduccion2+"\n");

    let Err=listaErrores1;
    let Err2=listaErrores2;

    //Ordena por tipo
    Err.sort(function(a, b){
      var nameA=a.tipo.toLowerCase(), nameB=b.tipo.toLowerCase()
      if (nameA < nameB) //sort string ascending
          return -1 
      if (nameA > nameB)
          return 1
      return 0 //default return value (no sorting)
    })
    Err2.sort(function(a, b){
      var nameA=a.tipo.toLowerCase(), nameB=b.tipo.toLowerCase()
      if (nameA < nameB) //sort string ascending
          return -1 
      if (nameA > nameB)
          return 1
      return 0 //default return value (no sorting)
    })
    let errcons="";
    let errcons2="";
    Err.forEach(error => errcons+= error.tipo+" fila:"+error.fila+" columna:"+error.columna+" descripcion:"+error.descripcion+"\n");    
    Err2.forEach(error => errcons2+= error.tipo+" fila:"+error.fila+" columna:"+error.columna+" descripcion:"+error.descripcion+"\n");    
    if(errcons==""){
      errcons=traduccion1
    }
    if(errcons2==""){
      errcons2=traduccion2
    }
    let con = ace.edit("Console"); 
    con.setValue(errcons);

    let con2 = ace.edit("Console2"); 
    con2.setValue(errcons2);
}

