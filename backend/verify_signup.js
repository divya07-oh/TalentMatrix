const http = require('http');

const testSignup = (data) => {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/signup',
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
        resolve({ status: res.statusCode, body: JSON.parse(responseBody) });
      });
    });

    req.on('error', (e) => { reject(e); });
    req.write(postData);
    req.end();
  });
};

async function runTests() {
  try {
    console.log('Test 1: Student Signup');
    const res1 = await testSignup({ name: "Student One", email: "student@example.com", password: "password-student-1" });
    console.log('Status:', res1.status);
    console.log('Body:', JSON.stringify(res1.body, null, 2));

    console.log('\nTest 2: Admin Signup (@talentmatrix.edu)');
    const res2 = await testSignup({ name: "Admin Two", email: "admin2@talentmatrix.edu", password: "password-admin-2" });
    console.log('Status:', res2.status);
    console.log('Body:', JSON.stringify(res2.body, null, 2));

    console.log('\nTest 3: Duplicate Email');
    const res3 = await testSignup({ name: "Student Duplicate", email: "student@example.com", password: "password-any" });
    console.log('Status:', res3.status);
    console.log('Body:', JSON.stringify(res3.body, null, 2));

  } catch (err) {
    console.error('Test Failed:', err.message);
  }
}

runTests();
