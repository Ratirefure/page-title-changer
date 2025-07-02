document.addEventListener("DOMContentLoaded", ()=>{
    browser.storage.local.get({contextChange: true, contextAppend: false},(items)=>{
        document.getElementById("contextChange").checked = items.contextChange;
        document.getElementById("contextAppend").checked = items.contextAppend;
    });
});

const conChange = document.getElementById("contextChange");
conChange.addEventListener("click", ()=>{
    browser.storage.local.set({contextChange: conChange.checked});
    browser.runtime.sendMessage("update-context-menu");
});

const conAppend = document.getElementById("contextAppend");
conAppend.addEventListener("click", ()=>{
    browser.storage.local.set({contextAppend: conAppend.checked});
    browser.runtime.sendMessage("update-context-menu");
});