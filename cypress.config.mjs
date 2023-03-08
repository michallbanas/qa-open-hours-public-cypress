import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  env: {
    hideXHRInCommandLog: true,
  },
  retries: {
    runMode: 2,
  },
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 90000,
  requestTimeout: 15000,
  responseTimeout: 45000,
  e2e: {
    baseUrl: "https://www.kiwi.com/en/",
    experimentalMemoryManagement: true,
    experimentalRunAllSpecs: true,
    experimentalWebKitSupport: true,
  },
});
