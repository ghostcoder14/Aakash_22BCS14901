import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import cors from 'cors';

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Hardcoded user details
const USER_ID = "aakash_ojha_05022003";
const EMAIL = "22BCS14901@cuchd.in";
const ROLL_NUMBER = "22BCS14901";

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        // Input validation
        if (!req.body.data || !Array.isArray(req.body.data)) {
            return res.status(400).json({
                is_success: false,
                user_id: USER_ID,
                email: EMAIL,
                roll_number: ROLL_NUMBER,
                numbers: [],
                alphabets: [],
                highest_alphabet: []
            });
        }

        const inputData = req.body.data;
        const numbers = [];
        const alphabets = [];

        // Process each element in the input array
        inputData.forEach(item => {
            const strItem = String(item);
            if (/^\d+$/.test(strItem)) {
                numbers.push(strItem);
            } else if (/^[a-zA-Z]$/.test(strItem)) {
                alphabets.push(strItem);
            }
        });

        // Find highest alphabet
        let highestAlphabet = [];
        if (alphabets.length > 0) {
            const upperCaseAlphabets = alphabets.map(char => char.toUpperCase());
            const highest = String.fromCharCode(
                Math.max(...upperCaseAlphabets.map(char => char.charCodeAt(0)))
            );
            highestAlphabet = alphabets.filter(char => 
                char.toUpperCase() === highest
            );
        }

        // Prepare response
        const response = {
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highestAlphabet
        };

        res.json(response);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({
            is_success: false,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers: [],
            alphabets: [],
            highest_alphabet: []
        });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});