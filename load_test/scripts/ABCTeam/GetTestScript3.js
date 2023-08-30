import http from "k6/http";
import { check } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<7000"], //95% of the requests must finish within 3s
    http_req_duration: ["p(75)<9500"], //75% of the requests must finish within 1.5s
    checks: ["rate>0.95"], //99% pass rate
    http_req_failed: ["rate<0.1"],
  },
  noConnectionReuse: true,
  scenarios: {
    constant_scenario: {
      executor: "per-vu-iterations",
      vus: 50,
      iterations: 10,
      maxDuration: "5m",
    },

  },
};

export default function () {
  let data = {
    Title: "Test Title",
    URL: "https://test.com",
    TEST_CONTENT_TYPE: "html",
    TEST_LANG: "en",
    TEST_BODY_ID: "numericvalue",
    TEST_BODY: "string value",
    SOURCEID: "N-S value",
    TEST_BOOK_ID: "numeric value",
    CONTENT: "test content",
  };

  const params = {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Token: "tokenvalue",
    },
  };

  const url = 'http://abc.test';
  const res = http.post(url, JSON.stringify(data), params);
  const req = JSON.parse(res.body);
  console.log(req.request_id, res.status);
  //Storing Request id and processing GET request
  let id = req.request_id;
  let GetURL = `http://abc.testresults?request_id=${id}`;
  let GETres
  let getStatus
  do {

    GETres = http.get(GetURL, params)
    // console.log(JSON.parse(GETres.body))
    getStatus = JSON.parse(GETres.body)

  } while (getStatus.Status === "Progress") {

    console.log(getStatus.Status)
  }
  console.log(GETres.status);

  check(res, {
    "is status 202": (rs) => rs.status === 202,
  });
  check(GETres, {
    "is status 202": (rs) => rs.status === 200,
  });
}
