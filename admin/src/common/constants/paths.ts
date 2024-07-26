export const pathItems = {
  login: 'login',
  register: 'register',
  'view-editor': 'view-editor',
  'data-table-editor': 'data-table-editor',
  'bluemap-editor': 'bluemap-editor',
};

export const editorPathnames = {
  'root.view-editor': `/${pathItems['view-editor']}`,
  'root.data-table-editor': `/${pathItems['data-table-editor']}`,
  'root.bluemap-editor': `/${pathItems['bluemap-editor']}`,
};

export const authPathnames = {
  'root.login': `/${pathItems['login']}`,
  'root.register': `/${pathItems['register']}`,
};

export const fullPathnames = {
  root: '/',
  ...authPathnames,
  ...editorPathnames,
};
