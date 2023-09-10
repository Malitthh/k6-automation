import http from 'k6/http';
import { check } from 'k6';

const jsonData = open("../fixture/test_data_small.json");
const data = JSON.parse(jsonData);

export const options = {
    thresholds: {
        http_req_duration: ["p(95)<3000"], //95% of the requests must finish within 3s
        http_req_duration: ["p(75)<1500"], //75% of the requests must finish within 1.5s
        checks: ["rate>0.99"], //99% pass rate
        http_req_failed: ["rate<0.1"],
    },
    noConnectionReuse: true,
    /*scenarios: {
        constant_scenario: {
            executor: 'per-vu-iterations',
            vus: 1,
            iterations: 10,
            maxDuration: '5m'
            //duration: '3s',
        },
    },*/
};

export function getrequestIDs(jsonData) {

    const url = 'http://abc.test';
    console.log(`test Started: ${new Date().toLocaleTimeString()}`);
    const request_ids = [];

    for (let i = 0; i < data.length; i++) {
        const params = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Token': 'abc1234'
            },
        };

        const res = http.post(url, JSON.stringify(data[i]), params);
        const req = JSON.parse(res.body);
        console.log(res.status);

        check(res, {
            'is status 202': (rs) => rs.status === 202,
        });

        request_ids.push(req.request_id)
    }
    console.log("All Request IDs:", request_ids);
    return request_ids;
}