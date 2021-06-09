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
        return isCard ? ActionIcon.ENABLED : ActionIcon.DISABLED;
    }    
}

export default new Common()