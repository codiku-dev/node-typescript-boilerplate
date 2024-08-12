import { promises as fs } from 'fs';
import path from 'path';

export async function readContextFile(folderName: string): Promise<string> {
  try {
    const dataDir = path.join(process.cwd(), 'collected-data');
    const filePath = path.join(dataDir, folderName, 'content.txt');

    // Read and return the content of context.txt
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error reading context file:', error);
    throw error;
  }
}
