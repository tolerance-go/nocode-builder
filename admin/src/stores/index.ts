import * as designs from "./designs";
import * as components from "./components";
import * as routes from "./routes";
import * as apps from "./apps";
import * as blueMap from "./blueMap";

import { devtools } from "valtio/utils";
import { proxy } from "valtio";

const stores = proxy({
  routes,
  designs,
  components,
  blueMap,
  apps,
});

devtools(stores, {
  name: "stores",
  enabled: import.meta.env.DEV,
});

export default stores;
