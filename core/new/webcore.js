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

function openWindow(type='normal', title='Window', icon='<i class="fa fa-window-maximize" aria-hidden="true"></i>', content='Content not found.', headercolor='white', windowcolor='white', maxwidth='100%', maxheight='100%', minwidth='auto', minheight='auto', canclose, canmin, canmax) {
    if (activestart == 1) {
        startMenu()
    }
    openedwindows++;
    cycleswindows++;
    windowid = `window${String(openedwindows)}`;
    windowtid = `wtitie${windowid}`;
    windowhid = `headerwindow${String(openedwindows)}`
    if (canclose==undefined) {
        closewin = ` onclick='closeWindow("${windowid}")`
    }
    else {
        closewin = ''
    }
    if (canmin==undefined) {
        minwin = ` onclick='minimizeWindow("${windowid}")`
    }
    else {
        minwin = ''
    }
    if (canmax==undefined) {
        maxwin = ` onclick='maximizeWindow("${windowid}")`
        dbcwin = ` ondblclick='maximizeWindow("${windowid}")`
    }
    else {
        maxwin = ''
        dbcwin = ''
    }
    header = `<div id="${windowhid}" ${dbcwin}' class="windowheader">${titleicon}&nbsp;<b>${title}</b><p ${closewin} style="margin: auto; margin-right: 7px; margin-top: -20px; width: 10px; text-align: right;"> <i class="fa fa-window-close" aria-hidden="true"></i></p><p ' + maxwin + ' style="margin: auto; margin-right: 25px; margin-top: -21px; width: 10px; text-align: right;"> <i class="fa fa-window-maximize" aria-hidden="true"></i></p><p ' + minwin + ' style="margin: auto; margin-right: 43px; margin-top: -21px; width: 10px; text-align: right;"> <i class="fa fa-window-minimize" aria-hidden="true"></i></p></div><div class="windowblock">`
    try {
        titleicon = icon.replace(/40/g, '17')
        icon = icon.replace(/40/g, '32')
    }
    catch {}
    elementto = `<div class="window" id="${windowid}" onmousedown="markWindow('${windowid}')"><div id="${windowhid}" ' suksuk + ' class="windowheader">' + titleicon + '&nbsp;<b>' + wtitie + '</b><p ' + closewin + ' style="margin: auto; margin-right: 7px; margin-top: -20px; width: 10px; text-align: right;"> <i class="fa fa-window-close" aria-hidden="true"></i></p><p ' + maxwin + ' style="margin: auto; margin-right: 25px; margin-top: -21px; width: 10px; text-align: right;"> <i class="fa fa-window-maximize" aria-hidden="true"></i></p><p ' + minwin + ' style="margin: auto; margin-right: 43px; margin-top: -21px; width: 10px; text-align: right;"> <i class="fa fa-window-minimize" aria-hidden="true"></i></p></div><div class="windowblock">' 
                + content + '</div>' + '</div>'`
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