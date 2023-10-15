import http from 'k6/http';
import { check } from 'k6';
import { PostTestScript1 } from "../../support/common/PostTestScript1";

export const options = {
    thresholds: {
        http_req_duration: ["p(95)<3000"], 
        http_req_duration: ["p(75)<1500"], 
        checks: ["rate>0.99"], 
        http_req_failed: ["rate<0.1"],
    },
    noConnectionReuse: true,
    scenarios: {
        constant_scenario: {
            executor: 'per-vu-iterations',
            vus: 1,
            iterations: 10,
            maxDuration: '5m'
            //duration: '3s',
        },
    },
};

export default function () {
    const reqId = getrequestID();
    console.log(reqId);
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Token': 'abc1234'
        },
    };
    const url = 'http://abc.testresults?request_id=' + reqId;
    const res = http.post(url, params);
    console.log(res.status);

    check(res, {
        ' GET status is 200 or 201': (rs) => rs.status === 200 || 201,
    });
}