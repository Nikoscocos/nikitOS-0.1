window.onload = function () {
    var input = document.getElementById("input");
    input.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            command(input.value)
        }
    });
};
function bottom() {
    if (window.innerHeight <= document.body.scrollHeight) {
        window.scrollTo(pageXOffset, document.body.scrollHeight);
    }
    else {}
}
function command(command) {
    if (command != '') {
        var http = createRequestObject();
        if( http )
        {
            http.open('get', '/action/terminal?value=' + command);
            http.onreadystatechange = function ()
            {
                if(http.readyState == 4) {
                    document.getElementById('input').value = ''
                    if ((http.responseText).startsWith('js[trm:]')) {
                        scrloadq = (http.responseText).split('[trm:]')[1]
                        try { eval(scrloadq) }
                        catch {}
                        if (scrloadq!='clear()') {
                            document.getElementById('text').innerHTML += document.getElementById('srvtxt').innerHTML + ' ' + command + '<br>'   
                        }
                        document.getElementById('textinput').style.display = 'flex'
                        bottom()
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
    else {
        document.getElementById('input').value = ''
        document.getElementById('text').innerHTML += document.getElementById('srvtxt').innerHTML + ' ' + command + '<br>'
        document.getElementById('textinput').style.display = 'flex'
        bottom()
    }
}
function clear() {
    document.getElementById('text').innerHTML = ''
}
function addcontent(content, value) {
    document.getElementById('textinput').style.display = 'none'
    document.getElementById('text').innerHTML += document.getElementById('srvtxt').innerHTML + ' ' + value + '<br>'
    if (content.endsWith('<br>')) {
        document.getElementById('text').innerHTML += content    
    }
    else {
        document.getElementById('text').innerHTML += content + '<br>' 
    }
    document.getElementById('textinput').style.display = 'flex'
    bottom()
}
function setVar(name, value) {
    var http = createRequestObject();
    if( http )
    {
        http.open('get', '/setvar/?varname=' + name + '&value=' + value);
        http.onreadystatechange = function ()
        {
            if(http.readyState == 4) {}
        }
        http.send(null);
    }
    else
    {
        document.location = link;
    }
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
