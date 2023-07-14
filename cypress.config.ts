import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'wj2dde',
  e2e: {
    baseUrl: 'http://localhost:4200',
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
})
