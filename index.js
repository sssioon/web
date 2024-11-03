const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/editor.html', (req, res) => {
    res.sendFile(__dirname + '/public/editor.html');
});

// 创建代理路由，用于获取外部网页内容
app.get('/proxy', (req, res) => {
    const url = req.query.url;
    request(url, (error, response, body) => {
        if (error) return res.status(500).send('获取网页失败');
        res.send(body);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
