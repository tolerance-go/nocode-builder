export function ensure(
  condition: boolean,
  ...messages: unknown[]
): asserts condition {
  if (!condition) {
    const formattedMessages = messages
      .map((msg) =>
        typeof msg === "object" ? JSON.stringify(msg, null, 2) : String(msg)
      )
      .join(" ");

    throw new Error(formattedMessages);
  }
}
