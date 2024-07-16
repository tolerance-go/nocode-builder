import { editorPathnames } from '@shared/configs';
import { 测试标识 } from '@shared/constants';
import { 验证元素可见性 } from '@cypress/support/helpers';
import { 使用场景 } from '@cypress/support/scenarioUtils';

使用场景('视图管理流程', ({ 假如 }) => {
  假如('用户访问视图编辑页面，应该可以看到对应视图', ({ 那么, 当 }) => {
    当('用户已经登陆，并访问视图编辑页面', () => {
      cy.登录('yb', '123456');
      cy.visit(editorPathnames['root.view-editor']);
    });

    那么('用户可以看到相关视图', () => {
      验证元素可见性(测试标识.视图编辑页面);
    });
  });
});
