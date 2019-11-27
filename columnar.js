

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


$('#testTable').DataTable( {
    colReorder: true
} );