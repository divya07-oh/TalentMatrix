const { getDashboardStats } = require('./src/controllers/adminController');

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
    console.log("=== Testing Admin Dashboard Stats ===");
    const res = mockRes();
    getDashboardStats({}, res);
    
    if (res.statusCode === 200) {
        console.log("Success! Dashboard Stats:\n");
        console.log(JSON.stringify(res.body, null, 2));
    } else {
        console.error("Error:", res.statusCode, res.body);
    }
};

runTest();
