const express = require('express');
const cors = require('cors');
const routesApi = require('./routes');
const app = express();

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());

routesApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

