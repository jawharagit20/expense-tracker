const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  if (process.env.OPEN_BROWSER === '1') {
    try {
      require('open')(`http://localhost:${port}`);
    } catch (e) {
      // ignore
    }
  }
});
