import * as designs from "./designs";
import * as components from "./components";
import * as routes from "./routes";
import * as apps from "./apps";
import blueMap from "./blueMap";

import { devtools } from "valtio/utils";
import { proxy } from "valtio";

const states = proxy({
  routes,
  designs,
  components,
  blueMap,
  apps,
});

devtools(states, {
  name: "states",
  enabled: import.meta.env.DEV,
});

export default states;
