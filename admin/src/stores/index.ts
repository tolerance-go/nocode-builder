import * as navs from "./navs";
import * as designs from "./designs";
import * as components from "./components";

import { devtools } from "valtio/utils";

devtools(navs.states.currentSystemPaths, {
  name: "currentSystemPaths",
  enabled: true,
});

// devtools(designs.states.designTreeData, {
//   name: "designs.states.designTreeData",
//   enabled: true,
// });

export default { navs, designs, components };
