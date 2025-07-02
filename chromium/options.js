document.addEventListener("DOMContentLoaded", ()=>{
    chrome.storage.local.get({contextChange: true, contextAppend: false},(items)=>{
        document.getElementById("contextChange").checked = items.contextChange;
        document.getElementById("contextAppend").checked = items.contextAppend;
    });
});

const conChange = document.getElementById("contextChange");
conChange.addEventListener("click", ()=>{
    chrome.storage.local.set({contextChange: conChange.checked});
    chrome.runtime.sendMessage("update-context-menu");
});

const conAppend = document.getElementById("contextAppend");
conAppend.addEventListener("click", ()=>{
    chrome.storage.local.set({contextAppend: conAppend.checked});
    chrome.runtime.sendMessage("update-context-menu");
});