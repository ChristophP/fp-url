const Url = function (urlString) {
  const properties = {
    hash: "",
    // host: "assi.peter", -- is hostname + port -- getter
    hostname: "assi.peter",
    // href: "https://ich:passwort@assi.peter/", -- getter
    // origin: "https://assi.peter", -- is protocol + hostname + port
    password: "passwort",
    pathname: "/",
    port: "",
    protocol: "https:",
    // search: "",  -- stringifies search params -- getter
    searchParams: URLSearchParams,
    username: "ich",
  };
  const urlObject = new URL(urlString);
  this.__getProperty = function (property) {
    return urlObject[property];
  };
};

// Getters - we mimic the behaviour of the document.location object here
// Note that some methods are aliased (such as getScheme and getProtocol)
Object.defineProperties(Url.prototype, {
  protocol: {
    get() {
      return this.__getProperty("protocol");
    },
    enumerable: true,
  },
  user: {
    get() {
      return this.__getProperty("user");
    },
    enumerable: true,
  },
  password: {
    get() {
      return this.__getProperty("password");
    },
    enumerable: true,
  },
  auth: {
    get() {
      const auth = this.user;
      const pw = this.password;
      return pw ? `${auth}:${pw}` : auth;
    },
    enumerable: true,
  },
  hostname: {
    get() {
      return this.__getProperty("hostname");
    },
    enumerable: true,
  },
});
Url.prototype.port = function () {
  return this.__getProperty("port");
};
Url.prototype.pathname = function () {
  return this.__getProperty("pathname");
};
Url.prototype.searc = function () {
  return this.__getProperty("search");
};

Url.fromString = (urlString) =>
  // Use standard url library to parse string
  new Url(urlString);

// Utility
export default Url;
