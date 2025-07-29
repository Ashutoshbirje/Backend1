const express = require("express");
const router = express.Router();
const { exec } = require("child_process");

router.post("/fir-aI", async (req, res) => {
  const userInput = req.body.input;

  // Sanitize the input to escape any double quotes
  const sanitizedInput = userInput.replace(/"/g, '\\"');

  // Execute the Python script
  exec(`python3 predict_ipc.py "${sanitizedInput}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error}`);
      return res.json({ output: "Error in prediction process." });
    }

    if (stderr) {
      console.error(`Python error: ${stderr}`);
      return res.json({ output: "Python script error." });
    }

    const result = stdout.trim();
    res.json({ output: result });
  });
});

module.exports = router;
