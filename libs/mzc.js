window.addEventListener("popstate", function (event){
    if (event.state) {
        var link = window.location
        showPPage(link) 
    }});
function rewind() {
    audioint = aid.replace('audio', '')
    name = queue[parseInt(audioint)]['name']
    author = queue[parseInt(audioint)]['author']
    cover = queue[parseInt(audioint)]['cover']
    url = queue[parseInt(audioint)]['url']
    ids = queue[parseInt(audioint)]['id']
    playMzcPlayer(name, cover, author, url, ids)
}
function forward() {
    if (parseInt(audio.duration) - (parseInt(audio.duration) - parseInt(audio.currentTime)) >= 5) {
        currenttime = 0
        audio.currentTime = 0
    }
    else {
        audio.pause()
        currenttime = 0
        audio.currentTime = 0
        isplay = 0
        audioint = aid.replace('audio', '')
        name = queue[parseInt(audioint) - 2]['name']
        author = queue[parseInt(audioint) - 2]['author']
        cover = queue[parseInt(audioint) - 2]['cover']
        url = queue[parseInt(audioint) - 2]['url']
        ids = queue[parseInt(audioint) - 2]['id']
        playMzcPlayer(name, cover, author, url, ids)
    }
}
function forwardl() {
    audioint = aid.replace('audio', '')
    name = queue[parseInt(audioint) - 2]['name']
    author = queue[parseInt(audioint) - 2]['author']
    cover = queue[parseInt(audioint) - 2]['cover']
    url = queue[parseInt(audioint) - 2]['url']
    ids = queue[parseInt(audioint) - 2]['id']
    playMzcPlayer(name, cover, author, url, ids)
}
function musicLike(audioid) {
    sendTo('/likesong/' + audioid)
    elemq = document.getElementById('like' + audioid).innerHTML
    if (elemq=='<i class="fa-regular fa-heart"></i>') {
        document.getElementById('like' + audioid).innerHTML = '<i class="fa-solid fa-heart"></i>'
    }
    else {
        document.getElementById('like' + audioid).innerHTML = '<i class="fa-regular fa-heart"></i>'
    }
}
function searchMusic(queq) {
    var http = createRequestObject();
    if( http )
    {
        http.open('get', '/action/search?value=' + queq);
        http.onreadystatechange = function ()
        {
            if(http.readyState == 4)
            {
                document.getElementById('search').innerHTML = http.responseText
            }
        }
        http.send(null);
    }
    else
    {
        document.location = url;
    }
}
function showPage(pageid) {
    var http = createRequestObject();
    if( http )
    {
        http.open('get', '/dyn' + pageid);
        http.onreadystatechange = function ()
        {
            if(http.readyState == 4)
            {
                document.getElementById('cont').innerHTML = http.responseText
                history.pushState({page: 1}, 'Loading...', pageid);
            }
        }
        http.send(null);
    }
    else
    {
        document.location = url;
    }
}
function showPPage(pageid) {
    var http = createRequestObject();
    if( http )
    {
        http.open('get', '/dyn' + pageid);
        http.onreadystatechange = function ()
        {
            if(http.readyState == 4)
            {
                document.getElementById('cont').innerHTML = http.responseText
            }
        }
        http.send(null);
    }
    else
    {
        document.location = url;
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
window.onload = function () {
    try {
        var input = document.getElementById("areas");
        input.addEventListener("keydown", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                searchMusic(input.value)
            }
        });
    }
    catch {}
}
