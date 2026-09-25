const http = require('http');
const fs = require('fs');
const path = require('path');

// Root directory to serve (assets directory)
const ASSETS_ROOT = path.resolve(__dirname, 'assets');
const DEFAULT_PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf'
};

function createServer(port) {
    const server = http.createServer((req, res) => {
        // Parse URL
        const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        let pathname = decodeURIComponent(parsedUrl.pathname);

        // Redirect root to /code/index.html
        if (pathname === '/' || pathname === '') {
            res.writeHead(302, { Location: '/code/index.html' });
            res.end();
            return;
        }

        // Prevent directory traversal
        const safePath = path.normalize(path.join(ASSETS_ROOT, pathname));
        if (!safePath.startsWith(ASSETS_ROOT)) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end('403 Forbidden');
            return;
        }

        // If directory, look for index.html inside
        let filePath = safePath;
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }

        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-cache'
        });

        const stream = fs.createReadStream(filePath);
        stream.on('error', (err) => {
            if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
            }
        });
        stream.pipe(res);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is in use, trying port ${port + 1}...`);
            createServer(port + 1);
        } else {
            console.error('Server error:', err);
        }
    });

    server.listen(port, '0.0.0.0', () => {
        console.log(`Streamly preview server running at:`);
        console.log(`  > Local:   http://localhost:${port}/`);
        console.log(`  > Code:    http://localhost:${port}/code/index.html`);
    });
}

createServer(DEFAULT_PORT);
