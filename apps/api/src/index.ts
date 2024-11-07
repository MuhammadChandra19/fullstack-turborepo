import startServer from './cmd';

async function main() {
  const app = await startServer();

  const server = Bun.serve({
    port: 3001,
    hostname: '0.0.0.0',
    fetch: app.fetch,
  });

  console.log('server running', server.port);
}

main().catch(console.error);
