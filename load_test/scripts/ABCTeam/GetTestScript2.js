import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.2.0/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

var getURL = [];

export const options = {
  thresholds: {
    http_req_duration: ['p(95)<3000'], //95% of the requests must finish within 3s
    checks: ['rate>0.99'], //99% pass rate
    http_req_failed: ['rate<0.1']
  },
  noConnectionReuse: true,
  scenarios: {
    contacts: {
      executor: "constant-vus",
      vus: 1,
      duration: "3s",
    }
  }
};


export default function () {
  let data = `testdata`
  const params = {
    headers: {
      'Content-Type': 'applicaton/json',
      'Accept': '*/*'
    },
  };
  const url = 'http://abc.test';
  var getURL = [];
  let res1 = 0
  let i = 0
  while (i < 1) {
    const res = http.post(url, data, params);
    getURL.push(res.headers['Operation-Location'])
    console.log(res.status);
    i++
  }
  for (var j = 0; j < getURL.length; j++) {
    res1 = http.get(getURL[j]);
    console.log(getURL[j]);
    console.log(res1.status);
    while (res1.status !== 200) {
      res1 = http.get(getURL[j]);
      console.log(res1.status);
    }
  }
  check(res1, {
    'get status text is 200': r => r.status === 200
  })
}
export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}