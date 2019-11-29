export function tableCreate(headerData, data){
    var body = document.getElementById('worksheet');
    var tbl  = document.createElement('table');
    tbl.className = 'display table table-sm';
    tbl.id = 'worksheet';

    //create the header
    var header = tbl.createTHead();
    header.className = "thead-dark";
    var hrow = header.insertRow(0);    
    for(var cols=0; cols<headerData.length; cols++)
    {
        var cell = document.createElement("th");
        cell.innerHTML = headerData[cols];
        hrow.appendChild(cell);
    }

    var tbody = tbl.createTBody();
    for(var r = 0; r < data[0].length; r++)
    {
        var tr = tbody.insertRow();
        for(var c = 0; c < data.length; c++)
        {
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(data[c][r]));
        }
    }
    body.appendChild(tbl);

    return tbl;
}
/*export function tableCreate(header, data){
    var body = document.getElementById('worksheet');
    var tbl  = document.createElement('table');
    tbl.className = 'display table';
    tbl.id = 'worksheet';

    //create the header
    var header = tbl.createTHead();
    header.className = "thead-dark";
    var hrow = header.insertRow(0);    
    for(var cols=0; cols<header.length; cols++)
    {
        var cell = document.createElement("th");
        cell.innerHTML = header[cols];
        hrow.appendChild(cell);
    }

    var tbody = tbl.createTBody();
    for(var r = 0; r < data[0].length; r++)
    {
        var tr = tbody.insertRow();
        for(var c = 0; c < data.length; c++)
        {
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(data[c][r]));
        }
    }
    body.appendChild(tbl);

    return tbl;
}*/
