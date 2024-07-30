export function redirectToLogin() {
  redirectTo('login');
}

export function redirectToHome() {
  redirectTo('');
}

export function redirectTo(路径片段: string) {
  window.location.href = `${import.meta.env.BASE_URL}${路径片段}`;
}
