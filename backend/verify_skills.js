const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

// Create a dummy file for testing purposes
const dummyFilePath = path.join(__dirname, 'dummy_certificate.pdf');
fs.writeFileSync(dummyFilePath, 'This is a dummy PDF file content for testing purposes.');

const BASE_URL = 'http://localhost:5000/api/skills';

async function verifySkills() {
    console.log("--- SKILL UPLOAD & VERIFICATION TESTS ---\n");

    try {
        // Dynamic import for node-fetch
        const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

        // Test 1: Add new skill with valid data
        console.log("Test 1: Add Skill (Valid Data)");
        const form = new FormData();
        form.append('userId', 's-test-999');
        form.append('skillName', 'GraphQL');
        form.append('projectRepoLink', 'https://github.com/alex/graphql-api');
        form.append('certificate', fs.createReadStream(dummyFilePath));

        const res1 = await fetch(`${BASE_URL}/add`, {
            method: 'POST',
            body: form,
            headers: form.getHeaders()
        });
        
        if (!res1.ok) {
            const errText = await res1.text();
            console.error(`Error Response (${res1.status}):`, errText);
            return;
        }

        const data1 = await res1.json();
        console.log(`Status (Expected 201): ${res1.status}`);
        console.log(`Response:`, data1);
        console.log();
        
        let newSkillId = null;
        if(data1.skill) {
             newSkillId = data1.skill.id;
        }

        // Test 2: Get user skills
        console.log("Test 2: Get User Skills");
        const res2 = await fetch(`${BASE_URL}/user/s-test-999`);
        const data2 = await res2.json();
        console.log(`Status (Expected 200): ${res2.status}`);
        console.log(`Response length: ${data2.skills.length}`);
        console.log();

        // Test 3: Admin verify skill (approve)
        if (newSkillId) {
            console.log(`Test 3: Verify Skill (Approve) - ID: ${newSkillId}`);
            const res3 = await fetch(`${BASE_URL}/verify/${newSkillId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'approved' })
            });
            const data3 = await res3.json();
            console.log(`Status (Expected 200): ${res3.status}`);
            console.log(`Updated Status: ${data3.skill.status}\n`);
        }

        // Cleanup dummy file
        fs.unlinkSync(dummyFilePath);

    } catch (error) {
        console.error("Error during verification:", error);
    }
}

verifySkills();
