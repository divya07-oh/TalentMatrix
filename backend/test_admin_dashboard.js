const { getDashboardStats } = require('./src/controllers/adminController');
const fs = require('fs');

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

const res = mockRes();
getDashboardStats({}, res);
fs.writeFileSync('admin_dashboard_output.json', JSON.stringify({ statusCode: res.statusCode, body: res.body }, null, 2));
console.log("Output written to admin_dashboard_output.json");
