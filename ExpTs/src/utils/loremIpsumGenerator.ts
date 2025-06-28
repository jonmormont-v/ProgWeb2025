import { LoremIpsum } from "lorem-ipsum";

export function generateLoremIpsum(paragraphs: number): string[] {
  const lorem = new LoremIpsum();
  return Array.from({ length: paragraphs }, () => lorem.generateParagraphs(1));
}
