// 定义步骤函数类型
type StepFunction = (description: string, callback: () => void) => void;
type GivenFunction = (description: string, steps: () => void) => void;

export const When: StepFunction = (description, callback) => {
  cy.log(`When: ${description}`);
  callback();
};

export const Then: StepFunction = (description, callback) => {
  cy.log(`Then: ${description}`);
  callback();
};

export const And: StepFunction = (description, callback) => {
  cy.log(`And: ${description}`);
  callback();
};

export const But: StepFunction = (description, callback) => {
  cy.log(`But: ${description}`);
  callback();
};

export const Given: GivenFunction = (description, steps) => {
  const givens: { description: string; steps: () => void }[] = [];
  givens.push({ description, steps });

  givens.forEach((scenario) => {
    it(scenario.description, scenario.steps);
  });
};
