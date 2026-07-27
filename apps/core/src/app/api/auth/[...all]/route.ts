import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@rynex/auth";

export const { POST, GET } = toNextJsHandler(auth);
