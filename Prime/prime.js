const express = require('express');
const app = express();

function isPrime(num) {
  if (num < 2) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

app.get('/prime_numbers/:num', (req, res) => {
  const num = parseInt(req.params.num);
  const primeNumbers = [];
  for (let i = 2; i <= num; i++) {
    if (isPrime(i)) {
      primeNumbers.push(i);
    }
  }
  res.json(primeNumbers);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// type http://localhost:3000/prime_numbers/20  on browser to see results
