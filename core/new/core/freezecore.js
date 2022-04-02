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
const apps = ['Clock//<i class="fa fa-angle-double-right" aria-hidden="true"></i>//clockApp()', 
              'Robots//<i class="fa fa-user-times" aria-hidden="true"></i>//randhumanApp()',
              'Console//<i class="fa fa-terminal" aria-hidden="true"></i>//consoleApp()',
              'Logger//<i class="fa fa-times-circle" aria-hidden="true"></i>//loggerApp()',
              'Settings//<i class="fa fa-cog" aria-hidden="true"></i>//settingApp()',
              'WinCode//<i class="fa fa-code" aria-hidden="true"></i>//newwindowApp()',
              'VSCode//<img src="icons/vscode.png" width="40" height="40">//vscodeApp()',
              'Pshop//<img src="icons/photo.jpg" width="40" height="40">//PhotoShopApp()',
              'Python//<img src="icons/py.png" width="40" height="40">//pyshellApp()',
              'Mine//<img src="icons/minecraft.ico" width="40" height="40">//minecraftApp()',
              'Terraria//<img src="icons/terraria.jpg" width="40" height="40">//terrariaApp()',
              'SubSerf//<img src="icons/run.jpg" width="40" height="40">//rungameApp()',
              'Shuter//<img src="icons/shuter.png" width="40" height="40">//shuter3dApp()',
              'Conte//<img src="icons/connection.png" width="40" height="40">//connectionApp()',
              'Music//<img src="icons/music.png" width="40" height="40">//musicApp()']

              //'<img src="icons/race.jpg" width="32" height="32">'PhotoShopApp()

function openWindow(wtitie, content, icon, maxwidth, maxheight) {
    openedwindows++;//че то с переменными
    cycleswindows++;//че то с переменными
    windowid = "window" + String(openedwindows);//винлоу айди
    windowtid = wtitie + ' (' + windowid + ')'//переменная
    windowhid = "headerwindow" + String(openedwindows);
    suksuk = " ondblclick='maximizeWindow(" + '"' + windowid + '"' + ")'"//переменная
    closewin = " onclick='closeWindow(" + '"' + windowid + '"' + ")'"//переменная
    maxwin = " onclick='maximizeWindow(" + '"' + windowid + '"' + ")'"//переменная
    minwin = " onclick='minimizeWindow(" + '"' + windowid + '"' + ")'"//переменная
    windowidclc = "'" + windowid + "'"//переменная
    elementto = '<div class="window" id="' + windowid + '" onmousedown="markWindow(' + windowidclc + ')">' + 
                '<div id="' + windowhid + '" ' + suksuk + ' class="windowheader">'+icon.replace(/32/g,"19")+'<b>     ' + wtitie + '</b><p ' + closewin + ' style="margin: auto; margin-right: 7px; margin-top: -20px; width: 10px; text-align: right;"> <i class="fa fa-window-close" aria-hidden="true"></i></p><p ' + maxwin + ' style="margin: auto; margin-right: 25px; margin-top: -21px; width: 10px; text-align: right;"> <i class="fa fa-window-maximize" aria-hidden="true"></i></p><p ' + minwin + ' style="margin: auto; margin-right: 43px; margin-top: -21px; width: 10px; text-align: right;"> <i class="fa fa-window-minimize" aria-hidden="true"></i></p></div><div class="windowblock">' 
                + content + '</div>' + '</div>';//переменная
    let div = document.createElement("div");//создаем див
    div.innerHTML = elementto;//редачим див
    document.body.append(div);//переменнаядобавляем див в боди
    if (maxwidth == undefined) {
        document.getElementById(windowid).style.maxWidth = "100%";
    }
    else {
        document.getElementById(windowid).style.maxWidth = maxwidth;
    }
    //макс размер онка
    if (maxheight == undefined) {
        document.getElementById(windowid).style.maxHeight = "100%";
    }
    else {
        document.getElementById(windowid).style.maxHeight = maxheight;
    }
    //макс размер окна
    document.getElementById(windowid).style.top = "20px";// место создания
    document.getElementById(windowid).style.left = "90px";//место зоздания
    windows.push(windowid);//добавляем в масив вин айди
    windowsheaders.push(windowhid);//добавляем в масив вин айди
    windowstitles.push(windowtid);//добавляем в масив вин айди
    normalwindows.push(windowid);//добавляем в масив вин айди
    if (activestart == 1) {
        startMenu()//открытие панели
    }
    else {}
    if (icon == undefined) {
        icon = '<i class="fa fa-window-maximize" aria-hidden="true"></i>'
    }//иконка
    else {}
    startWindows()//движение окна
    addSidebarWindow(windowid, icon)//добавление на боковую панель наверн
    markWindow(windowid)//не ебу походу выделят окно тенью
    execute = "closeWindow('" + windowid + "')"//АКАК ВЫЙТИ
    addlog('Opened window: ' + windowid)//лог
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
    elementto = '<div class="mywindow" id="' + windowid + '" onmousedown="markWindow(' + windowidclc + ')">' + 
                '<div id="' + windowhid + '" ' + suksuk + ' class="windowheader">'+icon.replace(/32/g,"19")+'<b>     ' + wtitie + '</b><p ' + closewin + ' style="margin: auto; margin-right: 7px; margin-top: -20px; width: 10px; text-align: right;"> <i class="fa fa-window-close" aria-hidden="true"></i></p><p ' + maxwin + ' style="margin: auto; margin-right: 25px; margin-top: -21px; width: 10px; text-align: right;"> <i class="fa fa-window-maximize" aria-hidden="true"></i></p><p ' + minwin + ' style="margin: auto; margin-right: 43px; margin-top: -21px; width: 10px; text-align: right;"> <i class="fa fa-window-minimize" aria-hidden="true"></i></p></div><div class="onwindowcontent">' 
                + content + '</div></div>' + '</div>';
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
    document.getElementById(windowid).style.height = "501px";
    windows.push(windowid);
    windowsheaders.push(windowhid);
    windowstitles.push(windowtid);
    normalwindows.push(windowid);
    if (activestart == 1) {
        startMenu()//открытие панели
    }
    else {}
    if (icon == undefined) {
        icon = '<i class="fa fa-window-maximize" aria-hidden="true"></i>'
    }//иконка
    else {}
    startWindows()//движение окна
    addSidebarWindow(windowid, icon)//добавление на боковую панель наверн
    markWindow(windowid)//не ебу походу выделят окно тенью
    execute = "closeWindow('" + windowid + "')"//АКАК ВЫЙТИ
    addlog('Opened window: ' + windowid)//лог
}
function openAppWindow(wtitie, content, maxwidth, maxheight) {
    openedwindows++;
    cycleswindows++;
    windowid = "window" + String(openedwindows);
    windowtid = wtitie + ' (' + windowid + ')'
    windowhid = "headerwindow" + String(openedwindows);
    suksuk = " ondblclick='maximizeWindow(" + '"' + windowid + '"' + ")'"
    windowidclc = "'" + windowid + "'"
    elementto = '<div class="window" id="' + windowid + '" onmousedown="markWindow(' + windowidclc + ')">' + 
                '<div id="' + windowhid + '" ' + suksuk + ' class="windowheader"><b>' + wtitie + '</b><p style="margin: auto; margin-right: 7px; margin-top: -20px; width: 10px; text-align: right;"> <i class="fa fa-window-close" aria-hidden="true"></i></p><p style="margin: auto; margin-right: 25px; margin-top: -21px; width: 10px; text-align: right;"> <i class="fa fa-window-maximize" aria-hidden="true"></i></p><p style="margin: auto; margin-right: 43px; margin-top: -21px; width: 10px; text-align: right;"> <i class="fa fa-window-minimize" aria-hidden="true"></i></p></div><div class="windowblock">' 
                + content + '</div>' + '</div>';
    let div = document.createElement("div");
    div.innerHTML = elementto;
    document.body.append(div);
    document.getElementById(windowid).style.top = "20px";
    document.getElementById(windowid).style.left = "90px";
    document.getElementById(windowid).style.maxWidth = maxwidth;
    document.getElementById(windowid).style.maxHeight = maxheight;
    windows.push(windowid);
    windowsheaders.push(windowhid);
    windowstitles.push(windowtid);
    normalwindows.push(windowid);
    startWindows()
    markWindow(windowid)
    execute = "closeWindow('" + windowid + "')"
}
function openQuestWindow(title, content, button) {
    openWindow(title, '<h4>'+ content + '</h4><hr><button onclick="' + execute +  '" class="button">' + button + '</button>')
}
function addSidebarWindow(windowid, icon) {
    checker = (windows.indexOf(windowid) != -1);
    if (checker==true) {
        target = document.getElementById('side');
        minwin = " onclick='minimizeWindow(" + '"' + windowid + '"' + ")'"
        sideobj = '<br id="br1' + windowid + '"><div id="app' + windowid + '" oncontextmenu=win_contecst("'+windowid+'");' + minwin + ' class="sidebarapp">' + icon + '</div><br id="br2' + windowid + '">'
        target.innerHTML += sideobj;
    }
}
//
//
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
        for (let i = 0; i < applist.length; i += 1) {
            try {
                document.getElementById(applist[i]).remove()
            }
            catch(e) {}
        }
        for (let i = 0; i < brapplist.length; i += 1) {
            try {
                document.getElementById(brapplist[i]).remove()
            }
            catch(e) {}
        }
        addlog('Closed start menu')
        activestart = 0
        document.getElementById('startmenu').style.display = "none";
    }
    else {
        var countapps = 0
        var coreapp = 0
        for (let i = 0; i < apps.length; i += 1) {
            try {
                app = apps[i]
                countapps++;
                appid = "app" + String(countapps)
                brid = "br" + String(countapps)
                appname = app.split('//')[0]
                appicon = app.split('//')[1]
                appstart = app.split('//')[2]
                appcontent = '<div onclick="' + appstart +'" class="suk" id="' + appid + '">' + appicon + '</i>' + 
                             appname + '</div>'
                if (countapps == 3) {
                    countapps = 0
                    appcontent += '<br id="' + brid + '">'
                }
                applist.push(appid)
                brapplist.push(brid)
                startcontent += appcontent
            }
            catch(e) {}
        }
        document.getElementById('startmenu').style.display = "block";
        activestart = 1
        appscount = countapps
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
      document.getElementById("header" + elmnt.id).onmousedown = dragMouseDown;
    } else {alert(elmnt)}
  
    function dragMouseDown(e) {
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
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
    try{
    document.getElementById(headerid).style.color = 'black';}
    catch(e) {}
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
    div.innerHTML = '<br><br><br><br><br><br><br><br><br><br><br><img style="display: none;" class="suk" onload="stopPreloader()" src="images/wallpaper.jpg" width="100" height="100" alt=""><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i> <h2><b>NikitOS</b></h1>';
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
window.onload = preloader()

/* Apps */
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

function clockAppBackend(value)
    {
        if (value < 10)
        {
            value='0'+value;
        }
        return value;
    }

    /* функция получения текущей даты и времени */
    function date_time()
    {
        var current_datetime = new Date();
        var day = zero_first_format(current_datetime.getDate());
        var month = zero_first_format(current_datetime.getMonth()+1);
        var year = current_datetime.getFullYear();
        var hours = zero_first_format(current_datetime.getHours());
        var minutes = zero_first_format(current_datetime.getMinutes());
        var seconds = zero_first_format(current_datetime.getSeconds());

        return "<h4><b>"+day+"."+month+"."+year+"</b></h4>"+"<hr><h1 style='color: gray;'><b>"+hours+":"+minutes+":"+seconds+"</h1></b>";
    }
    try {
        document.getElementById('curtime').innerHTML = date_time();
    }
    catch(e) {}

function clockApp() {
    icon = '<i class="fa fa-clock-o" aria-hidden="true"></i>'
    appcontents = '<h3 id="curtime"></h3>';
    openWindow('Clock App', appcontents, icon)
    setInterval(function () {
        try {
            document.getElementById('curtime').innerHTML = date_time();
        }
        catch(e) {}
    }, 1000);
}
function randhumanApp() {
    icon = '<i class="fa fa-user-times" aria-hidden="true"></i>'
    appcontents = '<img id="photo" src="https://thispersondoesnotexist.com/image" width="100%" height="300px">';
    openWindow('Robots', appcontents, icon)
}
function consoleApp() {
    icon = '<i class="fa fa-terminal" aria-hidden="true"></i>'
    appcontents = '<div id="logplace" class="consoleblock"></div>' + '<input placeholder="Command" id="cmdinput" class="consoleinput"></input>' + 
                  '<button onclick="executeCommand()" type="submit" id="cmdbutton" style="margin-left: 5px;" class="button"><i class="fa fa-angle-double-right" aria-hidden="true"></i></button>';
    openWindow('Console', appcontents, icon)
}
function executeCommand() {
    command = document.getElementById('cmdinput').value
    try {
        window.eval(command)
        document.getElementById('logplace').innerHTML = "<b>Success executed:</b><br>" + command
    }
    catch(e) {
        document.getElementById('logplace').innerHTML = "<b>Execute error:</b><br>" + e
    }
    document.getElementById('cmdinput').value = "";
}
function loggerApp() {
    icon = '<i class="fa fa-times-circle" aria-hidden="true"></i>'
    appcontents = '<div id="logadd"></div>';
    openWindow('Logger', appcontents, icon, '300px', '300px')
}
function addlog(logtext) {
    try {
        document.getElementById('logadd').innerHTML += "<b>[LOG]</b> " + logtext + '<br>'
        document.getElementById('logadd').lastChild.scrollIntoView(false)
    }
    catch(e) {}
}
function aboutApp() {
    icon = '<i class="fa fa-cubes" aria-hidden="true"></i>'
    appcontents = '<h1>nikitOS 0.2 Alpha</h1><h4><hr>For questions: @nikit0s4 (VK)</b><br>It is written on JavaScript.<br>Worked on FreezeCore GUI</h4><h5><hr>Designed by <b>Nikoscocos Ltd.</b><br>All rights reversed.</h5>';
    openWindow('About nikitOS', appcontents, icon, '350px', 'auto')
}
function minecraftApp() {
    icon = '<img src="icons/minecraft.ico" width="32" height="32">'
    appcontents = '<iframe src="https://classic.minecraft.net/" width="100%" height="100%"></iframe>';
    openCustomWindow('Minecraft', appcontents, icon)
}
function vscodeApp() {
    icon = '<img src="icons/vscode.png" width="32" height="32">'
    appcontents = '<iframe src="https://vscode.dev/"></iframe>';
    openCustomWindow('Visual Studio Code', appcontents, icon)
}
function musicApp() {
    icon = '<img src="icons/music.png" width="32" height="32">'
    appcontents = '<iframe src="https://europaplus.ru/" width="100%" height="100%"></iframe>';
    openCustomWindow('Music', appcontents, icon)
}
function connectionApp() {
    icon = '<img src="icons/connection.png" width="32" height="32">'
    appcontents = '<iframe src="https://js13kgames.com/games/connection/index.html" width="100%" height="100%"></iframe>';
    openCustomWindow('Conte', appcontents, icon)
}
function fontEdit1() {
    document.body.style.background = 'url(images/wallpaper.jpg) no-repeat'
    document.body.style.backgroundSize='100%';
}
function fontEdit2() {
    document.body.style.background = 'url(images/wallpaper2.jpg) no-repeat'
    document.body.style.backgroundSize='100%';
}
function fontEdit3() {
    document.body.style.background = 'url(images/wallpaper3.jpg) no-repeat'
    document.body.style.backgroundSize='100%';
}
function nicInput(){
    nic = document.getElementById('nicinput').value
    document.getElementById('set_fon').innerHTML='<h6 style="color: gray;">Logged as<br><p style="font-size: 23px; color: white;">'+nic+'</p></h6>'

}

// /
function ImageFonSet() {
    //var elem = document.getElementById('set_theme');
    //elem.parentNode.removeChild(elem);
    document.getElementById('set_fon').innerHTML = '<div id="set_fon_app"><div id="Image_prelook"><img src="images/wallpaper.jpg" style="width:155px; margin-left:5%; margin-right:5%; margin-bottom:2%; border-radius:5px;"></div>'+
    '<select style="margin-left: 5%; margin-right: 5%; margin-bottom: 2%; margin-top: 2%; border-radius: 5px; width: 90%; height: 24%;" id="Background-list">  <option>Image 1</option>  <option>Image 2</option>  <option>Image 3</option>  </select>'+
    //'<div id="set_fon_app"><button onclick="fontEdit1()" type="submit" style="margin-left: 5%; margin-right: 5%; border-radius: 5px; margin-bottom: 2%; margin-top: 2%; width: 90%; height: 100px" class="button"><div><img src="images/wallpaper.jpg" width="99" height="66"><br><div>Image 1</div></button><br>'+
    //'<button onclick="fontEdit2()" type="submit" style="margin-left: 5%; margin-right: 5%; margin-bottom: 2%; width: 90%; border-radius: 5px; height: 100px" class="button"><div><img src="images/wallpaper2.jpg" width="99" height="66"><br><div>Image 2</div></button><br>'+
    //'<button onclick="fontEdit3()" type="submit" style="margin-left: 5%; margin-right: 5%; margin-bottom: 2%; width: 90%; border-radius: 5px; height: 100px" class="button"><div><img src="images/wallpaper3.jpg" width="99" height="66"><br><div>Image 3</div></button><br>'+
    
    '<button onclick="button_back()" type="submit" style="margin-left: 5%; margin-right: 1%; margin-bottom: 2%; margin-top: 2%; border-radius: 5px; width: 44%; height: 24%;" class="button"><i class="fa fa-backward" aria-hidden="true"></i>'+
    '<button onclick="SaveImage()" type="submit" style="margin-left: 1%; margin-right: 5%; margin-bottom: 2%; margin-top: 2%; border-radius: 5px; width: 44%; height: 24%;" class="button">Save</button></div>';
}

function button_back(){
    var elem = document.getElementById('set_fon_app');
    elem.parentNode.removeChild(elem);
    document.getElementById('set_fon').innerHTML='<div id="set_fon"><button onclick="ImageFonSet()" type="submit" style="margin: 5%; margin: 5%; margin-top: 5%; border-radius: 5px; margin-bottom: 10%; margin-top: 2%; width: 90%;" class="button"><i class="fa fa-picture-o" aria-hidden="true"></i>&nbsp; Background</button></div>';
}

function SaveImage(){
    var image=document.getElementById('Background-list').value
    if (image=="Image 1"){
        var new_image='images/wallpaper.jpg'
        var sel='<option selected="selected">Image 1</option>  <option>Image 2</option>  <option>Image 3</option>';
        fontEdit1()}

    else if (image=="Image 2"){
        var new_image='images/wallpaper2.jpg'
        var sel='<option >Image 1</option>  <option selected="selected">Image 2</option>  <option>Image 3</option>';
        fontEdit2()}
    else{
        var new_image='images/wallpaper3.jpg'
        var sel='<option >Image 1</option>  <option >Image 2</option>  <option selected="selected">Image 3</option>';
        fontEdit3()}

    var elem_img_pre_new = '<img src="'+new_image+'" style="width:155px; margin-left:5%; margin-right:5%; margin-bottom:2%; border-radius:5px;">';

    var elem = document.getElementById('set_fon_app');
    elem.parentNode.removeChild(elem);
    document.getElementById('set_fon').innerHTML = '<div id="set_fon_app"><div id="Image_prelook">'+elem_img_pre_new+'</div>'+
    '<select style="margin-left: 5%; margin-right: 5%; margin-bottom: 2%; margin-top: 2%; border-radius: 5px; width: 90%; height: 24%;" id="Background-list">'+sel+'</select>'+
    //'<div id="set_fon_app"><button onclick="fontEdit1()" type="submit" style="margin-left: 5%; margin-right: 5%; border-radius: 5px; margin-bottom: 2%; margin-top: 2%; width: 90%; height: 100px" class="button"><div><img src="images/wallpaper.jpg" width="99" height="66"><br><div>Image 1</div></button><br>'+
    //'<button onclick="fontEdit2()" type="submit" style="margin-left: 5%; margin-right: 5%; margin-bottom: 2%; width: 90%; border-radius: 5px; height: 100px" class="button"><div><img src="images/wallpaper2.jpg" width="99" height="66"><br><div>Image 2</div></button><br>'+
    //'<button onclick="fontEdit3()" type="submit" style="margin-left: 5%; margin-right: 5%; margin-bottom: 2%; width: 90%; border-radius: 5px; height: 100px" class="button"><div><img src="images/wallpaper3.jpg" width="99" height="66"><br><div>Image 3</div></button><br>'+
    
    '<button onclick="button_back()" type="submit" style="margin-left: 5%; margin-right: 1%; margin-bottom: 2%; margin-top: 2%; border-radius: 5px; width: 44%; height: 24%;" class="button"><i class="fa fa-backward" aria-hidden="true"></i>'+
    '<button onclick="SaveImage()" type="submit" style="margin-left: 1%; margin-right: 5%; margin-bottom: 2%; margin-top: 2%; border-radius: 5px; width: 44%; height: 24%;" class="button">Save</button></div>';


}



function settingApp(){
    icon = '<i class="fa fa-cog" aria-hidden="true"></i>'
    appcontents = '<div id="set_fon"><button onclick="ImageFonSet()" type="submit" style="margin: 5%; margin: 5%; margin-top: 5%; border-radius: 5px; margin-bottom: 10%; margin-top: 2%; width: 90%;" class="button"><i class="fa fa-picture-o" aria-hidden="true"></i>&nbsp; Background</button></div>';
    //'<div id="set_theme"><button onclick="setting_nic()" type="submit" style="margin: 5%; margin: 5%; border-radius: 5px; width: 90%; height: 150px" class="button"><i class="fa fa-picture-o" aria-hidden="true"  ></i></button></div>'
    openWindow('Settings', appcontents, icon)

}




// exclamation-circle
function errorApp(text){
    icon = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
    appcontents ='ERROR! '+text 
    openWindow('Error',appcontents,icon)
}

//https://scratch.mit.edu/projects/322341152/embed

function terrariaApp() {
    icon = '<img src="icons/terraria.jpg" width="32" height="32">'
    appcontents = '<iframe  src="https://scratch.mit.edu/projects/322341152/embed"></iframe>';
    openCustomWindow('Terraria', appcontents, icon)
}


//https://g.igroutka.ru/games/6/subway_surfers_amsterdam/e8xyldood1thn8uju6l6ysrryotjrnuz/


function rungameApp() {
    icon = '<img src="icons/run.jpg" width="32" height="32">'
    appcontents = '<iframe  src="https://g.igroutka.ru/games/6/subway_surfers_amsterdam/e8xyldood1thn8uju6l6ysrryotjrnuz/"></iframe>';
    openCustomWindow('Subway Serf', appcontents, icon)
}

//https://g.igroutka.ru/loader/game/34712/

//function raceApp() {
//    icon = '<img src="icons/race.jpg" width="32" height="32">'
//    appcontents = '<iframe src="/loader/game/34712/" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" msallowfullscreen="true" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>';
//    openCustomWindow('Race game', appcontents, icon)
//}

// http://storage.id.net/y8-studio/unity/akeemywka/dead_bunker/?ratio_tolerant=true
function shuter3dApp(){
    icon = '<img src="icons/shuter.png" width="32" height="32">'
    appcontents='<iframe style="width: 1280px; height: 720px" src="http://storage.id.net/y8-studio/unity/akeemywka/dead_bunker/?ratio_tolerant=true"></iframe>';
    openCustomWindow('3D Shuter',appcontents,icon,'1290px','730px')
}

function PhotoShopApp(){
    icon='<img src="icons/photo.jpg" width="32" height="32">'
    appcontents= '<iframe src="https://photopea.com/?p={%22environment%22:{%22fcolor%22:%220xFFFFFF%22,%22bcolor%22:%220x000000%22,%22theme%22:2,%22lang%22:%22ru%22,%22showbranding%22:false,%22showmenus%22:[[0,1,2,5,6,7],1,1,1,1,1,1,1,1]}}"></iframe>';
    openCustomWindow('Photo Shop',appcontents,icon)
}



function pyshellApp() {
    icon = '<img src="icons/py.png" width="32" height="32">'
    appcontents = '<iframe src="https://console.python.org/python-dot-org-console/console_frame/" width="100%" height="356" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>';
    openCustomWindow('PyShell', appcontents, icon)
}

//'<button onclick="fontEdit2()" type="submit" style="margin-left: 5%; margin-right: 5%; margin-bottom: 2%; width: 90%; border-radius: 5px; height: 100px" class="button"></button>

function win_contecst(win){
    cont='<button style=" margin-bottom: 1%; margin-top: 1%; width: 100%; height: 10%" class="button" onclick=close_con("'+win+'")  ><a><i class="fa  times-circle" aria-hidden="true"></i>&nbsp; Close</a></button>';
    var elem = document.getElementById('cont_menu');

    openCostrWindow(cont,undefined,top)


}
function close_con(win){
    closeWindow(win)
    var elem = document.getElementById('cont_menu');
    elem.parentNode.removeChild(elem);

}



//https://discord.com/app

//function disApp() {
//    icon = '<img src="icons/ds.png" width="32" height="32">'
//    appcontents = '<iframe src="https://discord.com/channels/@me" width="100%" height="356" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>';
//    openCustomWindow('Discord', appcontents, icon)
//}



function openCostrWindow(content, icon, top) {
    openedwindows++;//че то с переменными
    cycleswindows++;//че то с переменными
    windowid = 'cont_menu';//винлоу айди
    windowhid = "headerwindow" + String(openedwindows);
    windowidclc = "'" + windowid + "'"//переменная
    elementto = '<div class="costrwindow" id="' + windowid + '" onmousedown="markWindow(' + windowidclc + ')">' + 
                         content + '</div>';//переменная
    let div = document.createElement("div");//создаем див
    div.innerHTML = elementto;//редачим див
    document.body.append(div);//переменнаядобавляем див в боди

    document.getElementById(windowid).style.maxWidth = "120px";
    document.getElementById(windowid).style.maxHeight = "40px";


    //макс размер окна
    if (top==undefined){
        document.getElementById(windowid).style.top = "20px";
        console.log("top2: "+top)

    }
    else{document.getElementById(windowid).style.top = top+"px";
        console.log("top1: "+top)
}
    // место создания
    document.getElementById(windowid).style.left = "60px";//место зоздания
//добавляем в масив вин айди
    if (activestart == 1) {
        startMenu()//открытие панели
    }
    else {}
    if (icon == undefined) {
        icon = '<i class="fa fa-window-maximize" aria-hidden="true"></i>'
    }//иконка
    else {}
    markWindow(windowid)//не ебу походу выделят окно тенью
    execute = "closeWindow('" + windowid + "')"//АКАК ВЫЙТИ
    addlog('Opened window: ' + windowid)//лог
}



function newwindowApp() {
    icon = '<i class="fa fa-code" aria-hidden="true"></i>'
    appcontents = '<textarea style="color:#FFFFFF;" placeholder="Code" id="wininput" class="consoleblock"></textarea>'  + 
                  '<select id="typewin" style="margin-left: 5px; width:85%; height:85%;">  <option>window</option>  <option>windowCustom</option> </select>'+
                  '<button onclick="createdevwin()" type="submit" id="cmdbutton" style="margin-left: 5px; width:13%;" class="button"><a><i class="fa fa-angle-double-right" aria-hidden="true"></i>&nbsp; Run</a></button>';
    openWindow('Window Creater', appcontents, icon)
}

function createdevwin()
{
    icon='<i class="fa fa-window-maximize" aria-hidden="true"></i>'
    var cont=document.getElementById('wininput').value
    var win_type=document.getElementById('typewin').value
    if (win_type=="window"){
        openWindow("Title",cont,icon)
    }
    else{
        openCustomWindow("Title",cont,icon)
    }

}
