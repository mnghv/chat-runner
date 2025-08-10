export interface CodeBlock {
  html: string;
  css: string;
  javascript: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system';
  type: 'text' | 'code';
  code?: CodeBlock;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
} 