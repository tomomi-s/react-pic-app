const express = require('express');
const connectDB = require('./config/db');

const app = express();
//connect db
connectDB();

//Init Middlewaer
app.use(express.json({ extended: false}));

app.get('/', (req, res) => 
	res.json({msg:'Hello World'})
)

//Define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))