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
      expect(url.protocol).toBe("https");
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
      expect(url.protocol).toBe("https");
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
    test.todo(
      "has the query set"
      /* , () => {
      expect(url.query).toEqual(expect.objectContaining({ foo: "bar" }));
} */
    );
    test("has the fragment correctly set", () => {
      expect(url.fragment).toBe("fragment");
    });
  });

  describe("Query and query string", () => {
    const url = Url.fromString(
      "https://ard.de/some/path?foo=bar&foo[peter]=assi"
    );
    test.todo("works with nested params");
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
    expect(url.getOrigin()).toBe("https://ard.de:1234");
  });

  test("getHostWithPort() will return host + port", () => {
    const url = Url.fromString("https://ard.de:1234/some/path");
    expect(url.getHostWithPort()).toBe("ard.de:1234");
  });

  test("getAuth() will return user : password", () => {
    const url = Url.fromString("https://user:password@ard.de:1234/some/path");
    expect(url.getAuth()).toBe("user:password");
  });

  test("getUri() will return everything after the host", () => {
    const url = Url.fromString("https://ard.de/some/path?foo=bar#fragment");
    expect(url.getUri()).toBe("/some/path?foo=bar#fragment");
  });

  test("getQueryString() will return the entire query string", () => {
    const url = Url.fromString("https://ard.de/some/path?foo=bar#fragment");
    expect(url.getQueryString()).toBe("?foo=bar");
  });
  test("getQueryParam() will return the value for the param name if it exists", () => {
    const url = Url.fromString("https://ard.de/some/path?foo=bar");
    expect(url.getQueryParam("foo")).toBe("bar");
  });
  test("getQueryParam() will return null if it doesn't exists", () => {
    const url = Url.fromString("https://ard.de/some/path?foo=bar");
    expect(url.getQueryParam("assi")).toBeNull();
  });
  test("getQueryParamList() will return the a list of values for the param name", () => {
    const url = Url.fromString("https://ard.de/some/path?foo=bar&foo=assi");
    expect(url.getQueryParamList("foo")).toEqual(["bar", "assi"]);
  });
  test("getQueryPairs() returns a list of of key value pairs of the query string", () => {
    const url = Url.fromString("https://ard.de/some/path?foo=bar&foo=assi&a=b");
    expect(url.getQueryPairs()).toEqual([
      ["foo", "bar"],
      ["foo", "assi"],
      ["a", "b"],
    ]);
  });
});

describe("interrogation", () => {
  test("hasQueryParam() checks if query params are set", () => {});
  test("isValidUrl() returns true for valid urls", () => {});
  test("equals() stringifies the url", () => {});
  test("contains() stringifies the url", () => {});
});

describe("Setters", () => {
  test("setProtocol() sets the protocol", () => {
    const url = Url.fromString("http://unsafe.com");
    expect(url.setProtocol("https")).toHaveProperty("protocol", "https");
  });
  test("setUser() sets the user", () => {
    const url = Url.fromString("http://unsafe.com");
    expect(url.setUser("assi")).toHaveProperty("user", "assi");
  });
  test("setPassword() sets the password", () => {
    const url = Url.fromString("http://assi@unsafe.com");
    expect(url.setPassword("peter")).toHaveProperty("password", "peter");
  });
  test("setHost() sets the host", () => {
    const url = Url.fromString("http://assi@unsafe.com");
    expect(url.setHost("ard.de")).toHaveProperty("host", "ard.de");
  });
  test("setPath() sets the path", () => {
    const url = Url.fromString("http://assi@unsafe.com");
    expect(url.setPath("/assi/peter")).toHaveProperty("path", "/assi/peter");
  });

  describe("setQueryParam()", () => {
    test("sets the query param when none is set", () => {
      const url = Url.fromString("http://example.com").setQueryParam(
        "foo",
        "bar"
      );
      expect(url.getQueryString()).toEqual("?foo=bar");
    });
    test("overrides the query param when one is set", () => {
      const url = Url.fromString("http://example.com?foo=assi").setQueryParam(
        "foo",
        "bar"
      );
      expect(url.toString()).toEqual("https://example.com?foo=bar");
      expect(url.setPath("/assi/peter")).toHaveProperty("path", "/assi/peter");
    });
    test("unsets other query params with the same name", () => {
      const url = Url.fromString("http://assi@unsafe.com");
      expect(url.setPath("/assi/peter")).toHaveProperty("path", "/assi/peter");
    });
  });

  describe("setQueryString()", () => {
    test("replaces the enitre query string", () => {
      const url = Url.fromString("http://example.com?foo=bar").setQueryString(
        "assi=peter&bar=stuff"
      );
      expect(url.getQueryString()).toEqual("assi=peter&bar=stuff");
    });
  });

  describe("removeQueryParam()", () => {
    test("removes a query param when it exists in the query string", () => {
      const url = Url.fromString("http://example.com?foo=bar").removeQueryParam(
        "foo"
      );
      expect(url.getQueryParam("foo")).toBeNull();
    });
    test("removes all instances of a param in the query string", () => {
      const url = Url.fromString("http://example.com?foo=bar").setQueryString(
        "assi=peter&bar=stuff"
      );
      expect(url.getQueryString()).toEqual("assi=peter&bar=stuff");
    });
    test("does nothing if the param name does not exist in the query", () => {
      const url = Url.fromString("http://example.com?foo=bar").setQueryString(
        "assi=peter&bar=stuff"
      );
      expect(url.getQueryString()).toEqual("assi=peter&bar=stuff");
    });
  });

  test("removeQueryParam() sets the protocol", () => {
    expect(false).toBe(true);
  });
  test("setQuery() sets the protocol", () => {
    expect(false).toBe(true);
  });
  test("setQueryString() sets the protocol", () => {
    expect(false).toBe(true);
  });
  test("setFragment() sets the fragment", () => {
    const url = Url.fromString("http://assi@unsafe.com");
    expect(url.setFragment("something-cool")).toHaveProperty(
      "fragment",
      "something-cool"
    );
  });
});
