import { v4 as uuidv4 } from 'uuid';

/**
 * 生成一个唯一的 UUID
 * @returns {string} UUID
 */
export function generateId(): string {
  return uuidv4();
}
