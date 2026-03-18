/**
 * Local proxy: converts Wivacam RTSP stream to MJPEG over HTTP so the browser can display it.
 * Run: node scripts/stream-proxy.mjs
 * Then set VITE_CAMERA_STREAM_URL=http://localhost:9999/stream in .env.local
 *
 * Requires ffmpeg on PATH.
 */

import { createServer } from 'http';
import { spawn } from 'child_process';

const PORT = Number(process.env.STREAM_PROXY_PORT) || 9999;

const ip = process.env.VITE_CAMERA_IP ?? '192.168.2.4';
const username = process.env.VITE_CAMERA_USERNAME ?? 'Fuglehuset';
const password = process.env.VITE_CAMERA_PASSWORD ?? 'AlleFuglerSmaaDeEr1415';
const rtspUrl = `rtsp://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${ip}:554/stream=0`;

function sendError(res, statusCode, message) {
  if (res.writableEnded) return;
  res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
  res.end(message);
}

const server = createServer((req, res) => {
  if (req.url !== '/stream' && req.url !== '/stream/') {
    res.writeHead(404);
    res.end();
    return;
  }

  const ffmpeg = spawn(
    'ffmpeg',
    [
      '-rtsp_transport',
      'tcp',
      '-i',
      rtspUrl,
      '-f',
      'mjpeg',
      '-q:v',
      '5',
      '-',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );

  let headersSent = false;

  function startStream(firstChunk) {
    if (headersSent) return;
    headersSent = true;
    res.writeHead(200, {
      'Content-Type': 'multipart/x-mixed-replace; boundary=ffmpeg',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    });
    res.write(firstChunk);
    ffmpeg.stdout.pipe(res);
  }

  ffmpeg.stdout.once('data', (chunk) => startStream(chunk));

  ffmpeg.stderr.on('data', (d) => process.stderr.write(d));

  ffmpeg.on('error', (err) => {
    console.error('ffmpeg error:', err.message);
    sendError(res, 503, 'ffmpeg not available or failed to start');
    ffmpeg.kill('SIGTERM');
  });

  ffmpeg.on('exit', (code) => {
    if (!headersSent && code !== 0) {
      sendError(res, 503, 'Stream unavailable (camera unreachable or ffmpeg failed)');
    }
  });

  req.on('close', () => {
    ffmpeg.kill('SIGTERM');
  });
});

server.listen(PORT, () => {
  console.log(`Stream proxy: http://localhost:${PORT}/stream`);
  console.log('Set VITE_CAMERA_STREAM_URL=http://localhost:' + PORT + '/stream in .env.local');
});
