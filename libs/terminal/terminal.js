window.onload = function () {
    var input = document.getElementById("input");
    input.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            command(input.value)
        }
    });
};
function command(command) {
    var http = createRequestObject();
    if( http )
    {
        http.open('get', '/action/terminal?value=' + command);
        http.onreadystatechange = function ()
        {
            if(http.readyState == 4) {
                document.getElementById('input').value = ''
                if ((http.responseText).startsWith('js[trm:]')) {
                    eval((http.responseText).split('[trm:]')[1])
                    document.getElementById('text').innerHTML += 'user@server:~$ ' + command + '<br>'
                    document.getElementById('textinput').style.display = 'block'
                    document.body.scrollTop = document.body.scrollHeight;
                }
                else {
                    addcontent(http.responseText, command)   
                }
            }
        }
        http.send(null);
    }
    else {}
}
function clear() {
    document.getElementById('text').innerHTML = ''
}
function addcontent(content, value) {
    document.getElementById('textinput').style.display = 'none'
    document.getElementById('text').innerHTML += 'user@server:~$ ' + value + '<br>'
    if (content.endsWith('<br>')) {
        document.getElementById('text').innerHTML += content    
    }
    else {
        document.getElementById('text').innerHTML += content + '<br>' 
    }
    document.getElementById('textinput').style.display = 'block'
    document.body.scrollTop = document.body.scrollHeight;
}
function createRequestObject()
{
    try { return new XMLHttpRequest() }
    catch(e)
    {
        try { return new ActiveXObject('Msxml2.XMLHTTP') }
        catch(e)
        {
            try { return new ActiveXObject('Microsoft.XMLHTTP') }
            catch(e) { return null; }
        }
    }
}
