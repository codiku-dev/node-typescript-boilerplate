import { Ollama } from '@langchain/ollama';
import { BufferMemory } from 'langchain/memory';
import { FewShotPromptTemplate, PromptTemplate } from '@langchain/core/prompts';
import { EXAMPLES } from './examples.js';

export class LangChainService {
  private static instance: LangChainService;

  private llm: Ollama;
  private memory: BufferMemory;
  private context: string = '';
  constructor() {
    console.log('Setup ollama...');
    this.llm = new Ollama({
      model: 'llama3.1:latest',
      temperature: 0,
      maxRetries: 0,
    });

    console.log('Setup memory...');
    this.memory = new BufferMemory();
  }
  public static getInstance(): LangChainService {
    if (!LangChainService.instance) {
      LangChainService.instance = new LangChainService();
    }
    return LangChainService.instance;
  }

  async autocomplete(
    partialText: string,
    signal?: AbortSignal,
  ): Promise<string> {
    const words = partialText.split(' ');
    const lastWord = words[words.length - 1];
    const examplePrompt = PromptTemplate.fromTemplate(
      '{sentence}\n{finishedSentence}',
    );

    const prompt = new FewShotPromptTemplate({
      examples: EXAMPLES,
      prefix: `Complete the given partial sentence naturally and coherently. Only return the missing part of the sentence, starting from where the input ends. Do not repeat any part of the input. Ensure the completion fits seamlessly with the given partial sentence.`,

      suffix: 'Partial sentence: {sentence}\nCompletion:',
      examplePrompt,
      inputVariables: ['sentence'],
    });

    const formattedPrompt = await prompt.format({
      context: this.context,
      sentence: partialText,
    });

    try {
      const response = await this.llm.invoke(formattedPrompt, { signal });
      console.log('response : ', response);
      console.log('***');
      // remove 3... from begining, and if the first word contains
      const trimmedResponse = this.trimResponse(partialText, response);

      return trimmedResponse;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        console.log('LLM request was aborted');
        throw error;
      }
      throw error;
    }
  }
  async addContext(newContext: string) {
    this.context += ' ' + newContext;
    await this.memory.saveContext(
      { input: 'New context added' },
      { output: newContext },
    );
  }

  private trimResponse(partialText: string, response: string): string {
    const inputWords = partialText.trim().toLowerCase().split(' ');
    const lastInputWord = inputWords[inputWords.length - 1];

    let trimmedResponse = response.trim();

    // Check if we're completing the last word or starting a new one
    const isCompletingWord = !partialText.endsWith(' ');

    if (isCompletingWord) {
      // If completing a word, remove any repetition of the last partial word
      const lastWordRegex = new RegExp(`^${lastInputWord}`, 'i');
      trimmedResponse = trimmedResponse.replace(lastWordRegex, '').trim();
      return trimmedResponse;
    } else {
      // If starting a new word, ensure there's a space at the beginning
      return trimmedResponse.startsWith(' ')
        ? trimmedResponse
        : ' ' + trimmedResponse;
    }
  }
}
