const express = require('express');
const connectDB=require('./config/db');

const app = express();

//connect database
connectDB();

app.get('/', (req,res) => res.send('API Running'))

//Define Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));

const Port = process.env.Port || 4000;

app.listen(Port,()=>console.log(`Server started on port ${Port}`));