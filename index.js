const express = require('express');
const app = express();
const port = 3001;

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('<h1>Welcome to My Express App</h1><p>Use /name?id=yourname to see your name.</p>');
});

app.get('/name', (req, res) => {
    const name = req.query.id || 'No name provided';
    console.log(req.query);

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Name Display</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <div class="container">
                <h1>Name Viewer</h1>
                <p>Your Name: <span class="highlight">${name}</span></p>
                <form action="/name" method="get">
                    <label for="id">Enter your name:</label>
                    <input type="text" id="id" name="id" required>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
