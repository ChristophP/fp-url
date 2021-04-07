import Url from "./index";

describe("Url constructor", () => {
  test("creates a URL object from a valid url string", () => {
    const url = Url.fromString("https://ard.de");
    expect(url).toBeInstanceOf(Url);
  });

  test("returns null for an invalid url string", () => {
    const url = Url.fromString("https://ard.de");
    expect(url).toBeInstanceOf(Url);
  });

  test("it has the correct shape", () => {
    const url = Url.fromString("https://ard.de");
    const props = [
      "user",
      "password",
      "protocol",
      "host",
      "port",
      "path",
      "query",
      "fragment",
    ];
    props.forEach((p) => expect(url).toHaveProperty(p));
  });
});

describe("Properties", () => {
  describe("A plain host with schema", () => {
    const url = Url.fromString("https://ard.de");
    test("has no user", () => {
      expect(url.user).toBeNull();
    });
    test("has no password", () => {
      expect(url.password).toBeNull();
    });
    test("has the protocol property correctly set", () => {
      expect(url.protocol).toBe("https:");
    });
    test("has the host property correctly set", () => {
      expect(url.host).toBe("ard.de");
    });
    test("has no port", () => {
      expect(url.port).toBeNull();
    });
    test("has the path set but '/'", () => {
      expect(url.path).toBe("/");
    });
    test("has no query string", () => {
      expect(url.query).toBeNull();
    });
    test("has no fragment", () => {
      expect(url.fragment).toBeNull();
    });
  });

  describe("A host with schema port and path and fragment", () => {
    const url = Url.fromString(
      "https://ard.de:1234/some/path?foo=bar#fragment"
    );
    test("has no user", () => {
      expect(url.user).toBeNull();
    });
    test("has no password", () => {
      expect(url.password).toBeNull();
    });
    test("has the protocol property correctly set", () => {
      expect(url.protocol).toBe("https:");
    });
    test("has the host property correctly set", () => {
      expect(url.host).toBe("ard.de");
    });
    test("has the port correctly set", () => {
      expect(url.port).toBe(1234);
    });
    test("has the path correctly set", () => {
      expect(url.path).toBe("/some/path");
    });
    test("has the query set", () => {
      expect(url.query).objectContaining({ foo: "bar" });
    });
    test("has the fragment correctly set", () => {
      expect(url.fragment).toBe("fragment");
    });
  });

  describe("Query and query string", () => {
    const url = Url.fromString(
      "https://ard.de/some/path?foo=bar&foo[peter]=assi"
    );
    test.todo("works with nested params", () => {});
  });
  describe("Auth", () => {
    const url = Url.fromString("https://user:password@ard.de");
    test("populates user and password", () => {
      expect(url.user).toBe("user");
      expect(url.password).toBe("password");
    });
  });
});

// toString, origin, hostWithPort, auth, is Valid
describe("Getters", () => {
  test("toString() stringifies the url", () => {
    const url = Url.fromString("https://ard.de/some/path?foo=bar#fragment");
    expect(url.toString()).toBe("https://ard.de/some/path?foo=bar#fragment");
  });

  test("toString() will add a slash if the path is empty", () => {
    const url = Url.fromString("https://ard.de");
    expect(url.toString()).toBe("https://ard.de/");
  });

  test("getOrigin() will return scheme + host + port", () => {
    const url = Url.fromString("https://ard.de:1234/some/path");
    expect(url.toString()).toBe("https://ard.de:1234");
  });

  test("getHostWithPort() will return host + port", () => {
    const url = Url.fromString("https://ard.de:1234/some/path");
    expect(url.toString()).toBe("ard.de:1234");
  });

  test("getAuth() will return user : password", () => {
    const url = Url.fromString("https://user:password@ard.de:1234/some/path");
    expect(url.toString()).toBe("ard.de:1234");
  });

  test("getURI() will return everything after the host", () => {
    const url = Url.fromString("https://ard.de/some/path?foo=bar#fragment");
    expect(url.toString()).toBe("/some/path?foo=bar#fragment");
  });
});

describe("Setters", () => {});
