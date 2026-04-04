const path = require('path');
const fs = require('fs');

// Verify script to check the behavior of our mock notification system 
// and triggers without running the actual Express server (just calling functions).
const mockNotificationsMap = require('./src/utils/mockNotifications');
const { signup } = require('./src/controllers/authController');
const { addSkill, updateSkillStatus } = require('./src/controllers/skillController');
const { sendRequest, respondToRequest } = require('./src/controllers/collaborationController');
const mockUsers = require('./src/utils/mockUsers');

// Mock request and response objects for express controllers
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

const runVerification = async () => {
    console.log("=== STARTING NOTIFICATION SYSTEM VERIFICATION ===\n");
    
    console.log(`Initial mockNotifications count: ${mockNotificationsMap.length}`);

    // 1. Signup a new student
    console.log("-> 1. Testing Signup (Should trigger admin notification)");
    const reqSignup = {
        body: { name: "Test Student", email: "teststudent@college.edu", password: "password123" }
    };
    const resSignup = mockRes();
    signup(reqSignup, resSignup);
    
    if (resSignup.statusCode === 201) {
        console.log("   Signup successful.");
        const newStudentId = resSignup.body.user.id;
        console.log(`   Admin Notification created? ${mockNotificationsMap.some(n => n.type === 'system' && n.message.includes('A new student has registered'))}`);
    } else {
        console.error("   Signup failed:", resSignup.body);
    }

    // Prepare a mock file for skill
    const dummyFilePath = path.join(__dirname, 'dummy.pdf');
    if (!fs.existsSync(dummyFilePath)) {
        fs.writeFileSync(dummyFilePath, 'dummy');
    }

    // 2. Add a new skill
    console.log("\n-> 2. Testing Add Skill (Should trigger admin notification)");
    const reqAddSkill = {
        body: { userId: mockUsers[mockUsers.length - 1].id, skillName: "React Verification", projectRepoLink: "" },
        file: { path: dummyFilePath }
    };
    const resAddSkill = mockRes();
    addSkill(reqAddSkill, resAddSkill);

    if (resAddSkill.statusCode === 201) {
        console.log("   Add Skill successful.");
        const skillId = resAddSkill.body.skill.id;
        console.log(`   Admin Notification created? ${mockNotificationsMap.some(n => n.type === 'system' && n.message.includes('A new skill is pending verification'))}`);

        // 3. Approve skill
        console.log("\n-> 3. Testing Verify Skill (Should trigger student notification)");
        const reqVerifySkill = {
            params: { skillId },
            body: { status: 'approved' }
        };
        const resVerifySkill = mockRes();
        updateSkillStatus(reqVerifySkill, resVerifySkill);
        
        if (resVerifySkill.statusCode === 200) {
           console.log("   Verify Skill successful.");
           console.log(`   Student Notification created? ${mockNotificationsMap.some(n => n.type === 'skill' && n.message.includes('Your skill has been approved'))}`);
        }
    } else {
        console.error("   Add Skill failed:", resAddSkill.body);
    }

    // Clean up
    if (fs.existsSync(dummyFilePath)) {
        fs.unlinkSync(dummyFilePath);
    }

    // 4. Send Collaboration Request
    console.log("\n-> 4. Testing Send Collaboration Request (Should trigger admin & student notification)");
    // Get another user to be receiver
    const senderUser = mockUsers[mockUsers.length - 1]; // "teststudent"
    const receiverUser = mockUsers.find(u => u.id !== senderUser.id && u.role === 'student') || mockUsers[1];
    
    if (receiverUser) {
        const reqSendRequest = {
            body: { senderId: senderUser.id, receiverId: receiverUser.id, message: "Let's build something" }
        };
        const resSendRequest = mockRes();
        sendRequest(reqSendRequest, resSendRequest);

        if (resSendRequest.statusCode === 201) {
             console.log("   Send Request successful.");
             const requestId = resSendRequest.body.data.id;
             console.log(`   Admin Notification created? ${mockNotificationsMap.some(n => n.type === 'collaboration' && n.message.includes('A new collaboration request was created') && n.userId === '1')}`);
             console.log(`   Receiver Notification created? ${mockNotificationsMap.some(n => n.type === 'collaboration' && n.message.includes('You received a collaboration request') && n.userId === receiverUser.id.toString())}`);

             // 5. Accept Collaboration
             console.log("\n-> 5. Testing Respond Collaboration Request (Should trigger student notification)");
             const reqRespond = {
                 params: { id: requestId },
                 body: { status: 'accepted' }
             };
             const resRespond = mockRes();
             respondToRequest(reqRespond, resRespond);
             
             if (resRespond.statusCode === 200) {
                 console.log("   Respond Request successful.");
                 console.log(`   Sender Notification created? ${mockNotificationsMap.some(n => n.type === 'collaboration' && n.message.includes('Your collaboration request was accepted') && n.userId === senderUser.id.toString())}`);
             } else {
                 console.error("   Respond Request failed:", resRespond.body);
             }
        } else {
            console.error("   Send Request failed:", resSendRequest.body);
        }
    } else {
        console.error("   No receiver available to test collaboration.");
    }

    console.log("\n-> Listing all notifications generated:\n", mockNotificationsMap);
    console.log("\n=== VERIFICATION COMPLETE ===");
};

runVerification();
