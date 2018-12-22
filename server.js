const express = require('express');
const app = express();
const userRouter = require('./routes/user.route');
const bcrypt = require('bcrypt');
var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/jwt-auth', { useNewUrlParser: true})
  .then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/jwt-auth`)})
  .catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/jwt-auth`)});

app.use(express.json())
const port = 3000;
app.listen(port, (req, res)=>{
  console.log('Server is Listening on port 3000...');
});
app.use((err, req, res, next) => {
  return res.status(err.status).json(err)
});

app.get('/api/test', (req, res)=> {
  async function f() {
    var hashed = await bcrypt.hash("123456", 10);
    res.json({message: hashed});
  }
  f();
});

app.use('/api/user', userRouter);