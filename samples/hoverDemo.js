'use strict';
import { page, closeBrowser } from '../connector.js';

// list of image classes 
const imageSelectors = [
  '.s__column img',
  '.s__column2 img',
  '.s__column3 img',
  '.hover05 figure img',
  '.hover06 figure img',
  '.hover07 figure img',
  '.hover08 figure img',
  '.hover09 figure img',
  '.hover10 figure img',
  '.hover11 figure img'
];

(async () => {

  console.log("Navigating to Selenium Playground | Mouse Hover");
  await page.goto('https://www.lambdatest.com/selenium-playground/hover-demo');

  console.log("Hovering on image element begins")
  for (const selector of imageSelectors) {
    try {
      // Wait for image element to be present
      await page.waitForSelector(selector);

      // Get the image element and hover over it
      await page.hover(selector);
      await page.waitForNetworkIdle()

    } catch (error) {
      console.error(`Error hovering over ${selector}:`, error);
    }
  }

  console.log('Hover completed')

  // close browser
  closeBrowser()

}
)();
