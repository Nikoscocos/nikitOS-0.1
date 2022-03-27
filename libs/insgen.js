console.log("Catware Insult-Generator Web-Application (tiny)");
console.log("Initializing interface depencies...")

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

console.log("httpGet: initialized.")

functon getIns() {
    document.getElementById('ins').innerHTML = httpGet("http://izzytopdevelop.pythonanywhere.com/");
}

console.log("getIns: initialized.")
console.log("CIGWAt ready!")
