'use strict';

const app = require('./app');

const { PORT = 3000 } = process.env;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
