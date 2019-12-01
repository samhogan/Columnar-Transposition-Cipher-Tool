
import tableDragger from 'table-dragger';
import { tableCreate } from './tableBuilder';
import { array_move } from './arrayMove';



var decipherBtn = document.getElementById("decipherBtn");
var encipherBtn = document.getElementById("encipherBtn");
var genRectBtn = document.getElementById("genRectBtn");
var autoSolveBtn = document.getElementById("autoSolveBtn");

var plaintextArea = document.getElementById("plaintextArea");
var ciphertextArea = document.getElementById("ciphertextArea");
var ciphertextArea2 = document.getElementById("ciphertextArea2");
var resultArea = document.getElementById("resultArea");

var keywordInput = document.getElementById('keyword');
var paddingInput = document.getElementById('padding');


var keyword = "";
var padding = "";
var columnsValue = 0;

var textArray = [];
var textArray2 = [];//for the solve tab

var worksheetTable = null;
var worksheetTable2 = null;


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

function setUpPadding()
{
    padding = cleanText(paddingInput.value);
    if(padding == "")
        padding = "x";
    
    paddingInput.value = padding;
}


function fillArrayFromCiphertext(ciphertext, rows, cols)
{
    //the rectangle
    var textArrayTemp = [];

    //build the text array (the rectangle)
    for(var c=0; c<cols; c++)
    {
        textArrayTemp.push([]);
    }

    var i=0;
    for(var c=0; c<cols; c++)
    {
        for(var r=0; r<rows; r++)
        {
            textArrayTemp[c].push(ciphertext.charAt(i));
            i++;
        }
    }

    return textArrayTemp;
}

function getPlainTextFromRect(rect)
{
    //build the plaintext
    var plaintext = "";
    for(var r=0; r<rect[0].length; r++)
    {
        for(var c=0; c<rect.length; c++)
        {
            plaintext += rect[c][r];
        }
    }

    return plaintext;
}

function decipher()
{   
    var ciphertext = cleanText(ciphertextArea.value);
    setUpKeyword();
    setUpPadding();

    if(keyword == null || keyword.length == 0 || ciphertext == "")
        return;

    //determine number of rows and columns
    var cols = keyword.length;
    var rows = Math.ceil(ciphertext.length / cols);

    textArray = fillArrayFromCiphertext(ciphertext, rows, cols);

    //sort it to be in the order of the keyword
    textArray.sort(function(a, b){  
        return keywordLocs[textArray.indexOf(a)] - keywordLocs[textArray.indexOf(b)];
    });

    console.log(textArray);

    //build the plaintext
    var plaintext = getPlainTextFromRect(textArray);


    plaintextArea.value = plaintext;

    createWorksheet();
}


function encipher()
{
    var plaintext = cleanText(plaintextArea.value);
    setUpKeyword();
    setUpPadding();

    if(keyword == null || keyword.length == 0 || plaintext == "")
        return;
    
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


//table just for giving a visualization when enciphering/deciphering
function createWorksheet()
{
    //delete the old one
    if(worksheetTable != null)
    {
        worksheetTable.parentNode.removeChild(worksheetTable);
    }

    worksheetTable = tableCreate(worksheetHeadings, textArray, 'worksheet');
    worksheetTable.style.width = Math.min(1200, keyword.length*40) + "px";
}

//createWorksheet();

////Solve Features////

//displays the "plaintext" result of the current rectangle
function displayResult()
{

}

//builds the worksheet table and adds dragging functionality
function createWorksheet2()
{
    //delete the old one
    if(worksheetTable2 != null)
    {
        worksheetTable2.parentNode.removeChild(worksheetTable2);
    }

    var numHeadings = [];
    for(var i=0; i<columnsValue; i++)
    {
        numHeadings.push(""+(i+1));
    }


    worksheetTable2 = tableCreate(numHeadings, textArray2, 'worksheet2');
    worksheetTable2.style.width = Math.min(1200, columnsValue*40) + "px";
    var dragger = tableDragger(worksheetTable2, {
        mode: 'column',
        dragHandler: '*',
    });

    //when elements reordered, update the result textbox
    dragger.on('drop',function(from, to){
        array_move(textArray2, from, to);
        resultArea.value = getPlainTextFromRect(textArray2);

    });

    dragger.on('drag',function(el,mode){
        //worksheetTable2.style.width = "100%";
        //worksheetTable2.parentNode.removeChild(worksheetTable2);
        document.body.style.padding = "0px";
        document.body.style.overflow = "auto";
    });
}


//generates the rect/worksheet to be dragged around, based on the number of cols
function generateRectFromSize(cols)
{
    console.log("generating worksheet...");

    var ciphertext = cleanText(ciphertextArea2.value);
    columnsValue = cols;
    var rows = Math.ceil(ciphertext.length / cols);

    textArray2 = fillArrayFromCiphertext(ciphertext, rows, cols);
    createWorksheet2();
    resultArea.value = getPlainTextFromRect(textArray2);

}


//genRectBtn.onclick = function(){generateRectFromCols()};


function createSizeButton(rows, cols)
{
    // 1. Create the button
    var button = document.createElement("button");
    button.innerHTML = rows + "x" + cols;
    button.className = "btn btn-light"
    button.style.margin = "5px";

    // 2. Append somewhere
    var body = document.getElementById("sizeButtons");
    body.appendChild(button);


    // 3. Add event handler
    button.addEventListener ("click", function() {
        generateRectFromSize(cols);
    });
}

//idk some magic that finds factors
const factors = number => Array
    .from(Array(number + 1), (_, i) => i)
    .filter(i => number % i === 0);

function findValidRectSizes()
{
    //remove previous buttons
    var buttonHolder = document.getElementById("sizeButtons");
    while(buttonHolder.firstChild) {
        buttonHolder.removeChild(buttonHolder.firstChild);
    }


    var ciphertext = cleanText(ciphertextArea2.value);

    var ctLength = ciphertext.length;

    //find teh factors
    var facts = factors(ctLength);

    //sort based on most "square" rectangles
    facts.sort(function(a,b){
        return Math.abs(a - ctLength/a) - Math.abs(b - ctLength/b);
    });

    for(var i=0; i<facts.length; i++)
    {
        createSizeButton(facts[i],ctLength/facts[i]);
    }

    console.log(facts);


}

var lastCipherText = "";

$("#ciphertextArea2").on("propertychange change keyup paste input", function(){
    if(lastCipherText != ciphertextArea2.value)
    {
        findValidRectSizes();
    }
    lastCipherText = ciphertextArea2.value;
});
