import { v4 as uuidv4 } from 'uuid';

/**
 * 生成一个唯一的 UUID
 * @returns {string} UUID
 */
export function generateUuid(): string {
  return uuidv4();
}
