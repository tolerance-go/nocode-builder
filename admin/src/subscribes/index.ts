import { useAppStoreBase } from "@/store";

const firstNameSubscriber = (
  ...[state, previous]: Parameters<
    Parameters<typeof useAppStoreBase.subscribe>[0]
  >
) => {
  if (state.firstName !== previous.firstName) {
    useAppStoreBase.getState().updateLastName(state.firstName);
  }
};

useAppStoreBase.subscribe((state, previous) => {
  firstNameSubscriber(state, previous);
});
