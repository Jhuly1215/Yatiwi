export interface TestQuestion {
  id: string;
  lesson_id: string;
  text: Record<string, string>;
  type: string; // e.g., 'multiple_choice', 'open', etc.
  options: string[]; // JSON-encoded array of options
  order: number;
}

export interface TestQuestionCreate extends Omit<TestQuestion, 'id'> {}
