const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const port = 3000;
const genAI = new GoogleGenerativeAI("your-key"); 
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


app.get('/:inputMessage', async (req, res) => {
    const inputMessage = req.params.inputMessage;  
    const role = "you can custom bot here!";    
    const prompt = `${role}: ${inputMessage}`;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
		
        res.status(200).json({ reply: responseText });
    } catch (error) {
        console.error("Error API:", error);
        res.status(500).json({ error: "Failed response " });
    }
});

app.listen(port, () => {
    console.log(`API on http://localhost:${port}`);
});
