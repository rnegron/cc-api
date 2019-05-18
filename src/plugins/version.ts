const versionPlugin = {
  plugin: require('hapi-api-version'),
  options: {
    validVersions: [1],
    defaultVersion: 1,
    vendorName: 'cc-api',
  },
};

export default versionPlugin;
