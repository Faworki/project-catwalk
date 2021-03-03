const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  // Switch with line below will run the tests and actually open a browser you can see
  // browser = await puppeteer.launch({headless: false, slowMo: 100});
  browser = await puppeteer.launch();
})

afterAll(async () => {
  await browser.close();
})

describe('Project Catwalk', () => {

  beforeEach(async () => {
    page = await browser.newPage();

  })

  afterEach(async () => {
    await page.close();
  })

  test('should have title "Project Catwalk"', async () => {

    await page.goto('http://localhost:3000/');
    const title = await page.title();

    expect(title).toBe('Project Catwalk');
  })

  test('should display 2 review on load', async () => {

    await page.goto('http://localhost:3000/', {waitUntil: 'networkidle0'});

    let revNum = await page.$eval('.card-container', e => {
      return e.childElementCount;
    })

    expect(revNum).toEqual(2)
  })

  test('should display 4 reviews after clicking "More Reveiws"', async () => {

    await page.goto('http://localhost:3000/', {waitUntil: 'networkidle0'});

    /* let click =  */await page.click('[data-test="moreReviews"]');

    let revNum = await page.$eval('.card-container', e => {
      return e.childElementCount;
    })

    expect(revNum).toEqual(4)
  })


})