'use strict';
import { connect } from 'puppeteer';

async function createBrowser() {
    // lambdatest capabilities object
    const capabilities = {
        'browserName': 'Chrome',
        'browserVersion': 'latest',
        'LT:Options': {
            'platform': 'Windows 11',
            'build': 'puppeteer-build-2',
            'name': 'Puppeteer waitForSelector',
            'resolution': '1366x768',
            'user': process.env.LT_USERNAME || "Your Username",
            'accessKey': process.env.LT_ACCESS_KEY || "Your Access Key",
            'network': true
        }
    };

    let browser;
    try {
        // create browser instance
        browser = await connect({
            browserWSEndpoint:
                `wss://cdp.lambdatest.com/puppeteer?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
        });

    } catch (e) {
        console.log("Error - ", e);
    }

    return browser;
}


async function createPage() {

    let page;

    try {
        // create page instance
        page = await browser.newPage();

        // set viewport
        await page.setViewport({
            width: 1024,
            height: 768,
            deviceScaleFactor: 1,
        });

    } catch (e) {
        console.log("Error - ", e);
    }

    return page;
}


export async function closeBrowser() {

    try {
        // set test status to passed
        await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: "Test Passed" } })}`);
        await browser.close();

    } catch (e) {
        // set test status to failed
        await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: "Test Failed" } })}`);
        console.log("Error - ", e);
        browser.close();
    }

}

let browser = await createBrowser();
let page = await createPage();

export { page, browser };