export const paths = {
  login: 'login',
  help: 'help',
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
