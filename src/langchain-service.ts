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
      temperature: 0.1,
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
    const examplePrompt = PromptTemplate.fromTemplate(
      '{sentence}\n{finishedSentence}',
    );

    const prompt = new FewShotPromptTemplate({
      examples: EXAMPLES,
      prefix: `Complete the given partial sentence naturally and coherently. Follow these rules strictly:
      1. Only return the missing part of the sentence, starting from where the input ends.
      2. Do not repeat any part of the input.
      3. If your completion starts with a full word, add a space before it.
      4. Ensure the completion fits seamlessly with the given partial sentence.
      6. Never comment on your answer
      7. Your answer should start with a blank space. `,
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
      console.log(JSON.stringify(response));
      // remove 3... from begining, and if the first word contains
      // const trimmedResponse = this.trimResponse(partialText, response);

      return response;
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
    const inputWords = partialText.split(' ');
    let lastInputWord = inputWords[inputWords.length - 1].toLowerCase();

    // Check if we're completing the last word
    if (!partialText.endsWith(' ')) {
      // Remove any repetition of the last partial word
      const lastWordRegex = new RegExp(`^${lastInputWord}`, 'i');
      lastInputWord = lastInputWord.replace(lastWordRegex, '');

      // If the trimmed response starts with a space, remove it
      lastInputWord = lastInputWord.replace(/^\s+/, '');
    }

    return lastInputWord;
  }
}
