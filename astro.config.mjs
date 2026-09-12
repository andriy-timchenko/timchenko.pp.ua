// import { defineConfig } from "astro/config";

// import tailwindcss from "@tailwindcss/vite";

// // https://astro.build/config
// export default defineConfig({
//   vite: {
//     plugins: [tailwindcss()]
//   }
// });

import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://timchenko.pp.ua",
  base: "/",
  vite: {
    plugins: [tailwindcss()]
  }
});
