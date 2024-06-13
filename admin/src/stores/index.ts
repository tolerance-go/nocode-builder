import * as designs from "./designs";
import * as components from "./components";

import { devtools } from "valtio/utils";

devtools(designs.states, {
  name: "designs.states",
  enabled: true,
});

devtools(components.states, {
  name: "components.states",
  enabled: true,
});

export default { designs, components };
