
import tableDragger from 'table-dragger';
//const tableDragger = require('table-dragger');
//import watchify from 'watchify';

/*
var el = document.getElementById('testTable');
var dragger = tableDragger(el, {
  mode: 'column',
  dragHandler: '*',
});
dragger.on('drop',function(from, to){
  console.log(from);
  console.log(to);
});
*/

var decipherBtn = document.getElementById("decipherBtn");
var encipherBtn = document.getElementById("encipherBtn");
var plaintextArea = document.getElementById("plaintextArea");
var ciphertextArea = document.getElementById("ciphertextArea");



function decipher()
{
    console.log("deciphering...");
    

}


function encipher()
{
    console.log("enciphering...");
    
    var plaintext = plaintextArea.value.toLowerCase();

    //remove whitespace, numbers, and special characters
    plaintext = plaintext.replace(/[^A-Za-z]/g,"");
    
    var cols = 5;
    var rows = plaintext.length / cols;

    for(var c=0; c<cols; c++)
    {
        //for(var r=0; r<)
    }


    ciphertextArea.value = plaintext;
}

decipherBtn.onclick = function(){decipher()};
encipherBtn.onclick = function(){encipher()};


function tableCreate(){
  var body = document.getElementById('worksheet-col');
  var tbl  = document.createElement('table');
  tbl.className = 'display table';


  for(var i = 0; i < 5; i++)
  {
      var tr = tbl.insertRow();
      for(var j = 0; j < 6; j++)
      {
          var td = tr.insertCell();
          td.appendChild(document.createTextNode('a'));
      }
  }
  body.appendChild(tbl);
}
tableCreate();