import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

// Initialize the client once
const ai = new GoogleGenAI({ apiKey: apiKey });

export const removeBackground = async (base64Data: string, mimeType: string): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash-image';
    
    // Clean the base64 string if it contains the header
    const cleanBase64 = base64Data.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            // Explicitly ask for transparent background
            text: "Remove the background. Return the subject on a transparent background.",
          },
        ],
      },
      config: {
        temperature: 0.1, 
      }
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) {
      throw new Error("No content generated");
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        // Ensure we return png header for transparency
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("Model did not return an image.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};