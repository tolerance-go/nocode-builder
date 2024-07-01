import puppeteer from 'puppeteer';
import fs from 'fs-extra';

async function scrapeContentFromUrls(
  urls: string[],
  selector: string,
  outputFile: string,
): Promise<void> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let allContent = '';

  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const content = await page.evaluate((selector) => {
        const element = document.querySelector(selector);
        return element ? element.textContent : '';
      }, selector);

      allContent += `${content}\n\n`;
    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
    }
  }

  await browser.close();

  await fs.outputFile(outputFile, allContent, 'utf-8');
  console.log(`All content has been saved to ${outputFile}`);
}

(async () => {
  const urls = [
    'https://stately.ai/docs/',
    'https://stately.ai/docs/quick-start',
    'https://stately.ai/docs/installation',
    'https://stately.ai/docs/migration',
    'https://stately.ai/docs/examples',
    'https://stately.ai/docs/templates',
    'https://stately.ai/docs/cheatsheet',
    'https://stately.ai/docs/typescript',
    'https://www.jsdocs.io/package/xstate',
    'https://stately.ai/docs/state-machines-and-statecharts',
    'https://stately.ai/docs/actor-model',
    'https://stately.ai/docs/xstate',
    'https://stately.ai/docs/actors',
    'https://stately.ai/docs/state-machine-actors',
    'https://stately.ai/docs/promise-actors',
    'https://stately.ai/docs/transition-actors',
    'https://stately.ai/docs/callback-actors',
    'https://stately.ai/docs/observable-actors',
    'https://stately.ai/docs/invoke',
    'https://stately.ai/docs/spawn',
    'https://stately.ai/docs/system',
    'https://stately.ai/docs/inspection',
    'https://stately.ai/docs/machines',
    'https://stately.ai/docs/setup',
    'https://stately.ai/docs/states',
    'https://stately.ai/docs/context',
    'https://stately.ai/docs/input',
    'https://stately.ai/docs/output',
    'https://stately.ai/docs/transitions',
    'https://stately.ai/docs/eventless-transitions',
    'https://stately.ai/docs/delayed-transitions',
    'https://stately.ai/docs/actions',
    'https://stately.ai/docs/guards',
    'https://stately.ai/docs/initial-states',
    'https://stately.ai/docs/finite-states',
    'https://stately.ai/docs/parent-states',
    'https://stately.ai/docs/parallel-states',
    'https://stately.ai/docs/final-states',
    'https://stately.ai/docs/history-states',
    'https://stately.ai/docs/persistence',
    'https://stately.ai/docs/tags',
    'https://stately.ai/docs/event-emitter',
    'https://stately.ai/docs/testing',
    'https://stately.ai/docs/immer',
    'https://stately.ai/docs/xstate-vscode-extension',
    'https://stately.ai/docs/visualizer',
    'https://stately.ai/docs/inspector',
    'https://stately.ai/docs/developer-tools',
    'https://stately.ai/docs/glossary',
  ];
  const selector = '.theme-doc-markdown.markdown'; // 替换为你要爬取的DOM选择器
  const outputFile = 'output.txt'; // 替换为你的输出文件名

  await scrapeContentFromUrls(urls, selector, outputFile);
})();
