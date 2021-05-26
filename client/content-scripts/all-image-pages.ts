import Common from './common'
import { ActionIcon } from '../background/action-icon.types'
import { CardType } from './_models/card-type';


class AllImagePages {

    //Runs on png url page load
    constructor() {
        console.log('[CardDataDetector] Checking .png for card data')
        //Reset browser icon and title
        Common.setBrowserActionIconState(ActionIcon.DISABLED);       
        Common.setBrowserActionIconTitle(""); 

        this.checkForCardData()
    }

    async checkForCardData() {
        const imageBinaryStr = await this.getImageBinary(window.location.href);

        //If no marker found then this is not a card
        if (!imageBinaryStr) {
            Common.setBrowserActionIconState(ActionIcon.DISABLED);
            return;
        }

        const cardType = this.hasCardData(imageBinaryStr);
        if (cardType == CardType.None) return;
        console.log('[CardDataDetector] Card Data found!')

        //Set the browser icon color based on card data state
        Common.setBrowserActionIconState(ActionIcon.ENABLED);
        //Update browser icon title when match found
        Common.setBrowserActionIconTitle(cardType);
    }

    async getImageBinary(url: string): Promise<string> {
        //Fetch the image from current url
        const blob = await this.fetchImg(url);
        if (!blob) return "";        

        let binaryStr = '';
        const bytes = new Uint8Array(blob);
        const len = bytes.byteLength;

        //Convert to binary string
        for (let i = 0; i < len; i++) {
            binaryStr += String.fromCharCode(bytes[i]);
        }
        
        return binaryStr;
    }

    //Fetch the arrayBuffer from the current page url
    async fetchImg(url: string): Promise<ArrayBuffer> {
        return fetch(url, {})
            .then(resp => resp.arrayBuffer())
            .catch(err => {
                console.error(err);
                return null;
            })
    }

    //Check for matching image data text for each card type
    hasCardData(binaryStr: string): CardType {

        if (binaryStr.includes(CardType.AiSyoujyo)) {            
            return CardType.AiSyoujyo;
        }
        if (binaryStr.includes(CardType.KoikatsuPartySpecialPatch)) {
            return CardType.KoikatsuPartySpecialPatch;
        }
        if (binaryStr.includes(CardType.KoikatsuParty)) {
            return CardType.KoikatsuParty;
        }
        if (binaryStr.includes(CardType.Koikatsu)) {
            return CardType.Koikatsu;
        }
        if (binaryStr.includes(CardType.EmotionCreators)) {
            return CardType.EmotionCreators;
        }

        Common.setBrowserActionIconTitle(""); 
        return CardType.None;
    }

}

export default new AllImagePages()