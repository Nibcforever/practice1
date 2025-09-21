
import { GoogleGenAI, Type } from "@google/genai";
import { Word } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchFrenchWords = async (category: string, difficulty: string): Promise<Word[]> => {
  const prompt = `Generate a list of 10 French words for a ${difficulty} learner, focusing on the category of ${category}. Provide their English translations.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              french: {
                type: Type.STRING,
                description: 'The word in French.'
              },
              english: {
                type: Type.STRING,
                description: 'The English translation of the word.'
              }
            },
            required: ["french", "english"],
          }
        },
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        console.warn("Gemini API returned an empty response.");
        return [];
    }

    const words = JSON.parse(jsonText);
    return words as Word[];

  } catch (error) {
    console.error("Error fetching words from Gemini API:", error);
    throw error;
  }
};
