import { RefObject, useEffect, useRef } from 'react';
import { off, on } from 'react-use/esm/misc/util';

const defaultEvents = ['mousedown', 'touchstart'];

const useMultipleClickAway = <E extends Event = Event>(
  refs: RefObject<HTMLElement | null>[],
  onClickAway: (event: E) => void,
  events: string[] = defaultEvents,
) => {
  const savedCallback = useRef(onClickAway);

  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const handler = (event: E) => {
      if (
        refs.every(
          (ref) => ref.current && !ref.current.contains(event.target as Node),
        )
      ) {
        savedCallback.current(event);
      }
    };

    for (const eventName of events) {
      on(document, eventName, handler);
    }

    return () => {
      for (const eventName of events) {
        off(document, eventName, handler);
      }
    };
  }, [events, refs]);
};

export default useMultipleClickAway;
