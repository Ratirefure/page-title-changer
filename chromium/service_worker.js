import {changeTitle} from "./change_title.js";

const menuChange = {
	id: "changeTitleOption",
	title: "Change Page Title",
	type: "normal",
	contexts: [ "selection" ]
};
const menuAppend = {
    id: "appendTitleOption",
    title: "Append to Page Title",
    type: "normal",
    contexts: [ "selection" ]
};

chrome.runtime.onInstalled.addListener(()=>{   //create the context menu entry on first install
    chrome.storage.local.get({contextChange: true, contextAppend: false},(items)=>{
            if(items.contextChange)
                chrome.contextMenus.create(menuChange);

            if(items.contextAppend)
                chrome.contextMenus.create(menuAppend);
        });
});

chrome.runtime.onMessage.addListener((message)=>{
    if(message === "update-context-menu"){
        chrome.contextMenus.removeAll();
        chrome.storage.local.get({contextChange: true, contextAppend: false},(items)=>{
            if(items.contextChange)
                chrome.contextMenus.create(menuChange);

            if(items.contextAppend)
                chrome.contextMenus.create(menuAppend);
        });
    }
});

chrome.contextMenus.onClicked.addListener((info,tab)=>{ //context menu clicked
    switch(info.menuItemId){
        case "changeTitleOption":
            listenChangeCommand(tab, false);
            break;
        case "appendTitleOption":
            listenChangeCommand(tab, true);
    }
});

chrome.commands.onCommand.addListener((command,tab)=>{  //keyboard shortcut
    switch(command){
        case "1changeTitle":
            listenChangeCommand(tab, false);
            break;
        case "2appendTitle":
            listenChangeCommand(tab, true);
    }
});

function listenChangeCommand(tab,append){   //javascript injection
	if(tab != null && tab.id != -1 && !tab.url.startsWith("chrome://")){    //do nothing if URL starts with chrome:// or is otherwise invalid
		chrome.scripting.executeScript({
			func: changeTitle,
			target: {tabId: tab.id},
            args: [ append ]
		});
	}
}