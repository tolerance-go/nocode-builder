import * as designs from "./designs";
import * as components from "./components";
import * as routes from "./routes";
import * as apps from "./apps";
import * as blueMap from "./blueMap";
import * as projects from "./projects";

import { devtools } from "valtio/utils";
import { proxy } from "valtio";

const store = proxy({
  routes,
  designs,
  components,
  blueMap,
  apps,
  projects,
});

devtools(store, {
  name: "stores",
  enabled: import.meta.env.DEV,
});

export default store;
