import http from 'k6/http';
import { check } from 'k6';
import { PostTestScriptArray } from "../../support/common/PostTestScriptArray";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.2.0/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


export const options = {
    thresholds: {
        http_req_duration: ["p(95)<3000"], //95% of the requests must finish within 3s
        http_req_duration: ["p(75)<1500"], //75% of the requests must finish within 1.5s
        checks: ["rate>0.99"], //99% pass rate
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
    const reqIds = getrequestIDs();
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Token': 'abc1234'
        },
    };

    for (let i = 0; i < reqIds.length; i++) {

        const reqid = reqIds[i];
        console.log("ReqID", reqid);
        const url = 'http://abc.testresults?request_id=' + reqId;
        const res = http.post(url, params);
        console.log(res.status);

        check(res, {
            //'HTTP Status is 200 or 201': (rs) => rs.status === 200 || 201,
            'HTTP Status is 200 or 201': (rs) => rs.status === 200 || rs.status === 201,
            'Response Body "Status"': (rs) => {
                const responseBody = rs.json();
                const checkStatus = responseBody.Status === 'DONE';
                console.log(`Response Body Check Result for Request ID ${reqid}: ${checkStatus}`);
                return checkStatus; 
            }
        });
    }
}

export function handleSummary(data) {
    return {
      "GetScriptArray.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}