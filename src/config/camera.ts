/**
 * Wivacam MW5NK camera configuration.
 * For browser playback: set VITE_CAMERA_STREAM_URL to an HTTP MJPEG/HLS URL
 * (e.g. from a backend proxy that converts RTSP to MJPEG). Browsers cannot play RTSP directly.
 * Prefer env vars in production so credentials are not in source.
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
