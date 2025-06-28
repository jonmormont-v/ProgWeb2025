// src/utils/loremIpsumGenerator.ts
export function generateLoremIpsum(paragraphs: number): string {
    const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt quam id tellus fringilla, vel dictum purus eleifend. Praesent id efficitur risus. Nunc id sem eget sapien vestibulum pretium.`;
  
    return Array(paragraphs).fill(loremText).join('\n\n');
  }
  