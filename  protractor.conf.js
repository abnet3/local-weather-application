exports.config = {
  baseUrl: 'http://localhost:4200',
  capabilities: {
    browserName: 'chrome',
  },
  specs: ['./e2e/**/*.e2e-spec.ts'],
}
