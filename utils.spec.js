const utils = require("./utils");
const assert = require("assert");

describe("utils.js모듈의 capitialize 함수는", () => {
  it("문자열의 첫번째 문자를 대문자로 변환한다", () => {
    // .. 테스트코드
    const result = utils.capitialize("hello");
    assert.equal(result, "Hello");
  });
});
