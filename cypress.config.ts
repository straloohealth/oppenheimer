import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://painel.straloo.com.br',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false
  },
  watchForFileChanges: true,
  defaultCommandTimeout: 30000
});
