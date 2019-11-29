export function tableCreate(){
    var body = document.getElementById('worksheet');
    var tbl  = document.createElement('table');
    tbl.className = 'display table';
    tbl.id = 'worksheet';

    //create the header
    var header = tbl.createTHead();
    header.className = "thead-dark";
    var hrow = header.insertRow(0);    
    for(var cols=0; cols<6; cols++)
    {
        var cell = document.createElement("th");
        cell.innerHTML="s";
        hrow.appendChild(cell);
    }

    var tbody = tbl.createTBody();
    for(var i = 0; i < 5; i++)
    {
        var tr = tbody.insertRow();
        for(var j = 0; j < 6; j++)
        {
            var td = tr.insertCell();
            td.appendChild(document.createTextNode('a'));
        }
    }
    body.appendChild(tbl);

    return tbl;
}
