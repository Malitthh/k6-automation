import http from 'k6/http';
import { check } from 'k6';
import "../../libs/shim/core.js";

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
      executor: "constant-vus",
      vus: 1,
      duration: "3s",
    },
  },
};

const files = {};
files["C:/Users/name/OneDrive/Documents/k6-automation/load_test/fixtures/test.pdf"] = http.file(
  open("C:/Users/name/OneDrive/Documents/k6-automation/load_test/fixtures/test.pdf", "b"),
  "test.pdf"
);

export default function ()  { 

  const testload = {
    file: files["C:/Users/name/OneDrive/Documents/k6-automation/load_test/fixtures/test.pdf"],
    isoLangCode: 'es'
  }; 
    const params = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*'
        },
      };

    const url = 'https://abc.com/api/endpoint1/endpoint2';
    
    const res = http.post(url, testload, params);
    
    check(res, {
        'is status 202': (rs) => rs.status === 202,
    });
    console.log(res.headers['X-Test-Id']);
    console.log(res.status);
   // return (res.headers['X-Test-Id']);
}