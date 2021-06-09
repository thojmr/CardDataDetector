# Introduction
This repository contains the CaardDataDetector chrome extension
It will check any image urls ending with .png for Illusion card data and scene data.  When an image has card data the extension icon will turn green.
Use case: "right click image > open image in new tab > check icon color in that tab".

It's too much effort to host this officially through the Chrome App Store, so you'll install it as an unpacked extension (below).

## How to install
1. Download the latest .zip from the Releases page
2. Extract the contents of this zip somewhere it won't be deleted
3. Open Chrome > Extension icon > Manage Extensions > Load unpacked > select the .zip file
4. The extension should be installed
    - You might want to enable it in incognito mode, and pin it to the extension bar



## (Developers only) Building from scratch
<details>
    <summary>Click to expand</summary>
How to build this project
- Install NodeJs
- Run `npm install --force` from this project's root
    - You will need Webpack 5 installed globally as well for the next step
- Run `npm run watch` to build and watch for changes


How to install the Unpacked extension
- If you have not built the app above, you need to do that first
- Open Chrome > Extension icon > Manage Extensions > Load unpacked
- Select the `{root}/client/build` output folder    
- The extension should now be installed
</details>
