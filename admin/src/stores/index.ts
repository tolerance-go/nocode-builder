import * as designs from "./design";
import * as components from "./component";
import * as routes from "./route";
import * as apps from "./app";
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
