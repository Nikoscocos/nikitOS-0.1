var openedwindows = 0
var cycleswindows = 0
var activewindow = ''
var activestart = 0
var appscount = 0
const windows = []
const windowstitles = []
const windowsheaders = []
const maximizedwindows = []
const normalwindows = []
const minimizedwindows = []
const windowslocations = []
const applist = []
const brapplist = []

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

function startNormal(appid, apptitle, appicon) {
    if (activestart == 1) {
        startMenu()
    }
    var http = createRequestObject();
    if( http )
    {
        http.open('get', '/app/' + appid);
        http.onreadystatechange = function ()
        {
            if(http.readyState == 4)
            {
                if (appicon.startsWith('fa')) {
                    appicon = '<i class="' + appicon + '" aria-hidden="true"></i>'
                }
                else {
                    appicon = '<img src="' + appicon + '" width="40" height="40">'
                }
                openWindow(apptitle, http.responseText, appicon)
            }
        }
        http.send(null);
    }
    else
    {
        document.location = link;
    }
}
function startCustom(appid, apptitle, appicon) {
    if (activestart == 1) {
        startMenu()
    }
    var http = createRequestObject();
    if( http )
    {
        http.open('get', '/app/' + appid);
        http.onreadystatechange = function ()
        {
            if(http.readyState == 4)
            {
                if (appicon.startsWith('fa')) {
                    appicon = '<i class="' + appicon + '" aria-hidden="true"></i>'
                }
                else {
                    appicon = '<img src="' + appicon + '" width="40" height="40">'
                }
                openCustomWindow(apptitle, http.responseText, appicon)
            }
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

function openWindow(wtitie, content, icon, maxwidth, maxheight) {
    openedwindows++;
    cycleswindows++;
    windowid = "window" + String(openedwindows);
    windowtid = wtitie + ' (' + windowid + ')'
    windowhid = "headerwindow" + String(openedwindows);
    suksuk = " ondblclick='maximizeWindow(" + '"' + windowid + '"' + ")'"
    closewin = " onclick='closeWindow(" + '"' + windowid + '"' + ")'"
    maxwin = " onclick='maximizeWindow(" + '"' + windowid + '"' + ")'"
    minwin = " onclick='minimizeWindow(" + '"' + windowid + '"' + ")'"
    windowidclc = "'" + windowid + "'"
    try {
        titleicon = icon.replace(/40/g, '17')
        icon = icon.replace(/40/g, '32')
    }
    catch {}
    elementto = '<div class="window" id="' + windowid + '" onmousedown="markWindow(' + windowidclc + ')">' + 
                '<div id="' + windowhid + '" ' + suksuk + ' class="windowheader">' + titleicon + '&nbsp;<b>' + wtitie + '</b><p ' + closewin + ' style="margin: auto; margin-right: 7px; margin-top: -20px; width: 10px; text-align: right;"> <i class="fa fa-window-close" aria-hidden="true"></i></p><p ' + maxwin + ' style="margin: auto; margin-right: 25px; margin-top: -21px; width: 10px; text-align: right;"> <i class="fa fa-window-maximize" aria-hidden="true"></i></p><p ' + minwin + ' style="margin: auto; margin-right: 43px; margin-top: -21px; width: 10px; text-align: right;"> <i class="fa fa-window-minimize" aria-hidden="true"></i></p></div><div class="windowblock">' 
                + content + '</div>' + '</div>';
    let div = document.createElement("div");
    div.innerHTML = elementto;
    document.body.append(div);
    if (maxwidth == undefined) {
        document.getElementById(windowid).style.maxWidth = "100%";
    }
    else {
        document.getElementById(windowid).style.maxWidth = maxwidth;
    }
    if (maxheight == undefined) {
        document.getElementById(windowid).style.maxHeight = "100%";
    }
    else {
        document.getElementById(windowid).style.maxHeight = maxheight;
    }
    document.getElementById(windowid).style.top = "20px";
    document.getElementById(windowid).style.left = "90px";
    windows.push(windowid);
    windowsheaders.push(windowhid);
    windowstitles.push(windowtid);
    normalwindows.push(windowid);
    if (activestart == 1) {
        startMenu()
    }
    else {}
    if (icon == undefined) {
        icon = '<i class="fa fa-window-maximize" aria-hidden="true"></i>'
    }
    else {}
    startWindows()
    addSidebarWindow(windowid, icon)
    markWindow(windowid)
    execute = "closeWindow('" + windowid + "')"
    addlog('Opened window: ' + windowid)
}
function openCustomWindow(wtitie, content, icon, maxwidth, maxheight) {
    openedwindows++;
    cycleswindows++;
    windowid = "window" + String(openedwindows);
    windowtid = wtitie + ' (' + windowid + ')'
    windowhid = "headerwindow" + String(openedwindows);
    suksuk = " ondblclick='maximizeWindow(" + '"' + windowid + '"' + ")'"
    closewin = " onclick='closeWindow(" + '"' + windowid + '"' + ")'"
    maxwin = " onclick='maximizeWindow(" + '"' + windowid + '"' + ")'"
    minwin = " onclick='minimizeWindow(" + '"' + windowid + '"' + ")'"
    windowidclc = "'" + windowid + "'"
    try {
        titleicon = icon.replace(/40/g, '17')
        icon = icon.replace(/40/g, '32')
    }
    catch {}
    elementto = '<div class="mywindow" id="' + windowid + '" onmousedown="markWindow(' + windowidclc + ')">' + 
                '<div id="' + windowhid + '" ' + suksuk + ' class="windowheader">' + titleicon + '&nbsp;<b>' + wtitie + '</b><p ' + closewin + ' style="margin: auto; margin-right: 7px; margin-top: -20px; width: 10px; text-align: right;"> <i class="fa fa-window-close" aria-hidden="true"></i></p><p ' + maxwin + ' style="margin: auto; margin-right: 25px; margin-top: -21px; width: 10px; text-align: right;"> <i class="fa fa-window-maximize" aria-hidden="true"></i></p><p ' + minwin + ' style="margin: auto; margin-right: 43px; margin-top: -21px; width: 10px; text-align: right;"> <i class="fa fa-window-minimize" aria-hidden="true"></i></p></div><div class="onwindowcontent">' 
                + content + '</div></div>' + '</div>';
    let div = document.createElement("div");
    div.innerHTML = elementto;
    document.body.append(div);
    document.getElementById(windowid).style.height = '320px';
    document.getElementById(windowid).style.top = "20px";
    document.getElementById(windowid).style.left = "90px";
    windows.push(windowid);
    windowsheaders.push(windowhid);
    windowstitles.push(windowtid);
    normalwindows.push(windowid);
    if (activestart == 1) {
        startMenu()
    }
    else {}
    if (icon == undefined) {
        icon = '<i class="fa fa-window-maximize" aria-hidden="true"></i>'
    }
    else {}
    startWindows()
    addSidebarWindow(windowid, icon)
    markWindow(windowid)
    execute = "closeWindow('" + windowid + "')"
    addlog('Opened window: ' + windowid)
}
function openQuestWindow(title, content, button) {
    openWindow(title, '<h4>'+ content + '</h4><hr><button onclick="' + execute +  '" class="button">' + button + '</button>')
}
function addSidebarWindow(windowid, icon) {
    checker = (windows.indexOf(windowid) != -1);
    if (checker==true) {
        target = document.getElementById('side');
        minwin = " onclick='minimizeWindow(" + '"' + windowid + '"' + ")'"
        sideobj = '<br id="br1' + windowid + '"><div id="app' + windowid + '" ' + minwin + ' class="sidebarapp">' + icon + '</div><br id="br2' + windowid + '">'
        target.innerHTML += sideobj;
    }
}
function activeSidebarWindow(windowid) {
    checker = (windows.indexOf(windowid) != -1);
    if (checker==true) {
        wid = 'app' + windowid
        target = document.getElementById(wid);
        target.style.backgroundColor = "rgba(61, 60, 60, 0.589)";
    }
    else {}
}
function removeActiveSidebarWindow(windowid) {
    checker = (windows.indexOf(windowid) != -1);
    if (checker==true) {
        wid = 'app' + windowid
        target = document.getElementById(wid);
        target.style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
    else {}
}
function activeDefaultSidebarWindow(windowid) {
    target = document.getElementById(windowid);
    target.style.backgroundColor = "rgba(61, 60, 60, 0.589)";
}
function removeDefaultActiveSidebarWindow(windowid) {
    target = document.getElementById(windowid);
    target.style.backgroundColor = "rgba(0, 0, 0, 0)";
}
function removeSidebarWindow(windowid) {
    try {
        wid = 'app' + windowid
        wbr1 = 'br1' + windowid
        wbr2 = 'br2' + windowid
        target = document.getElementById(wid);
        target.remove()
        target = document.getElementById(wbr1);
        target.remove()
        target = document.getElementById(wbr2);
        target.remove()
    }
    catch(e) {alert(e)}
}
function startMenu() {
    var startcontent = ''
    target = document.getElementById('startmenu');
    if (activestart == 1) {
        addlog('Closed start menu')
        activestart = 0
        document.getElementById('startmenu').style.display = "none";
    }
    else {
        document.getElementById('startmenu').style.display = "block";
        activestart = 1
        target.innerHTML += startcontent
        reMarkWindow(1)
        addlog('Opened start menu')
    }
}
function closeWindow(windowid) {
    checker = (windows.indexOf(windowid) != -1);
    if (checker==true) {
        const target = document.getElementById(windowid);
        target.style.transition = '0.2s'
        target.style.opacity = '0'
        target.addEventListener('transitionend', () => target.remove());
        removeSidebarWindow(windowid)
        addlog('Closed window: ' + windowid)
        for (let i = windows.length - 1; i >= 0; i--) {
            try {
                if(windows[i].includes(windowid)) {
                    delete windows[i]
                }
            }
            catch(e) {}
        }
        for (let i = windowstitles.length - 1; i >= 0; i--) {
            try {
                if(windowstitles[i].includes(windowid)) {
                    delete windowstitles[i]
                }
            }
            catch(e) {}
        }
        for (let i = windowslocations.length - 1; i >= 0; i--) {
            try {
                if(windowslocations[i].includes(windowid + "[QQWWDDFFVVCCSS::LLKKJJHH]")) {
                    delete windowslocations[i]
                }
                else {}
            }
            catch(e) {}
        }
    }
    else {
        return null;
    }
}
function maximizeWindow(windowid) {
    checker = (windows.indexOf(windowid) != -1);
    if (checker==true) {
        checker = (maximizedwindows.indexOf(windowid) != -1);
        if (checker==false) {
            for (let i = normalwindows.length - 1; i >= 0; i--) {
                try {
                    if(normalwindows[i].includes(windowid)) {
                        delete normalwindows[i]
                        windowx = document.getElementById(windowid).style.top;
                        windowy = document.getElementById(windowid).style.left;
                        windowwidth = document.getElementById(windowid).style.width;
                        windowheight = document.getElementById(windowid).style.height;
                        document.getElementById(windowid).style.top = '0px';
                        document.getElementById(windowid).style.left = '60px';
                        document.getElementById(windowid).style.height = '100%';
                        document.getElementById(windowid).style.width = 'calc(100% - 60px)';
                        document.getElementById(windowid).style.borderRadius = '0px';
                        document.getElementById('header'+windowid).style.borderRadius = '0px';
                        addlog('Maximized window: ' + windowid)
                        windowloc = windowid + "[QQWWDDFFVVCCSS::LLKKJJHH]" + windowx + 
                        "[QQWWDDFFVVCCSS::LLKKJJHH]" + windowy + "[QQWWDDFFVVCCSS::LLKKJJHH]"
                        + windowwidth + "[QQWWDDFFVVCCSS::LLKKJJHH]" + windowheight;
                        maximizedwindows.push(windowid);
                        windowslocations.push(windowloc);
                    }
                }
                catch(e) {}
            }
        }
        else {
            for (let i = maximizedwindows.length - 1; i >= 0; i--) {
                try {
                    var xys = ""
                    for (let i = windowslocations.length - 1; i >= 0; i--) {
                        try {
                            if(windowslocations[i].includes(windowid + "[QQWWDDFFVVCCSS::LLKKJJHH]")) {
                                xys = windowslocations[i]
                                delete windowslocations[i]
                            }
                        }
                        catch(e) {}
                    }
                    if(maximizedwindows[i].includes(windowid)) {
                        delete maximizedwindows[i]
                        windowtop = xys.split('[QQWWDDFFVVCCSS::LLKKJJHH]')[1]
                        windowleft = xys.split('[QQWWDDFFVVCCSS::LLKKJJHH]')[2]
                        windoww = xys.split('[QQWWDDFFVVCCSS::LLKKJJHH]')[3]
                        windowh = xys.split('[QQWWDDFFVVCCSS::LLKKJJHH]')[4]
                        addlog('Normalized window: ' + windowid)
                        document.getElementById(windowid).style.top = windowtop;
                        document.getElementById(windowid).style.left = windowleft;
                        document.getElementById(windowid).style.width = windoww;
                        document.getElementById(windowid).style.height = windowh;
                        document.getElementById(windowid).style.borderRadius = '10px';
                        document.getElementById('header'+windowid).style.borderRadius = '10px 10px 0px 0px';
                        normalwindows.push(windowid);
                    }
                }
                catch(e) {}
            }
        }
    }
    else {
        return null;
    }
}
function minimizeWindow(windowid) {
    checker = (windows.indexOf(windowid) != -1);
    if (checker==true) {
        checker = (minimizedwindows.indexOf(windowid) != -1);
        if (checker==false) {
            for (let i = normalwindows.length - 1; i >= 0; i--) {
                try {
                    if(normalwindows[i].includes(windowid)) {
                        if (normalwindows[i] == activewindow) {
                            delete normalwindows[i]
                            document.getElementById(windowid).style.display = 'none';
                            addlog('Minimized window: ' + windowid)
                            removeActiveSidebarWindow(windowid)
                            minimizedwindows.push(windowid);
                        }
                        else {
                            markWindow(windowid)
                        }
                    }
                }
                catch(e) {}
            }
            for (let i = maximizedwindows.length - 1; i >= 0; i--) {
                try {
                    if(maximizedwindows[i].includes(windowid)) {
                        if (maximizedwindows[i] == activewindow) {
                            delete maximizedwindows[i]
                            document.getElementById(windowid).style.display = 'none';
                            removeActiveSidebarWindow(windowid)
                            minimizedwindows.push(windowid);
                        }
                        else {
                            markWindow(windowid)
                        }
                    }
                }
                catch(e) {}
            }
        }
        else {
            for (let i = minimizedwindows.length - 1; i >= 0; i--) {
                try {
                    if(minimizedwindows[i].includes(windowid)) {
                        delete minimizedwindows[i]
                        if (activestart == 1) {
                            startMenu()
                        }
                        else {}
                        document.getElementById(windowid).style.display = 'block';
                        addlog('Normalized window: ' + windowid)
                        normalwindows.push(windowid);
                        markWindow(windowid)
                    }
                }
                catch(e) {}
            }
        }
    }
    else {
        return null;
    }
}
function minimizeDefWindow(windowid) {
    checker = (windows.indexOf(windowid) != -1);
    if (checker==true) {
        checker = (minimizedwindows.indexOf(windowid) != -1);
        if (checker==false) {
            for (let i = normalwindows.length - 1; i >= 0; i--) {
                try {
                    if(normalwindows[i].includes(windowid)) {
                        delete normalwindows[i]
                        document.getElementById(windowid).style.display = 'none';
                        removeActiveSidebarWindow(windowid)
                        minimizedwindows.push(windowid);
                    }
                }
                catch(e) {}
            }
        }
        else {}
    }
    else {
        return null;
    }
}
function dragWindow(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("header" + elmnt.id)) {
      document.getElementById("header" + elmnt.id).ontouchstart = function() {
        document.getElementById("header" + elmnt.id).ontouchmove = dragMouseDown;
      }
      document.getElementById("header" + elmnt.id).onmousedown = dragMouseDown;
    } else {alert(elmnt)}
  
    function dragMouseDown(e) {
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;
      if (pos3==undefined) {
        pos3 = e.touches[0].clientX;
      }
      if (pos4==undefined) {
        pos4 = e.touches[0].clientY;
      }
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      if (pos3==undefined) {
        pos3 = e.touches[0].clientX;
        pos1 = pos3 - e.touches[0].clientX;
      }
      if (pos4==undefined) {
        pos4 = e.touches[0].clientY;
        pos2 = pos4 - e.touches[0].clientY;
      }
      windowid = elmnt.id
      if (document.getElementById(windowid).style.width == "calc(100% - 60px)") {
        if (document.getElementById(windowid).style.height == "100%") {
            var xys = ""
            for (let i = windowslocations.length - 1; i >= 0; i--) {
                try {
                    if(windowslocations[i].includes(windowid + "[QQWWDDFFVVCCSS::LLKKJJHH]")) {
                        xys = windowslocations[i]
                        delete windowslocations[i]
                        for (let i = maximizedwindows.length - 1; i >= 0; i--) {
                            try {
                                if(maximizedwindows[i].includes(windowid)) {
                                    delete maximizedwindows[i]
                                    windowtop = xys.split('[QQWWDDFFVVCCSS::LLKKJJHH]')[1]
                                    windowleft = xys.split('[QQWWDDFFVVCCSS::LLKKJJHH]')[2]
                                    windoww = xys.split('[QQWWDDFFVVCCSS::LLKKJJHH]')[3]
                                    windowh = xys.split('[QQWWDDFFVVCCSS::LLKKJJHH]')[4]
                                    document.getElementById(windowid).style.top = e.clientY + "px";
                                    document.getElementById(windowid).style.left = e.clientX + "px";
                                    document.getElementById(windowid).style.width = windoww;
                                    document.getElementById(windowid).style.height = windowh;
                                    document.getElementById(windowid).style.borderRadius = '10px';
                                    document.getElementById('header'+windowid).style.borderRadius = '10px 10px 0px 0px';
                                    normalwindows.push(windowid);
                                }
                                else {}
                            }
                            catch(e) {}
                        }
                    }
                }
                catch(e) {}
            checker = (maximizedwindows.indexOf(windowid) != -1);
            if (checker==true) {
                for (let i = maximizedwindows.length - 1; i >= 0; i--) {
                    try {
                        if(maximizedwindows[i].includes(windowid)) {
                            delete maximizedwindows[i]
                            normalwindows.push(windowid);
                        }
                    }
                    catch(e) {}
                }
            }
            else {}
        }
        }
      }
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
}
function startWindows() {
    for (let i = 0; i < windows.length; i += 1) {
        try {
            dragWindow(document.getElementById((windows[i])))
        }
        catch(e) {}
    }
}
function markWindow(windowid) {
    for (let i = 0; i < windows.length; i += 1) {
        try {
            document.getElementById(windows[i]).style.boxShadow = '0 0 0px rgba(0,0,0,0.5)';
            removeActiveSidebarWindow(windows[i])
        }
        catch(e) {}
    }
    if (activestart == 1) {
        startMenu()
    }
    else {}
    document.getElementById(windowid).style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    cycleswindows++;
    document.getElementById(windowid).style.zIndex = cycleswindows;
    headerid = 'header' + windowid
    document.getElementById(headerid).style.color = 'black';
    activewindow = windowid
    activeSidebarWindow(windowid)
}
function reMarkWindow(windowid) {
    for (let i = 0; i < windows.length; i += 1) {
        try {
            document.getElementById(windows[i]).style.boxShadow = '0 0 0px rgba(0,0,0,0.5)';
            removeActiveSidebarWindow(windows[i])
        }
        catch(e) {}
    }
}
function closeAllWindows() {
    for (let i = 0; i < windows.length; i += 1) {
        try {
            closeWindow(windows[i]);
        }
        catch(e) {}
    }
}
function minimizeAllWindows() {
    for (let i = 0; i < windows.length; i += 1) {
        try {
            minimizeDefWindow(windows[i]);
        }
        catch(e) {}
    }
}
function preloader() {
    let div = document.createElement('div');
    div.setAttribute("id", "preloader");
    div.className = "preloader";
    div.innerHTML = '<br><br><br><br><br><br><br><br><br><br><br><img style="display: none;" class="suk" onload="stopPreloader()" src="https://raw.githubusercontent.com/Nikoscocos/nikitOS/main/images/wallpaper.jpg" width="100" height="100" alt=""><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i> <h2><b>nikitOS</b></h1>';
    document.body.append(div);
}

function stopPreloader() {
    const target = document.getElementById("preloader");
    setTimeout(() => { target.style.opacity = '0' }, 1500);    
    target.addEventListener('transitionend', () => target.remove());
    startTaskbar()
}
function startTaskbar() {
    let div = document.createElement('div');
    div.innerHTML = '<div id="side" class="sidebar"><div id="startbtn" onclick="startMenu()" style="margin-top: 0px;" class="sidebarwwapp"><i class="fa fa-th-large" aria-hidden="true"></i></div><br><div class="sidebardate" id="sidebar"><b></b></div><div onclick="minimizeAllWindows()" class="sidebardate1"></div></div>'
    div.style.height = '100%'
    div.style.width = '60px'
    document.body.append(div)
    setInterval(function () {
        document.getElementById('sidebar').innerHTML = sidebardater();
    }, 1000);
}
function reload() {
    closeAllWindows()
    preloader()
}
function zero_first_format(value)
    {
        if (value < 10)
        {
            value='0'+value;
        }
        return value;
    }

    /* функция получения текущей даты и времени */
    function sidebardater()
    {
        var current_datetime = new Date();
        var day = zero_first_format(current_datetime.getDate());
        var month = zero_first_format(current_datetime.getMonth()+1);
        var year = current_datetime.getFullYear();
        var hours = zero_first_format(current_datetime.getHours());
        var minutes = zero_first_format(current_datetime.getMinutes());
        var seconds = zero_first_format(current_datetime.getSeconds());

        return hours+":"+minutes+"<br>"+day+"."+month+"."+year;
    }
    try {
        document.getElementById('curtime').innerHTML = date_time();
    }
    catch(e) {}
function addlog(logtext) {
    return false;
}
window.onload = preloader()
