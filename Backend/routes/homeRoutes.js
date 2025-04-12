// const express = require('express');
// const router = express.Router();

// router.get('/home', (req, res) => {
//     res.send('Welcome to the Home Page!'); // ✅ Fix: Use `res.send`
// });

// module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "Welcome to the home page!" });
});

module.exports = router;
