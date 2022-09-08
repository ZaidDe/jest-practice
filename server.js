const app = require('./app');

const PORT = process.env.PORT || 4040;
const { log } = console;

app.listen(PORT, () => {
  log(`Server listening on port: ${PORT}`);
});
