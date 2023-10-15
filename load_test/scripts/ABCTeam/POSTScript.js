import http from "k6/http";
import { check } from "k6";

export const options = {
    thresholds: {
        http_req_duration: ["p(95)<7000"], 
        http_req_duration: ["p(75)<9500"], 
        checks: ["rate>0.95"], 
        http_req_failed: ["rate<0.1"],
    },
    noConnectionReuse: true,
    scenarios: {
        constant_scenario: {
            executor: 'constant-arrival-rate',
            duration: '30s',
            rate: 10,
            timeUnit: '1s',
            preAllocatedVUs: 50,
            maxVUs: 100,
        }
    }
};

export default function () {
    let data = {
        Data: "K6 is a developer-centric, open-source performance testing tool designed to be simple, efficient, and scriptable. It allows you to write test scripts in JavaScript, making it accessible to developers with various backgrounds and expertise levels.",
        Department: "Grafana",
        Software: "K6",
        Date: "15/10/2023",
        Url: "https://url.com"
    };

    const params = {
        headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Token: "gfywegflwegfefguegebffyewfewufweyfvlewf==",
        },
    };

    const url = "http://abc.test";
    const res = http.post(url, JSON.stringify(data), params);
    const req = JSON.parse(res.body);
    console.log(req.request_id, res.status);




      check(res, {
        "is status 202": (rs) => rs.status === 202,
      });

}