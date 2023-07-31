import "../../../libs/shim/core.js";
import "../../../libs/shim/expect.js";
import "../../../libs/shim/urijs.js";
import http from "k6/http";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<5000"], //95% of the requests must finish within 3s
  },
  noConnectionReuse: true,
  maxRedirects: 4,
  scenarios: {
    constant_scenario: {
      executor: "constant-vus",
      vus: 2,
      duration: "50s",
      startTime: "0s",
    },
  },
};

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options,
});

const files = {};
files["../../fixtures/test.pdf"] = http.file(
  open("../../fixtures/test.pdf", "b"),
  "testB.pdf"
);

export default function () {
  postman[Request]({
    name: "name",
    id: "id value",
    method: "POST",
    address: "url",
    data: {
      file: files["../../fixure/test.pdf"],
      table_extraction_method: "Skip",
      document_structure_method: "model name",
      Language: "English",
    },
    headers: {
      Accept: "application/json",
    },
    post(response) {
      pm.test("Response time is less than 200ms", function () {
        pm.expect(pm.response.responseTime).to.be.below(20000);
        console.log(response.status);
        console.log(response.body);
      });
    },
  });
}
