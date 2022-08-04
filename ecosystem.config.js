module.exports = {
    apps: [
        {
          name: 'mafft-ws',
          script: './app.js',
          watch: true,
          env: {
              'PORT': 9001,
              'NODE_ENV': 'local'
          },
          env_production: {
              'PORT': 9001,
              'NODE_ENV': 'production'
          }
        }
    ]
  };
