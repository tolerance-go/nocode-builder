import { Plugin } from './Plugin';
import { Command } from 'commander';
import Handlebars from 'handlebars';

export class ExamplePlugin extends Plugin {
  constructor() {
    super('examplePlugin');
  }

  registerHelpers(handlebars: typeof Handlebars): void {
    handlebars.registerHelper('exampleHelper', (str: string) => {
      return str.toUpperCase();
    });
  }

  registerOptions(program: Command): void {
    program.option('--exampleOption <value>', 'An example option');
  }

  processTemplateVariables(templateVariables: Record<string, any>): void {
    if (templateVariables.exampleOption) {
      templateVariables.exampleProcessed = `Processed: ${templateVariables.exampleOption}`;
    }
  }
}
