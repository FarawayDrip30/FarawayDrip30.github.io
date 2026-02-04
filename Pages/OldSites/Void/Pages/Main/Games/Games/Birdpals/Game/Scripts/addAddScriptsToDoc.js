{
    let antiCache = "?"+(new Date()).getTime();
    let tempscript = document.createElement("script");
    tempscript.src = "./Scripts/addScriptsToDoc.js" + antiCache;
    document.head.appendChild(tempscript);
}