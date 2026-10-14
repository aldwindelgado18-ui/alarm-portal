# Alarm Portal

Alarm Portal receives motion-detection emails from an existing AI Alarm Portal and displays them in a live dashboard.

## Run

```powershell
npm install
$env:PORTAL_ID="ai-alarm-portal"
$env:PORTAL_SECRET="use-a-long-shared-secret"
npm start
```

Open `http://localhost:3000`. The web server uses port `3000` by default; SMTP uses port `2525` by default. Set `PORT` and `SMTP_PORT` to change them.

## Connect the existing AI Alarm Portal

Perform the handshake:

```http
POST /api/handshake
Content-Type: application/json

{"portalId":"ai-alarm-portal","secret":"use-a-long-shared-secret","host":"alarm-portal.local"}
```

Configure the existing portal's SMTP sender with the returned host, port, username, and secret. Use a subject such as `[ALARM] Motion detected`. The email body can be JSON:

```json
{"camera":"Camera 1","location":"Parking area","severity":"critical","confidence":0.94,"message":"Person detected"}
```

To accept webhooks from another service on port `5000`, send a POST request to `/api/alerts`:

```bash
curl -X POST http://localhost:3000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{"camera":"Front door","location":"Lobby","severity":"critical","message":"Motion detected"}'
```

## Deployment

Docker is optional. A small Linux VPS running a supported Node.js LTS release is enough for this single-process app. Keep the application behind a TLS-terminating reverse proxy, and persist its JSON data outside the release directory:

```sh
NODE_ENV=production
HOST=127.0.0.1
PORT=3000
SMTP_PORT=2525
PORTAL_ID=your-device-portal-id
PORTAL_SECRET=<unique random value of at least 32 characters>
DATA_DIR=/var/lib/alarm-portal
```

Create `/var/lib/alarm-portal` owned by the service account before starting the service. `DATA_DIR` defaults to the project's `data/` directory for local development. Back up this directory regularly; it contains alarms, sites, user records, settings, and setup history. The service exposes `GET /healthz` for a reverse-proxy or process-manager health check. In production, startup refuses the default or a short `PORTAL_SECRET`.

Configure the reverse proxy to serve HTTPS and forward requests to `127.0.0.1:3000`; firewall the app and SMTP ports from general public access. SMTP on port `2525` is plaintext in this app, so use a trusted private network/tunnel or a TLS-capable SMTP relay rather than exposing it directly to the internet.

**Public-launch blocker:** this project is not yet safe to expose as a multi-user public service. User login and roles are enforced only in the browser, the management APIs are not authenticated, webhook ingestion at `/api/alerts` has no device authentication, and stored user passwords are plaintext. HTTPS and the production secret check do not fix those issues. Before public launch, implement server-side sessions and authorization, password hashing, and per-device webhook credentials/signatures with replay protection. Keep the service private until then.

For local development, port `2525` is intentional because ports below `1024` may require elevated permissions.
