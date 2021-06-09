import { ActionIcon } from './action-icon.types'

export default class BrowserIcon {

	constructor() {
		//Listen for content script event calls
		window.chrome.runtime.onMessage.addListener(
			(request, sender, sendResponse) => {
                // console.log('bg window.chrome.runtime.onMessage:', request)

                if (request.browserActionTitle) {
                    this.setBrowserActionTitle(request.browserActionTitle, sender)                    
                    
				} else if (request.hasOwnProperty('browserActionIcon')) {
                    this.setBrowserActionIcon(request.browserActionIcon, sender)

                } else {
                    return;
                }

				//Allows Async callback
				return true;
			});
	}

    //Get tab id for when message sent from browser action popup (note relly needed here for this extension)
	async getCurrentTabId(sender) {
		if (!sender) return;

		if (sender && sender.tab) {
			return sender.tab.id;
		}

		return new Promise((resolve, reject) => {
			window.chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => { 
				resolve(tabs[0].id)
			})	
		})
    }
    
    async setBrowserActionTitle(title: string, sender) {
		let tabId = await this.getCurrentTabId(sender);
		//console.log('tabId', tabId)
		if (!tabId) {
			 console.warn('Invalid tab id to set title')
			 return
		}
		window.chrome.browserAction.setTitle({title: title, tabId: tabId})
	}
	
	//Change the icon color for a single tab, or all tabs
	setActive(tabId?: number) {
		if (tabId || tabId == 0) {
			window.chrome.browserAction.setIcon({path: 'styles/icon-enabled.png', tabId: tabId})
		} else {
			window.chrome.browserAction.setIcon({path: 'styles/icon-enabled.png'})
		}
	}

	setDisabled(tabId?: number) {
		if (tabId || tabId == 0) {
			window.chrome.browserAction.setIcon({path: 'styles/icon-disabled.png', tabId: tabId})
		} else {
			window.chrome.browserAction.setIcon({path: 'styles/icon-disabled.png'})
		}
	}
	
	//Select the icon color/style based on the type passed in
    async setBrowserActionIcon(type: ActionIcon, sender?, customTitle?: string, allTabs?: boolean) {
		let path = '';
		let tabId = await this.getCurrentTabId(sender);

		switch (type) {
			case ActionIcon.ENABLED:
				path = 'styles/icon-enabled.png'; 
				break;
			case ActionIcon.DISABLED:
				path = 'styles/icon-disabled.png'; 
				window.chrome.browserAction.setTitle({title: ''})
				break;
			default:
				path = 'styles/icon-disabled.png';					
		}

		if (!allTabs) {
			window.chrome.browserAction.setIcon({path: path, tabId: tabId})
		} else {
			window.chrome.browserAction.setIcon({path: path})
		}
	}    

}