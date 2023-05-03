const express = require('express');
const connectDb = require('./config/db');
const i18n = require('i18n');
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 3003;

const app = express();

i18n.configure({
  locales: ['en'],
  directory: path.join(__dirname, '/config/locales'),
});
app.use(i18n.init);

connectDb();
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.send('API running'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
