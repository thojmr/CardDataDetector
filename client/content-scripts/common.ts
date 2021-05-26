import { ActionIcon } from '../background/action-icon.types'


class Common {
    constructor() {
        
    }

    setBrowserActionIconState(state: ActionIcon) {
        window.chrome.runtime.sendMessage({ browserActionIcon: state });
    }

    setBrowserActionIconTitle(title: string) {
        window.chrome.runtime.sendMessage({ browserActionTitle: title });
    }

    getActionIconState(isCard: boolean): ActionIcon {
       
        if (isCard) {
            return ActionIcon.ENABLED;
        } else {
            return ActionIcon.DISABLED;
        }              
    }    
}

export default new Common()