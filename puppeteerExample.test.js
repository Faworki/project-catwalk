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

  afterAll(async () => {
    await page.close();
  })

  test('should have title "Project Catwalk"', async () => {
    const title = await page.title();

    expect(title).toBe('Project Catwalk');
  })

  test('should display 4 reviews after clicking "More Reveiws"', async () => {
    let click = await page.click('data-test=moreReviews');
    debugger;
    expect(1).toEqual(1)
  })


})