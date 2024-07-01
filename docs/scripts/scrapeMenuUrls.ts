import puppeteer from 'puppeteer';

async function scrapeMenuUrls(
  url: string,
  selector: string,
): Promise<unknown[]> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const menuUrls: unknown[] = await page.evaluate((selector) => {
    const elements = document.querySelectorAll(selector);
    const urls = Array.from(elements)
      .flatMap((element) => {
        const anchors = element.querySelectorAll('a');
        return Array.from(anchors).map((anchor) => anchor.href);
      })
      .filter((url) => url !== null);
    return urls;
  }, selector);

  await browser.close();
  return menuUrls;
}

(async () => {
  const url = 'https://stately.ai/docs/typescript'; // 替换为你要爬取的网站URL
  const selector = '.theme-doc-sidebar-item-link'; // 替换为你要爬取的菜单项的CSS选择器

  try {
    const menuUrls = await scrapeMenuUrls(url, selector);
    console.log('Menu URLs:', menuUrls);
  } catch (error) {
    console.error('Error:', error);
  }
})();
