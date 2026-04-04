const http = require('http');

http.get('http://localhost:5000/api/analytics/overview', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`\nNetwork Request Complete. Status: ${res.statusCode}`);
    console.log("Response Body (Network Level):");
    console.log(JSON.stringify(JSON.parse(data), null, 2));
    process.exit(0);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
  process.exit(1);
});
