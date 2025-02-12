'use strict';

import { remoteBrowserPage } from '../connector.js';

(async () => {
  try {

    let {page, browser} = await remoteBrowserPage();

    console.log("Navigating to Selenium Playground | File Download");
    await page.goto('https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo');


    await page.locator('#textbox').fill('This text will be downloaded \n Some more text');
    await page.locator('button#create').click();

    // wait for download link to become visible
    await page.waitForSelector('#link-to-download ');

    console.log('Click file download link');
    await page.locator('#link-to-download ').click();
    console.log('File download completed')
    // set test status to passed
    await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: "Test Passed" } })}`);


    await browser.close()
  } catch(e) {
    console.log("Error - ", e);
  }

})();