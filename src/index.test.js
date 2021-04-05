import Url from "./index";

describe("Url constructor", () => {
  test("creates a URL object", () => {
    const url = Url.fromString("https://ard.de");
    expect(url.hostname).toBe("ard.de");
  });
  test("has a protocol property", () => {
    const url = Url.fromString("https://ard.de");
    expect(url.protocol).toBe("https:");
  });
  test("has a protocol property", () => {
    const url = Url.fromString("ard.de");
    expect(url.protocol).toBe("null");
  });
});
