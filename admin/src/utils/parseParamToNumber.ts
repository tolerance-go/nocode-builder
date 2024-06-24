export function parseParamToNumber<T>(param: T): T | number {
  const parsed = Number(param);
  return isNaN(parsed) ? param : parsed;
}
