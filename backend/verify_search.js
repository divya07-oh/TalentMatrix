async function verifySearch() {
  console.log("--- SEARCH MODULE VERIFICATION TESTS ---\n");

  const BASE_URL = 'http://localhost:5000/api/search/skills';

  try {
      // Dynamic import for node-fetch
      const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

      // Test 1: Missing skill param
      console.log("Test 1: Search without skill param");
      let res = await fetch(BASE_URL);
      let data = await res.json();
      console.log(`Status (Expected 400): ${res.status}`);
      console.log(`Message: ${data.message}\n`);

      // Test 2: Search for 'react.js' (matches both case-insensitive)
      console.log("Test 2: Search for 'react.js'");
      res = await fetch(`${BASE_URL}?skill=react.js`);
      data = await res.json();
      console.log(`Status (Expected 200): ${res.status}`);
      console.log(`Users found: ${data.data.length}`);
      if (data.data.length > 0) {
        console.log(`First User: ${data.data[0].name} - Skills: ${data.data[0].skills.map(s => s.skillName).join(', ')}`);
      }
      console.log();

      // Test 3: Search for 'python' with college filter
      // Add a dummy Python skill for a student from 'stanford' to make it interesting
      // Actually we'll just test the existing mock data first. The mock data has python for s-1712156828552
      console.log("Test 3: Search for 'python' with no college filter");
      res = await fetch(`${BASE_URL}?skill=python`);
      data = await res.json();
      console.log(`Status (Expected 200): ${res.status}`);
      console.log(`Users found: ${data.data.length}\n`);

      // Test 4: Search for non-existent skill
      console.log("Test 4: Search for 'cobol'");
      res = await fetch(`${BASE_URL}?skill=cobol`);
      data = await res.json();
      console.log(`Status (Expected 200): ${res.status}`);
      console.log(`Users found: ${data.data.length}`);
      console.log(`Message: ${data.message}\n`);

  } catch (error) {
      console.error("Error during verification:", error);
  }
}

verifySearch();
