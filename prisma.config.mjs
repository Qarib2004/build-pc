// import "dotenv/config";
import { defineConfig } from "prisma/config";




export default defineConfig({
  schema: "prisma/schema.prisma",
});

// export default defineConfig({
//   schema: "prisma/schema.prisma",
//   migrations: {
//     seed: "tsx prisma/seed.ts", // просто строка с командой запуска
//   },
//   datasource: {
//     url: process.env.DATABASE_URL,
//   },
// });