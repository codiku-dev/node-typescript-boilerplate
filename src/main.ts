import { LangChainService } from './langchain-service.js';

async function main() {
  const sentence = 'Hey joe, off course I know you are an arti';
  const langchainService = new LangChainService();
  const response = await langchainService.autocomplete(sentence);
  console.log(sentence + response);
}
main();
