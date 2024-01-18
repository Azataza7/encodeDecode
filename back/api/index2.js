const express = require('express');
const cors = require('cors');
const Vigenere = require('caesar-salad').Vigenere;

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.post('/encode', (req, res) => {
  const {password, message} = req.body;

  if (!password || !message) {
    return res.status(403).json({error: 'Bad request'});
  }

  const encodedMessage = Vigenere.Cipher(password).crypt(message);
  res.json({encoded: encodedMessage});
});

app.post('/decode', (req, res) => {
  const {password, message} = req.body;

  if (!password || !message) {
    return res.status(403).json({error: 'Bad request'});
  }

  const decodedMessage = Vigenere.Decipher(password).crypt(message);
  res.json({decoded: decodedMessage});
});

app.listen(port, () => {
  console.log('Server started at ' + port);
});

