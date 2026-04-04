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
    console.log('--- SIGNUP TESTS ---');
    
    console.log('Test 1: Admin Signup (admin@mit.edu)');
    const res1 = await request('POST', '/api/auth/signup', { name: "Mit Admin", email: "admin@mit.edu", password: "mit-password" });
    console.log('Status:', res1.status);
    console.log('Role:', res1.body?.user?.role);

    console.log('\nTest 2: Student Signup (john@mit.edu)');
    const res2 = await request('POST', '/api/auth/signup', { name: "John Doe", email: "john@mit.edu", password: "password123" });
    console.log('Status:', res2.status);
    console.log('Role:', res2.body?.user?.role);

    console.log('\n--- LOGIN TESTS ---');

    console.log('Test 3: Student Login Bypass (john@mit.edu)');
    const res3 = await request('POST', '/api/auth/login', { email: "john@mit.edu" });
    console.log('Status:', res3.status);
    console.log('Body:', JSON.stringify(res3.body, null, 2));

    console.log('\nTest 4: Admin Login (admin@mit.edu) - Should FAIL without password');
    const res4 = await request('POST', '/api/auth/login', { email: "admin@mit.edu" });
    console.log('Status:', res4.status);
    console.log('Body:', JSON.stringify(res4.body, null, 2));

    console.log('\nTest 5: Admin Login with Password (admin@mit.edu)');
    const res5 = await request('POST', '/api/auth/login', { email: "admin@mit.edu", password: "mit-password" });
    console.log('Status:', res5.status);
    console.log('Body:', JSON.stringify(res5.body, null, 2));

  } catch (err) {
    console.error('Test Failed:', err.message);
  }
}

runTests();
