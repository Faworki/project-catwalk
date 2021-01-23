import 'expect-puppeteer'

describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com')
  })

  it('should display "google" text on page', async () => {
    await expect(page).toMatch('google')
  })
})

describe('Project Catwalk', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/');
  })

  // afterAll(async () => {
  //   await page.close();
  // })

  test('should have title "Project Catwalk"', async () => {
    const title = await page.title();

    expect(title).toBe('Project Catwalk');
  })

  xtest('should display 2 review on load', async () => {

    expect(page.$eval('.card-container'), e => {
      return e.childElementCount;
    }).toEqual(2)
  })

  xtest('should display 4 reviews after clicking "More Reveiws"', async () => {
    let click = await page.click('data-test=moreReviews');
    expect(page.$eval('.card-container'), e => {
      return e.childElementCount;
    }).toEqual(4)
  })


})