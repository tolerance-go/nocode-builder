export const paths = {
  root: '/',
  login: 'login',
  register: 'register',
  'view-editor': 'view-editor',
  'data-table-editor': 'data-table-editor',
  'bluemap-editor': 'bluemap-editor',
};

export const editorPaths = {
  'root.view-editor': '/view-editor',
  'root.data-table-editor': '/data-table-editor',
  'root.bluemap-editor': '/bluemap-editor',
};

export const authPaths = {
  'root.login': '/login',
  'root.register': '/register',
};

export const fullPaths = {
  root: '/',
  ...authPaths,
  ...editorPaths,
};
