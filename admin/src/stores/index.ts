import * as navs from "./navs";

import { devtools } from "valtio/utils";

devtools(navs.states.currentSystemPaths, { name: "currentSystemPaths", enabled: true });

export default { navs };
