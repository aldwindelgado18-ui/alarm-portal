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

For production, put the service behind TLS/reverse proxy and use a real SMTP certificate or an SMTP relay. Port `2525` is intentionally used for local development because ports below 1024 may require elevated permissions.
