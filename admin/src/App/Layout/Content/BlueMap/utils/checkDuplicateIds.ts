export const checkDuplicateKeys = <T>(configs: T[], key: keyof T) => {
  const ids = new Set<string>();
  configs.forEach((config) => {
    const keyValue = config[key] as unknown as string;
    if (typeof keyValue !== "string") {
      throw new Error(
        `The specified key '${String(key)}' does not contain a string value.`
      );
    }
    if (ids.has(keyValue)) {
      throw new Error(`Duplicate ${String(key)} found: ${keyValue}`);
    }
    ids.add(keyValue);
  });
};
