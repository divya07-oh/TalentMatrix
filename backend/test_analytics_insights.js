const { getInsights } = require('./src/controllers/adminController');
const { getOverview } = require('./src/controllers/analyticsController');

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
    console.log("=== Testing Admin Insights API ===");
    const res1 = mockRes();
    getInsights({}, res1);
    console.log(`Status: ${res1.statusCode}`);
    console.log(JSON.stringify(res1.body.data, null, 2));

    console.log("\n=== Testing Analytics Overview API ===");
    const res2 = mockRes();
    getOverview({}, res2);
    console.log(`Status: ${res2.statusCode}`);
    console.log(JSON.stringify(res2.body.data, null, 2));
};

runTest();
