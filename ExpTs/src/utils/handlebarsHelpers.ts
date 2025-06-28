// src/utils/handlebarsHelpers.ts
import Handlebars from 'handlebars';

// Helper para listar tecnologias desenvolvidas com Node.js
Handlebars.registerHelper('listNodeTechnologies', (technologies: any[]) => {
  let result = '<ul>';
  technologies.forEach((tech) => {
    if (tech.poweredByNodejs) {
      result += `<li>${tech.name} - ${tech.type}</li>`;
    }
  });
  result += '</ul>';
  return new Handlebars.SafeString(result);
});

export default Handlebars;
