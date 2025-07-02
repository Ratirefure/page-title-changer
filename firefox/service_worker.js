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

browser.runtime.onInstalled.addListener(()=>{   //create the context menu entry on first install
    browser.storage.local.get({contextChange: true, contextAppend: false},(items)=>{
            if(items.contextChange)
                browser.contextMenus.create(menuChange);

            if(items.contextAppend)
                browser.contextMenus.create(menuAppend);
        });
});

browser.runtime.onMessage.addListener((message)=>{
    if(message === "update-context-menu"){
        browser.contextMenus.removeAll();
        browser.storage.local.get({contextChange: true, contextAppend: false},(items)=>{
            if(items.contextChange)
                browser.contextMenus.create(menuChange);

            if(items.contextAppend)
                browser.contextMenus.create(menuAppend);
        });
    }
});

browser.contextMenus.onClicked.addListener((info,tab)=>{ //context menu clicked
    switch(info.menuItemId){
        case "changeTitleOption":
            listenChangeCommand(tab, false);
            break;
        case "appendTitleOption":
            listenChangeCommand(tab, true);
    }
});

browser.commands.onCommand.addListener((command,tab)=>{  //keyboard shortcut
    switch(command){
        case "1changeTitle":
            listenChangeCommand(tab, false);
            break;
        case "2appendTitle":
            listenChangeCommand(tab, true);
    }
});

function listenChangeCommand(tab,append){   //javascript injection
	if(tab != null && tab.id != -1){
		browser.scripting.executeScript({
			func: changeTitle,
			target: {tabId: tab.id},
            args: [ append ]
		});
	}
}
