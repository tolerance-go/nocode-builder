export type WidgetComponentProps = {
  slotElements:
    | Record<
        string,
        React.ReactElement<
          unknown,
          string | React.JSXElementConstructor<unknown>
        >[]
      >
    | undefined;
};
