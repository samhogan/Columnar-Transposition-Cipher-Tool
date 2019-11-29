
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

var worksheetTable = null;


//remove whitespace, numbers, and special characters
function cleanText(text)
{
    return text.replace(/[^A-Za-z]/g,"").toLowerCase();
}


var keywordOrder = [];
var keywordLocs = [];
var worksheetHeadings = [];
function setUpKeyword()
{
    keyword = cleanText(keywordInput.value);
    keywordInput.value = keyword;

    //entries hold the array locations of the index (backward)
    keywordLocs = [];
    for(var i=0; i<keyword.length; i++)
    {
        keywordLocs.push(i);
    }

    keywordLocs.sort(function(a,b){
        return keyword.charCodeAt(a) - keyword.charCodeAt(b);
    });

    //now swap the index with the value
    keywordOrder = [];
    for(var i=0; i<keyword.length; i++)
    {
        keywordOrder[keywordLocs[i]] = i;
    }

    //create the worksheet/visualization headings
    worksheetHeadings = [];
    for(var i=0; i<keyword.length; i++)
    {
        worksheetHeadings[i] = keyword.charAt(i) + "<br>(" + (keywordOrder[i]+1) + ")";
    }



}

function cleanPadding()
{
    padding = "x";
    paddingInput.value = padding;
}


function decipher()
{
    console.log("deciphering...");
    
    var ciphertext = cleanText(ciphertextArea.value);
    setUpKeyword();
    cleanPadding();

    //determine number of rows and columns
    var cols = keyword.length;
    var rows = Math.ceil(ciphertext.length / cols);

    //the rectangle
    textArray = [];

    //build the text array (the rectangle)
    for(var c=0; c<cols; c++)
    {
        textArray.push([]);
    }

    var i=0;
    for(var c=0; c<cols; c++)
    {
        for(var r=0; r<rows; r++)
        {
            textArray[c].push(ciphertext.charAt(i));
            i++;
        }
    }

    //sort it to be in the order of the keyword
    textArray.sort(function(a, b){  
        return keywordLocs[textArray.indexOf(a)] - keywordLocs[textArray.indexOf(b)];
    });

    console.log(textArray);

    //build the plaintext
    var plaintext = "";
    for(var r=0; r<rows; r++)
    {
        for(var c=0; c<cols; c++)
        {
            plaintext += textArray[c][r];
        }
    }


    plaintextArea.value = plaintext;

    createWorksheet();
}


function encipher()
{
    console.log("enciphering...");
    
    var plaintext = cleanText(plaintextArea.value);
    setUpKeyword();
    console.log(keywordOrder);
    cleanPadding();
    
    //determine number of rows and columns
    var cols = keyword.length;
    var rows = Math.ceil(plaintext.length / cols);

    var paddingCount = rows*cols - plaintext.length;

    //add padding
    for(var i=0; i<paddingCount; i++)
    {
        plaintext+=padding;
    }

    textArray = [];

    //build the text array (the rectangle)
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

    //sort the columns by the order they are taken out "out by columns"
    var textArrayColsInOrder = textArray.slice(0);

    textArrayColsInOrder.sort(function(a, b){  
        //console.log(keyword.charCodeAt(textArray.indexOf(a)) - keyword.charCodeAt(textArray.indexOf(b)));
        return keyword.charCodeAt(textArray.indexOf(a)) - keyword.charCodeAt(textArray.indexOf(b));
    });

   // console.log(textArray);
   // console.log(textArrayColsInOrder);

   //build the ciphertext
    var cipherText = "";
    var charsSinceSpace = 0;
    for(var c=0; c<cols; c++)
    {
        for(var r=0; r<rows; r++)
        {
            cipherText += textArrayColsInOrder[c][r];
            charsSinceSpace++;
            if(charsSinceSpace == 5)
            {
                cipherText += " ";
                charsSinceSpace = 0;
            }
        }
    }


    ciphertextArea.value = cipherText.toUpperCase();

    createWorksheet();

}

decipherBtn.onclick = function(){decipher()};
encipherBtn.onclick = function(){encipher()};





//builds the worksheet table and adds dragging functionality
function createWorksheet()
{
    //delete the old one
    if(worksheetTable != null)
    {
        worksheetTable.parentNode.removeChild(worksheetTable);
    }

    worksheetTable = tableCreate(worksheetHeadings, textArray);
    worksheetTable.style.width = Math.min(1200, keyword.length*40) + "px";
    var dragger = tableDragger(worksheetTable, {
        mode: 'column',
        dragHandler: '*',
    });
    dragger.on('drop',function(from, to){
        console.log(from);
        console.log(to);
    });
}

//createWorksheet();