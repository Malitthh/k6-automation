import http from 'k6/http';
import { check } from 'k6';

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

export function getrequestID() {

    let data = {
        "data": "All data 1",
        "country": "South Korea",
        "ID": 718
    }

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Token': 'abc1234'
        },
    };

    const url = 'http://abc.test';
    const res = http.post(url, JSON.stringify(data), params);
    const req = JSON.parse(res.body);
    console.log(res.status);
    console.log(req.request_id);

    check(res, {
        'is status 202': (rs) => rs.status === 202,
    });
    return (res.request_id);


}