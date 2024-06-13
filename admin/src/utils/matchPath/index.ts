export const matchPath = (
  pattern: string,
  currentPath: string
): Record<string, string> | null => {
  const pathSegments = pattern.split("/").filter((segment) => segment !== "");
  const currentPathSegments = currentPath
    .split("/")
    .filter((segment) => segment !== "");

  let pathIndex = 0;
  let currentIndex = 0;
  const params: Record<string, string> = {};

  while (
    pathIndex < pathSegments.length &&
    currentIndex < currentPathSegments.length
  ) {
    const pathSegment = pathSegments[pathIndex];
    const currentSegment = currentPathSegments[currentIndex];

    if (pathSegment === "*") {
      params["*"] = currentPathSegments.slice(currentIndex).join("/");
      return params;
    }

    if (pathSegment.startsWith(":")) {
      const paramName = pathSegment.replace("?", "").substring(1);
      const isOptional = pathSegment.endsWith("?");
      if (isOptional) {
        pathIndex++;
        if (pathIndex === pathSegments.length) {
          params[paramName] = currentSegment;
          return params;
        }
        if (pathSegments[pathIndex] === currentSegment) {
          continue;
        }
        params[paramName] = currentSegment;
        currentIndex++;
        continue;
      }
      params[paramName] = currentSegment;
      pathIndex++;
      currentIndex++;
      continue;
    }

    if (pathSegment !== currentSegment) {
      return null;
    }

    pathIndex++;
    currentIndex++;
  }

  while (
    pathIndex < pathSegments.length &&
    pathSegments[pathIndex].endsWith("?")
  ) {
    pathIndex++;
  }

  if (pathIndex < pathSegments.length && pathSegments[pathIndex] === "*") {
    params["*"] = currentPathSegments.slice(currentIndex).join("/");
    return params;
  }

  if (
    pathIndex === pathSegments.length &&
    currentIndex === currentPathSegments.length
  ) {
    return params;
  }

  return null;
};
