// const express = require("express");
// const app = express();
// const port = 3000;

// app.use(express.json());

// // Function to generate a unique sessionId
// const generateSessionId = () => {
//   return Date.now().toString(36) + Math.random().toString(36).substring(2);
// };

// // Server route to obtain the session ID
// app.get("/start-quiz", (req, res) => {
//   const sessionId = generateSessionId();
//   res.json({ sessionId });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
