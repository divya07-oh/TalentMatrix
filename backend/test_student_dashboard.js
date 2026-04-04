const { getDashboardStats } = require('./src/controllers/studentController');
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

const req1 = { params: { userId: "s-1712156828551" } };
const res1 = mockRes();
getDashboardStats(req1, res1);

const output = {
  validUserResponse: {
    status: res1.statusCode,
    body: res1.body
  }
};

const req2 = { params: { userId: "invalid_id_999" } };
const res2 = mockRes();
getDashboardStats(req2, res2);

output.invalidUserResponse = {
  status: res2.statusCode,
  body: res2.body
};

fs.writeFileSync('test_student_output.json', JSON.stringify(output, null, 2), 'utf8');
console.log('done');
