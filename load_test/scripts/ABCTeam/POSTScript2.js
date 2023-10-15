import http from "k6/http";
import { check } from "k6";
import { PostTestScriptArray } from "../../support/common/PostTestScriptArray";

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
            iterations: 1,
            maxDuration: '1h',
        }
    }
};

export default function () {
    const requestIds = getrequestIDs ();

    console.log(requestIds, "requestIds");
    const params = {
        headers: {
            "Content-Type": 'application/json',
            "Accept": '*/*',
            "Token": 'bvrfvluewfbwefbeyflqevqejcve=='
        },
    };

    let res;

    for (let i = 0; i < requestIds.length; i++) {
        const reqId = requestIds[i];
        console.log("Request ID:", reqId);

        let mainStatus;


        while (mainStatus !== 'Completed') {
            const url = 'http://abc.testresults?request_id=' + reqId + '&result=false';
            console.log(url);
            res = http.get(url, params);
            console.log(res.status);
            const responseBody = res.json();
            mainStatus = responseBody.Status;
        }

        check(res, {
            'HTTP Status is 200': (r) => r.status === 200,
        });
    }
}

