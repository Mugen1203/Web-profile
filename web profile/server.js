const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.sql': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
    let safeUrl = req.url;
    try {
        safeUrl = decodeURIComponent(req.url);
    } catch (e) {
        console.error('Error decoding URL:', e);
    }

    // Split query parameters if any (e.g. /main/index.html?ref=logo)
    const urlWithoutQuery = safeUrl.split('?')[0];

    // Redirect root / to /main/index.html
    if (urlWithoutQuery === '/' || urlWithoutQuery === '/index.html') {
        res.writeHead(302, { 'Location': '/main/index.html' });
        res.end();
        return;
    }

    // Resolve target file path
    let filePath = path.join(__dirname, urlWithoutQuery);

    // Read and serve file
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            if (stats && stats.isDirectory()) {
                const indexUrl = path.join(filePath, 'index.html');
                fs.stat(indexUrl, (errIndex, statsIndex) => {
                    if (!errIndex && statsIndex.isFile()) {
                        serveFile(indexUrl, res);
                    } else {
                        serve404(res);
                    }
                });
            } else {
                serve404(res);
            }
        } else {
            serveFile(filePath, res);
        }
    });
});

function serveFile(filePath, res) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('500 - Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

function serve404(res) {
    const errorPagePath = path.join(__dirname, 'main', 'error.html');
    fs.readFile(errorPagePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        }
    });
}

server.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop the server.`);
    console.log(`==================================================\n`);
});
