module.exports = {
  apps: [
    {
      name: 'web-photobooth',
      cwd: './frontend',
      script: 'bun',
      args: 'run preview --host --port 5173',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
