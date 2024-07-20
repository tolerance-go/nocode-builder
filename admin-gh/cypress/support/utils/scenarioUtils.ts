// 定义步骤函数类型
type StepFunction<T = void> = (
  description: string,
  callback: (args: T) => void,
) => void;

type StepFunctionWithOnly<T = void> = StepFunction<T> & {
  only: StepFunction<T>;
};

type GivenCallbackArgs = {
  /**
   * 当 / 当...时
   */
  当: StepFunction;
  /**
   * 那么 / 然后
   */
  那么: StepFunction;
  /**
   * 并且 / 和
   */
  并且: StepFunction;
  /**
   * 但是 / 但
   */
  但是: StepFunction;
};

type ScenarioFunction = (
  description: string,
  steps: (args: {
    /**
     * 假如 / 已知
     */
    假如: StepFunctionWithOnly<GivenCallbackArgs>;
  }) => void,
) => void;

/**
 * 使用场景
 *
 * @param description
 * @param steps
 */
export const 使用场景: ScenarioFunction = (description, steps) => {
  describe(description, () => {
    beforeEach(() => {
      // 清除 localStorage
      cy.clearLocalStorage();

      cy.window().then((win) => {
        const databases = ['localforage']; // 列出你要清除的数据库名称
        databases.forEach((dbName) => {
          win.indexedDB.deleteDatabase(dbName);
        });
      });
    });

    const createGivenFunction = (
      itFunction: (desc: string, cb: () => void) => void,
    ): StepFunctionWithOnly<GivenCallbackArgs> => {
      const Given: StepFunctionWithOnly<GivenCallbackArgs> = (
        description,
        callback,
      ) => {
        const When: StepFunction = (description, callback) => {
          cy.log(`当：${description}`);
          callback();
        };

        const Then: StepFunction = (description, callback) => {
          cy.log(`那么：${description}`);
          callback();
        };

        const And: StepFunction = (description, callback) => {
          cy.log(`并且：${description}`);
          callback();
        };

        const But: StepFunction = (description, callback) => {
          cy.log(`但是：${description}`);
          callback();
        };

        itFunction(`假如：${description}`, () => {
          callback({
            当: When,
            那么: Then,
            并且: And,
            但是: But,
          });
        });
      };

      Given.only = (description, callback) => {
        createGivenFunction(it.only)(description, callback);
      };

      return Given;
    };

    const Given = createGivenFunction(it);

    // 执行步骤
    steps({ 假如: Given });
  });
};
