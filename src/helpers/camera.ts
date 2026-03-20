/**
 * Camera stream for the browser (MJPEG over HTTP).
 * Browsers cannot play RTSP directly.
 *
 * Blue Iris (web server):
 *   http://<PC_IP>:<port>/mjpg/<camera_short_name>/video.mjpg
 *   Port is often 81 (Settings → Web server). Short name = camera name in Blue Iris (no spaces).
 *   If login is required: http://user:pass@host:port/mjpg/... (or allow anonymous / use a reverse proxy).
 *
 * Local ffmpeg proxy (see scripts/stream-proxy.mjs):
 *   http://localhost:9999/stream
 */

const ip = import.meta.env.VITE_CAMERA_IP;
const username = import.meta.env.VITE_CAMERA_USERNAME;
const password = import.meta.env.VITE_CAMERA_PASSWORD;
const cameraId = import.meta.env.VITE_CAMERA_ID;

/** RTSP URL for HD stream (for backend/proxy use; browsers do not support RTSP) */
export const cameraRtspUrl = `rtsp://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${ip}:554/stream=0`;

/** HTTP stream URL for browser. Set VITE_CAMERA_STREAM_URL to your proxy MJPEG/HLS URL for live view. */
export const cameraStreamUrl = import.meta.env.VITE_CAMERA_STREAM_URL as string | undefined;

export const cameraIdRef = cameraId;
