
import type { LucideIcon } from 'lucide-react';

export interface UseCase {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export interface CodeSnippet {
  lang: string;
  code: string;
  Icon: LucideIcon;
}

export interface Model {
  name: string;
  description: string;
  category: string;
  Icon: LucideIcon;
  tags: string[];
  isOpenSource?: boolean;
  supportsChat?: boolean;
  
  // Detailed view fields
  baseModel?: string;
  parameters?: string;
  license?: string;
  datasets?: string[];
  useCases?: UseCase[];
  codeSnippets?: CodeSnippet[];
  huggingFaceUrl?: string;
}
