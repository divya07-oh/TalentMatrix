async function verifyCollaboration() {
  console.log("--- COLLABORATION SYSTEM VERIFICATION TESTS ---\n");

  const BASE_URL = 'http://localhost:5000/api/collaboration';

  try {
      const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
      
      let res, data;

      // Ensure mock users 's-1712156828551' (student), 's-1712156828552' (student), and '1' (admin) exist.
      // Based on our previous mockUsers update, these should be active.

      // Test 1: Send Request (Valid - Student to Student)
      console.log("Test 1: Send Request (Valid)");
      res = await fetch(`${BASE_URL}/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              senderId: "s-1712156828551",
              receiverId: "s-1712156828552",
              message: "Hi, let's collaborate on a React project!"
          })
      });
      data = await res.json();
      console.log(`Status (Expected 201): ${res.status}`);
      console.log(`Message: ${data.message}`);
      let collabId = data.data ? data.data.id : null;
      console.log();

      // Test 2: Send Duplicate Request (Should fail)
      console.log("Test 2: Send Duplicate Request (Expected to fail)");
      res = await fetch(`${BASE_URL}/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              senderId: "s-1712156828552", // Trying reverse direction
              receiverId: "s-1712156828551"
          })
      });
      data = await res.json();
      console.log(`Status (Expected 400): ${res.status}`);
      console.log(`Message: ${data.message}\n`);

      // Test 3: Send Self Request (Should fail)
      console.log("Test 3: Send Self Request (Expected to fail)");
      res = await fetch(`${BASE_URL}/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              senderId: "s-1712156828551",
              receiverId: "s-1712156828551"
          })
      });
      data = await res.json();
      console.log(`Status (Expected 400): ${res.status}`);
      console.log(`Message: ${data.message}\n`);

      // Test 4: Admin Invite
      console.log("Test 4: Send Admin Invite");
      res = await fetch(`${BASE_URL}/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              senderId: 1, // Admin User
              receiverId: "s-1712156828551",
              message: "Admin verification request."
          })
      });
      data = await res.json();
      console.log(`Status (Expected 201): ${res.status}`);
      console.log(`isAdminInvite Flag: ${data.data && data.data.isAdminInvite}\n`);

      // Test 5: Get User Requests
      console.log("Test 5: Get User Requests for 's-1712156828551'");
      res = await fetch(`${BASE_URL}/user/s-1712156828551`);
      data = await res.json();
      console.log(`Status (Expected 200): ${res.status}`);
      console.log(`Sent Requests: ${data.data.sent.length}`);
      console.log(`Received Requests: ${data.data.received.length}\n`);

      // Test 6: Accept Request
      if (collabId) {
          console.log(`Test 6: Accept Request ID ${collabId}`);
          res = await fetch(`${BASE_URL}/respond/${collabId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: 'accepted' })
          });
          data = await res.json();
          console.log(`Status (Expected 200): ${res.status}`);
          console.log(`Updated Status: ${data.data && data.data.status}\n`);
      }

  } catch (error) {
      console.error("Error during tracking:", error);
  }
}

verifyCollaboration();
