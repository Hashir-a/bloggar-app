const express = require('express');
const connectDb = require('./config/db');

const PORT = process.env.PORT || 3003;

const app = express();

connectDb();
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
