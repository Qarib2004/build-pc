// import "dotenv/config";
// import { defineConfig } from "prisma/config";


import { defineConfig } from "prisma/config";
import { PrismaNeon } from "@prisma/adapter-neon";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    adapter: new PrismaNeon(process.env.DATABASE_URL),
  },
});


// export default defineConfig({
//   schema: "prisma/schema.prisma",
// });

// export default defineConfig({
//   schema: "prisma/schema.prisma",
//   migrations: {
//     seed: "tsx prisma/seed.ts", // просто строка с командой запуска
//   },
//   datasource: {
//     url: process.env.DATABASE_URL,
//   },
// });