import { pipeline } from '@xenova/transformers';
import cosineSimilarity from 'compute-cosine-similarity';

let embeddingPipeline = null;
const embeddingCache = new Map();

async function initializeEmbeddingPipeline() {
  if (!embeddingPipeline) {
    embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return embeddingPipeline;
}

async function getEmbedding(text) {
  if (embeddingCache.has(text)) {
    return embeddingCache.get(text);
  }

  try {
    const pipeline = await initializeEmbeddingPipeline();
    const result = await pipeline(text, {
      pooling: 'mean',
      normalize: true
    });

    embeddingCache.set(text, Array.from(result.data));
    return Array.from(result.data);
  } catch (error) {
    console.error('Error getting embedding:', error);
    throw error;
  }
}

function calculateSimilarity(vec1, vec2) {
  return cosineSimilarity(vec1, vec2);
}

async function getJobMatches(userVector, jobs, topK = 5) {
  const similarities = jobs.map(job => ({
    job,
    similarity: calculateSimilarity(userVector, job.embedding)
  }));

  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)
    .map(item => ({
      ...item.job.toObject(),
      similarity: item.similarity
    }));
}

export {
  getEmbedding,
  calculateSimilarity,
  getJobMatches
}; 