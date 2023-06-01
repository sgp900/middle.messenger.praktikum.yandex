import { expect } from "chai";
import { set } from "./helpers";

describe("Helper functions", () => {
  describe("set", () => {
    let obj: object;
    let path: string;
    let value: unknown;

    beforeEach(() => {
      obj = {};
      path = "a.b.c";
      value = 3;
    });

    it("Should return pased object if it's not an object", () => {
      // arrange
      const val = 3;

      // act
      const result = set(3, "test.test", val);

      // assert
      expect(result).to.eq(val);
    });

    it("Should return null if null passed as first argument", () => {
      // arrange
      const notObj = null;

      // act
      const result = set(notObj, "test.test", 3);

      // assert
      expect(result).to.eq(notObj);
    });

    it("Should throw an error if path is not a string", () => {
      const testObj = {};
      const testPath = 3 as any;

      const fn = () => set(testObj, testPath, 3);

      expect(fn).to.throw(Error);
    });

    it("should set new property to passed object with passed parameter", () => {
      const result = set(obj, path, value);

      expect((result as any).a.b.c).to.eq(value);
    });

    it("Should not return new object", () => {
      const result = set(obj, path, value);

      expect(result).to.eq(obj);
    });
  });
});
