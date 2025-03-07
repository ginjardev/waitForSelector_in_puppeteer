'use strict';
import { page, closeBrowser } from '../connector.js';

(async () => {

    try {
        console.log("Navigating to LambdaTest Ecommerce Playground");
        await page.goto('https://ecommerce-playground.lambdatest.io/');

        // Extract the URL of one image in popular section
        const firstURL = await page.evaluate(() => {
            const anchor = document.querySelector('a#mz-product-listing-image-39217984-0-1');
            if (anchor) {
                const image = anchor.querySelector('img.lazy-load');
                return image ? image.src : null;
            }
            return null;
        });

        console.log('Image URL before waiting & scroll:', firstURL);

        // Wait for the anchor element to be present in the DOM
        await page.waitForSelector('a#mz-product-listing-image-39217984-0-1 img.lazy-load');
        // scroll down to load images
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;

                // Scroll distance per interval
                const distance = 50;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                    // Scroll every 100ms
                }, 100);
            });
        });

        // Extract the src attribute of the first img inside the anchor tag
        const secondURL = await page.evaluate(() => {
            const anchor = document.querySelector('a#mz-product-listing-image-39217984-0-1');
            if (anchor) {
                const image = anchor.querySelector('img.lazy-load');
                return image ? image.src : null;
            }
            return null;
        });
        console.log('Image URL after waiting and scrolling:', secondURL);

    } catch (error) {
        console.error(`Error hovering over ${selector}:`, error);
    }

    console.log('Closing browser');
    // close browser
    closeBrowser();


}
)();
