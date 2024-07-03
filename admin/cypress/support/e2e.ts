// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// 定义异常处理器
const uncaughtExceptionHandler = (err: unknown) => {
  if (
    typeof err === 'object' &&
    err !== null &&
    'name' in err &&
    err.name === 'AxiosError'
  ) {
    // const error = err as AxiosError;
    // if (
    //   error.request.responseURL === 'http://localhost:3000/users' &&
    //   error.response?.status === 409 &&
    //   typeof error.response?.data === 'object' &&
    //   error.response?.data !== null &&
    //   'message' in error.response.data &&
    //   error.response.data.message === '用户名已被占用'
    // ) {
    //   return false;
    // }
    return false;
  }
  return true;
};

Cypress.on('uncaught:exception', uncaughtExceptionHandler);
