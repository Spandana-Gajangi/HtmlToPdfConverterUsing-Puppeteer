const { Router } = require('express');
const puppeteer = require('puppeteer');
const { readFile } = require('fs-extra');
const path = require('path');
const router = Router();

router.post('/convertToPdf', async (req, res)=>{
    let content = await readFile(
        path.resolve(__dirname, './GoDigit-internal-css/index.html'),
        'utf-8'
    );
    content = content.replace(/InsuredName/, req.body.insuredName)
        .replace(/PolicyNumber/, req.body.policyNumber)
        .replace(/PolicyDate/, req.body.policyDate)
        .replace(/FromDate/, req.body.fromDate)
        .replace(/ToDate/, req.body.toDate);

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setContent(content)
    const buffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
            left: '0px',
            top: '0px',
            right: '0px',
            bottom: '0px'
        }
    })
    await browser.close()
    res.end(buffer)
});

module.exports.router = router;
