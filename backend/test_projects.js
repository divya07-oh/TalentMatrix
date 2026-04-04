const { createProject, getUserProjects, updateProgress } = require('./src/controllers/projectController');
const mockProjects = require('./src/utils/mockProjects');

const mockRes = () => {
    const res = {};
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.json = (data) => {
        res.body = data;
        return res;
    };
    return res;
};

const runTest = () => {
    console.log("=== Testing Project Workspace API ===\n");
    
    // 1. Create a project
    console.log("-> 1. Testing Create Project");
    const res1 = mockRes();
    const req1 = {
        body: {
            projectName: "AI Backend Orchestrator",
            members: ["user1", "user2"]
        }
    };
    createProject(req1, res1);
    console.log(`Status: ${res1.statusCode}`);
    console.log(JSON.stringify(res1.body, null, 2));

    const newProjectId = res1.body.data.id;

    // 2. Get User Projects
    console.log("\n-> 2. Testing Get User Projects (for 'user1')");
    const res2 = mockRes();
    const req2 = { params: { userId: "user1" } };
    getUserProjects(req2, res2);
    console.log(`Status: ${res2.statusCode}`);
    console.log(JSON.stringify(res2.body.data.map(p => p.projectName), null, 2));
    
    // 3. Update Progress (Partial)
    console.log("\n-> 3. Testing Update Progress (to 50%)");
    const res3 = mockRes();
    const req3 = {
        params: { id: newProjectId },
        body: { progress: 50 }
    };
    updateProgress(req3, res3);
    console.log(`Status: ${res3.statusCode}`);
    console.log(`Updated Progress: ${res3.body.data.progress}%, Status: ${res3.body.data.status}`);

    // 4. Update Progress (Completion Auto-Status)
    console.log("\n-> 4. Testing Auto-Complete Progress (to 100%)");
    const res4 = mockRes();
    const req4 = {
        params: { id: newProjectId },
        body: { progress: 100 }
    };
    updateProgress(req4, res4);
    console.log(`Status: ${res4.statusCode}`);
    console.log(`Updated Progress: ${res4.body.data.progress}%, Status: ${res4.body.data.status}`);
    
    console.log("\n=== TEST FINISHED ===");
};

runTest();
