import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    // vinext plugin (provides all next/* shims, routing, SSR, RSC).
    // @vitejs/plugin-rsc is auto-registered when app/ is detected.
    vinext(),

    // Cloudflare Workers plugin — builds for workerd runtime.
    // The worker entry runs in the RSC environment, with SSR as a child.
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    })
  ],
  resolve: {
    alias: {
      // next/compat/router ships a CJS entry; alias to the ESM version instead.
      "next/compat/router": resolve("./node_modules/next/dist/esm/client/compat/router.js"),
    },
  },
});
