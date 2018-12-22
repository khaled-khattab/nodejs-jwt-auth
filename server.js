const express = require('express')
const app = express();

const port = 3000;
app.listen(port, (req, res)=>{
  console.log('Server is Listening on port 3000...');
});

app.get('/api/test', (req, res)=> {
  res.json({message: 'Hello World!'});
})