import { Injectable, inject } from '@angular/core';
import { GoogleGenAI, Chat } from "@google/genai";
import { DataService } from './data.service';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;
  private dataService = inject(DataService);

  constructor() {
    // This is a placeholder for the API key.
    // In a real Applet environment, process.env.API_KEY would be available.
    const apiKey = (window as any).process?.env?.API_KEY ?? 'YOUR_API_KEY_HERE';
    if (apiKey === 'YOUR_API_KEY_HERE') {
        console.warn("Using a placeholder API key. Please set the API_KEY environment variable.");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  private initializeChat() {
    const portfolioContext = this.dataService.getPortfolioContextForAI();
    const systemInstruction = `You are a friendly, professional AI assistant for Rohith Kumar Saravanan's portfolio.
    Your goal is to answer questions from recruiters and visitors based ONLY on the information provided about Rohith.
    Do not invent any information. If you don't know the answer from the provided context, state that the information is not in your knowledge base.
    Keep your answers concise and professional.
    Here is Rohith's data:
    ${portfolioContext}
    `;

    this.chat = this.ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });
  }
  
  sendMessageStream(message: string) {
    if (!this.chat) {
      this.initializeChat();
    }
    // FIX: Removed RxJS `defer` wrapper. The method now returns the `Promise<AsyncGenerator>`
    // directly from the Gemini API, which can be awaited in the component.
    return this.chat!.sendMessageStream({ message });
  }
}