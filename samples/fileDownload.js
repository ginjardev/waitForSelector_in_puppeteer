'use strict';

import { page, closeBrowser} from '../connector.js';

(async () => {
  try {

    console.log("Navigating to Selenium Playground | File Download");
    await page.goto('https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo');


    await page.locator('#textbox').fill('This text will be downloaded \n Some more text');
    await page.locator('button#create').click();

    // // wait for download link to become visible
    await page.waitForSelector('#link-to-download');

    console.log('Click file download link');
    await page.locator('#link-to-download ').click();
    console.log('File download completed');

    await Promise.race([
      await page.waitForSelector('button#create'),
      await page.waitForSelector('#link-to-download')
    ]);

    // close browser
    closeBrowser();

  } catch(e) {
    console.log("Error - ", e);
  }

})();
