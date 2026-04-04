const http = require('http');

const testLogin = (data) => {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => { responseBody += chunk; });
      res.on('end', () => {
        try {
          const body = responseBody ? JSON.parse(responseBody) : null;
          resolve({ status: res.statusCode, body });
        } catch (e) {
          resolve({ status: res.statusCode, body: responseBody });
        }
      });
    });

    req.on('error', (e) => { reject(e); });
    req.write(postData);
    req.end();
  });
};

async function runTests() {
  try {
    console.log('Test 1: Student Login (alex@mit.edu)');
    const res1 = await testLogin({ email: "alex@mit.edu" });
    console.log('Status:', res1.status);
    console.log('Body:', JSON.stringify(res1.body, null, 2));

    console.log('\nTest 2: Admin Login (@talentmatrix.edu) - Should FAIL without password');
    const res2 = await testLogin({ email: "admin@talentmatrix.edu" });
    console.log('Status:', res2.status);
    console.log('Body:', JSON.stringify(res2.body, null, 2));

    console.log('\nTest 3: Admin Login with Correct Password');
    const res3 = await testLogin({ email: "admin@talentmatrix.edu", password: "password123" });
    console.log('Status:', res3.status);
    console.log('Body:', JSON.stringify(res3.body, null, 2));

    console.log('\nTest 4: Invalid Domain Login');
    const res4 = await testLogin({ email: "user@example.com", password: "password123" });
    console.log('Status:', res4.status);
    console.log('Body:', JSON.stringify(res4.body, null, 2));

  } catch (err) {
    console.error('Test Failed:', err.message);
  }
}

runTests();
