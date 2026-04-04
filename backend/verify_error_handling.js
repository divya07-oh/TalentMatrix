const http = require('http');

const request = (method, path, data) => {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : '';
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
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
    if (postData) req.write(postData);
    req.end();
  });
};

async function runTests() {
  try {
    console.log('--- SIGNUP ERROR TESTS ---');
    
    console.log('Test 1: Invalid Email Format');
    const res1 = await request('POST', '/api/auth/signup', { name: "Test", email: "not-an-email", password: "password123" });
    console.log('Status (Expected 400):', res1.status);
    console.log('Message:', res1.body?.message);

    console.log('\nTest 2: Empty Password');
    const res2 = await request('POST', '/api/auth/signup', { name: "Test", email: "test@example.com", password: "" });
    console.log('Status (Expected 400):', res2.status);
    console.log('Message:', res2.body?.message);

    console.log('\nTest 3: Duplicate Email');
    // First signup an admin
    await request('POST', '/api/auth/signup', { name: "Admin 1", email: "admin@college.edu", password: "password123" });
    const res3 = await request('POST', '/api/auth/signup', { name: "Admin 2", email: "admin@college.edu", password: "some-password" });
    console.log('Status (Expected 400):', res3.status);
    console.log('Message:', res3.body?.message);

    console.log('\n--- LOGIN ERROR TESTS ---');

    console.log('Test 4: Invalid Email Format');
    const res4 = await request('POST', '/api/auth/login', { email: "invalid-email" });
    console.log('Status (Expected 400):', res4.status);
    console.log('Message:', res4.body?.message);

    console.log('\nTest 5: Missing Password for Admin');
    const res5 = await request('POST', '/api/auth/login', { email: "admin@college.edu" });
    console.log('Status (Expected 400):', res5.status);
    console.log('Message:', res5.body?.message);

    console.log('\nTest 6: User Not Found');
    const res6 = await request('POST', '/api/auth/login', { email: "wrong-admin@college.edu", password: "password123" });
    console.log('Status (Expected 404):', res6.status);
    console.log('Message:', res6.body?.message);

    console.log('\nTest 7: Invalid Password');
    const res7 = await request('POST', '/api/auth/login', { email: "admin@college.edu", password: "wrong-password" });
    console.log('Status (Expected 401):', res7.status);
    console.log('Message:', res7.body?.message);

  } catch (err) {
    console.error('Test Failed:', err.message);
  }
}

runTests();
