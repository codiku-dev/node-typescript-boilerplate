import { LangChainService } from './langchain-service.js';
import { readContextFile } from './utils.js';

async function main() {
  let response;
  const sentence = `Hello Anaïs, so do you prefer NextJS or`;
  const langchainService = new LangChainService();
  //  let response = await langchainService.autocomplete(sentence);
  // console.log(`${sentence}${response}`);
  response = await langchainService.autocomplete(sentence);
  console.log(`${sentence}${response}`);
  const context = await readContextFile(
    '2024-08-12T09-26-20-479Z-Anaïs (message direct) - KERNL - Slack',
  );
  await langchainService.addContext(context);
  response = await langchainService.autocomplete(sentence);
  console.log(`${sentence}${response}`);
}
main();
