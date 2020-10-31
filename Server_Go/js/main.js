//Variables 1: con jison (js)   ;     Variables 2: a patita (py)
var listaErrores1;
var listaErrores2;

var listaTokens1;
var listaTokens2;

var grafica1="";
var grafica2="";

var traduccion1;
var traduccion2;

function reporteGrafica(){
  d3.select("#graph1").graphviz().renderDot(grafica1);
}

function reporteErrores(){
  var a=1;
  console.log(a);
  if(listaErrores1!=undefined){
    pdfErrores("error")
  }
}
function reporteTokens(){
  if(listaTokens1!=undefined){
    pdfErrores("token")
  }
}

function pdfErrores(tipo){

  var itemNew;
  var doc = new jsPDF();
  
  var col = ["TIPO","FILA","COLUMNA","DESCRIPCION",];
  var rows = [];
  /* The following array of object as response from the API req  */
  if(tipo=="error"){
    itemNew = listaErrores1;
  }
  else{
    itemNew = listaTokens1;
  }

  itemNew.forEach(e => {      
    var temp = [e.tipo,e.fila, e.columna,e.descripcion];
    rows.push(temp);
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
  }
  else{
    doc.save('Tokens_Jison.pdf');

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

    listaErrores1=response[1].errores;
    listaTokens1 = response[0].tokens;
    grafica1 = response[2].grafo;
    traduccion1 = response[3].traduccion;

    console.log("------------JISON-------------\n");
    console.log("Lista errores: "+listaErrores1+"\n");
    console.log("Lista tokens: "+listaTokens1+"\n");
    console.log("Grafica: "+grafica1+"\n");
    console.log("Traduccion: "+traduccion1+"\n");

    let Err=listaErrores1;

    //Ordena por tipo
    Err.sort(function(a, b){
      var nameA=a.tipo.toLowerCase(), nameB=b.tipo.toLowerCase()
      if (nameA < nameB) //sort string ascending
          return -1 
      if (nameA > nameB)
          return 1
      return 0 //default return value (no sorting)
    })
    let errcons="";
    Err.forEach(error => errcons+= error.tipo+" fila:"+error.fila+" columna:"+error.columna+" descripcion:"+error.descripcion+"\n");    
    let con = ace.edit("Console"); 
    con.setValue(errcons);
}

