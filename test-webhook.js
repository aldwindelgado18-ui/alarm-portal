const http = require("node:http");
process.env.PORT = "0";
process.env.SMTP_PORT = "0";
const { startServices } = require("./server");

const server = startServices();

server.once("listening", () => {
  const { port } = server.address();
  const payload = JSON.stringify({
    camera: "Front door",
    location: "Lobby",
    severity: "critical",
    message: "Motion detected"
  });

  const req = http.request({
    host: "127.0.0.1",
    port,
    path: "/api/alerts",
    method: "POST",
    headers: { "Content-Type": "application/json" }
  }, (res) => {
    let body = "";
    res.on("data", (chunk) => { body += chunk; });
    res.on("end", () => {
      console.log(`status=${res.statusCode}`);
      console.log(body);
      server.close(() => process.exit(0));
    });
  });

  req.on("error", (error) => {
    console.error(error);
    process.exit(1);
  });

  req.write(payload);
  req.end();
});
