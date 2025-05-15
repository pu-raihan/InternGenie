import pdfParse from 'pdf-parse';

async function parseResume(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw error;
  }
}

export { parseResume }; 