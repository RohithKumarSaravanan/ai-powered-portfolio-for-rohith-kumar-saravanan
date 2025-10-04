import { Component, ChangeDetectionStrategy, inject, signal, effect, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService, ChatMessage } from '../../services/gemini.service';
import { GenerateContentResponse } from '@google/genai';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-assistant.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiAssistantComponent {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  private geminiService = inject(GeminiService);
  
  messages = signal<ChatMessage[]>([]);
  userInput = signal<string>('');
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      // Auto-scroll when messages change
      if (this.messages()) {
        this.scrollToBottom();
      }
    });
  }

  async sendMessage(): Promise<void> {
    const messageText = this.userInput().trim();
    if (!messageText || this.isLoading()) {
      return;
    }

    // Add user message to chat
    this.messages.update(current => [...current, { role: 'user', parts: [{ text: messageText }] }]);
    this.userInput.set('');
    this.isLoading.set(true);
    this.error.set(null);
    this.scrollToBottom();

    // Prepare a placeholder for the model's response
    this.messages.update(current => [...current, { role: 'model', parts: [{ text: '' }] }]);

    try {
      // FIX: The service now returns a Promise that resolves to an async iterator.
      // We must `await` it to get the iterator before using it in the `for await...of` loop.
      const stream = await this.geminiService.sendMessageStream(messageText);
      
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        this.messages.update(current => {
          const lastMessage = current[current.length - 1];
          lastMessage.parts[0].text += chunkText;
          return [...current];
        });
        this.scrollToBottom();
      }
    } catch (e) {
      console.error(e);
      this.error.set('Sorry, something went wrong. Please try again.');
      // Remove the empty model message on error
      this.messages.update(current => current.slice(0, -1));
    } finally {
      this.isLoading.set(false);
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        if(this.scrollContainer) {
          this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        }
      } catch (err) {
        console.error('Could not scroll to bottom:', err);
      }
    }, 0);
  }
}