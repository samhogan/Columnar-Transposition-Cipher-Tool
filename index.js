
import tableDragger from 'table-dragger';
import { tableCreate } from './tableBuilder';



var decipherBtn = document.getElementById("decipherBtn");
var encipherBtn = document.getElementById("encipherBtn");
var plaintextArea = document.getElementById("plaintextArea");
var ciphertextArea = document.getElementById("ciphertextArea");

var keywordInput = document.getElementById('keyword');
var paddingInput = document.getElementById('padding');

var keyword = "";
var padding = "";

var textArray = [];


//remove whitespace, numbers, and special characters
function cleanText(text)
{
    return text.replace(/[^A-Za-z]/g,"").toLowerCase();
}

function cleanKeyword()
{
    keyword = cleanText(keywordInput.value);
    keywordInput.value = keyword;
}

function cleanPadding()
{
    padding = "x";
    paddingInput.value = padding;
}


function decipher()
{
    console.log("deciphering...");
    
}


function encipher()
{
    console.log("enciphering...");
    
    var plaintext = cleanText(plaintextArea.value);
    cleanKeyword();
    cleanPadding();
    
    //determine number of rows and columns
    var cols = keyword.length;
    var rows = Math.ceil(plaintext.length / cols);

    var paddingCount = rows*cols - plaintext.length;

    for(var i=0; i<paddingCount; i++)
    {
        plaintext+=padding;
    }

    textArray = [];

    for(var c=0; c<cols; c++)
    {
        textArray.push([]);
    }

    var i=0;
    for(var r=0; r<rows; r++)
    {
        for(var c=0; c<cols; c++)
        {
            textArray[c].push(plaintext.charAt(i));
            i++;
        }
    }

    textArray.sort(function(a, b){  
        return keyword.charAt(a) - keyword.charAt(b);
    });

    console.log(textArray);


    ciphertextArea.value = plaintext;





}

decipherBtn.onclick = function(){decipher()};
encipherBtn.onclick = function(){encipher()};





//builds the worksheet table and adds dragging functionality
function createWorksheet()
{
    var tbl = tableCreate();
    var dragger = tableDragger(tbl, {
        mode: 'column',
        dragHandler: '*',
    });
    dragger.on('drop',function(from, to){
        console.log(from);
        console.log(to);
    });
}

createWorksheet();