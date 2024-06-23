import * as designs from "./designs";
import * as components from "./components";
import * as routes from "./routes";
import blueMap from "./blueMap";

import { devtools } from "valtio/utils";
import { proxy } from "valtio";

const states = proxy({
  routes,
  designs,
  components,
  blueMap,
});

devtools(states, {
  name: "states",
  enabled: true,
});

export default { designs, components, routes, blueMap };
