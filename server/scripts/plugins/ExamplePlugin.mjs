import { Plugin } from './Plugin';

export class ExamplePlugin extends Plugin {
  constructor() {
    super('examplePlugin');
  }

  registerHelpers(handlebars) {
    handlebars.registerHelper('exampleHelper', (str) => {
      return str.toUpperCase();
    });
  }

  registerOptions(program) {
    program.option('--exampleOption <value>', 'An example option');
  }

  processTemplateVariables(templateVariables) {
    if (templateVariables.exampleOption) {
      templateVariables.exampleProcessed = `Processed: ${templateVariables.exampleOption}`;
    }
  }
}
