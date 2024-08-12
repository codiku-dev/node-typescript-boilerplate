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
      temperature: 0.2,
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
      prefix: `
      Context:{context}

      Complete the given partial sentence naturally and coherently. Follow these rules strictly:
      1. Only return the missing part of the sentence, starting from where the input ends.
      2. Do not repeat any part of the input.
      3. If your completion starts with a full word, add a space before it.
      4. Ensure the completion fits seamlessly with the given partial sentence.
      6. Never comment on your answer
      7. Your answer should start with a blank space.
      8. Use the added context to complete the sentence.`,
      suffix: 'Partial sentence: {sentence}\nCompletion:',
      examplePrompt,
      inputVariables: ['sentence', 'context'],
    });

    const formattedPrompt = await prompt.format({
      sentence: partialText,
      context: this.context,
    });

    try {
      const response = await this.llm.invoke(formattedPrompt, { signal });
      const sanitizedResponse = this.sanitizeResponse(partialText, response);
      return sanitizedResponse;
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
      {
        input: `New context added`,
      },
      { output: newContext },
    );
  }

  sanitizeResponse(partialText: string, response: string) {
    const wordsSentence = partialText.split(' ');
    const wordsResponse = response.split(' ');
    // Remove the first word of response if it matches the last word of the sentence
    if (
      wordsSentence[wordsSentence.length - 1].trim() === wordsResponse[0].trim()
    ) {
      const firstWord = wordsResponse.shift() || '';
      // If the removed word had a leading space, add it to the next word

      if (
        firstWord.length !== firstWord.trim().length &&
        wordsResponse.length > 0
      ) {
        wordsResponse[0] = ' ' + wordsResponse[0];
      }
      response = wordsResponse.join(' ');
    }

    return response;
  }
}
