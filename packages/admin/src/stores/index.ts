import * as designs from "./designs";
import * as components from "./components";
import * as routes from "./routes";

import { devtools } from "valtio/utils";
import { proxy } from "valtio";

const states = proxy({
  routes: routes.states,
  designs: designs.states,
  components: components.states,
});

devtools(states, {
  name: "states",
  enabled: true,
});

export default { designs, components, routes };
