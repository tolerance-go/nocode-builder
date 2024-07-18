export const paths = {
  login: 'login',
  register: 'register',
  'view-editor': 'view-editor',
  'data-table-editor': 'data-table-editor',
  'bluemap-editor': 'bluemap-editor',
};

export const editorPathnames = {
  'root.view-editor': '/view-editor',
  'root.data-table-editor': '/data-table-editor',
  'root.bluemap-editor': '/bluemap-editor',
};

export const authPathnames = {
  'root.login': '/login',
  'root.register': '/register',
};

export const fullPathnames = {
  root: '/',
  ...authPathnames,
  ...editorPathnames,
};

export const localKeys = {
  历史记录远程同步管理者_state: 'syncHistoryManagerEmployee_state',
  历史记录远程同步管理者_state_value: 'syncHistoryManagerEmployee_state_value',
};
