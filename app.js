const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.sendFile(path.join(__dirname, 'public', 'myScript.js'));
  res.sendFile(path.join(__dirname, 'public', 'myStyle.css'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running at :${PORT}`));
