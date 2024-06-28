import { State, StateCreator, StoreMutatorIdentifier } from "zustand";

type Logger = <
  T extends State,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T extends State>(
  f: StateCreator<T, [], []>,
  name?: string,
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...args) => {
    const prevState = get();
    set(...args);
    const nextState = get();
    console.log(...(name ? [`[${name}] Action:`] : ["Action:"]), args[2]);
    console.log(
      ...(name ? [`[${name}] Previous State:`] : ["Previous State:"]),
      prevState,
    );
    console.log(
      ...(name ? [`[${name}] Next State:`] : ["Next State:"]),
      nextState,
    );
  };

  const setState = store.setState;
  store.setState = (...args) => {
    const prevState = get();
    setState(...args);
    const nextState = get();
    console.log(...(name ? [`[${name}] Action:`] : ["Action:"]), args[2]);
    console.log(
      ...(name ? [`[${name}] Previous State:`] : ["Previous State:"]),
      prevState,
    );
    console.log(
      ...(name ? [`[${name}] Next State:`] : ["Next State:"]),
      nextState,
    );
  };

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;
