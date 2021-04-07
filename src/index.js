const Url = function (urlString) {
  const urlObject = new URL(urlString);
  const properties = {
    user: urlObject.username !== "" ? urlObject.username : null,
    password: urlObject.password !== "" ? urlObject.password : null,
    protocol: urlObject.protocol,
    host: urlObject.hostname,
    port: urlObject.port !== "" ? Number(urlObject.port) : null,
    // host: "assi.peter", -- is hostname + port -- getter
    // href: "https://ich:passwort@assi.peter/", -- getter
    // origin: "https://assi.peter", -- is protocol + hostname + port
    path: urlObject.pathname,
    // search: "",  -- stringifies search params -- getter
    query: urlObject.search !== "" ? urlObject.searchParams : null,
    fragment: urlObject.hash !== "" ? urlObject.hash.slice(1) : null,

    // store these for getters
    href: urlObject.href,
    hostWithPort: urlObject.host,
    origin: urlObject.origin,
  };
  this.__getProperty = function (property) {
    return properties[property];
  };
};

/*
-- elm url type
type alias Url =
    { protocol : Protocol
    , host : String
    , port_ : Maybe Int
    , path : String
    , query : Maybe String
    , fragment : Maybe String
    }
*/

const defaultPropDescriptor = {
  enumerable: true,
  writeable: false,
};

Object.defineProperties(Url.prototype, {
  user: {
    ...defaultPropDescriptor,
    get() {
      return this.__getProperty("user");
    },
  },
  password: {
    ...defaultPropDescriptor,
    get() {
      return this.__getProperty("password");
    },
  },
  protocol: {
    ...defaultPropDescriptor,
    get() {
      return this.__getProperty("protocol");
    },
  },
  host: {
    ...defaultPropDescriptor,
    get() {
      return this.__getProperty("host");
    },
  },
  port: {
    ...defaultPropDescriptor,
    get() {
      return this.__getProperty("port");
    },
  },
  path: {
    ...defaultPropDescriptor,
    get() {
      return this.__getProperty("path");
    },
  },
  query: {
    ...defaultPropDescriptor,
    get() {
      return this.__getProperty("query");
    },
  },
  fragment: {
    ...defaultPropDescriptor,
    get() {
      return this.__getProperty("fragment");
    },
  },
  // GETTERS
  toString: {
    value() {
      return this.__getProperty("href");
    },
  },

  getOrigin: {
    value() {
      return this.__getProperty("origin");
    },
  },
  getHostWithPort: {
    value() {
      return this.__getProperty("hostWithPort");
    },
  },
  getAuth: {
    value() {
      return `${this.user}:${this.password}`;
    },
  },
  getUri: {
    value() {
      return `${this.path}?${this.query.toString()}#${this.fragment}`;
    },
  },
});

Url.fromString = (urlString) =>
  // Use standard url library to parse string
  new Url(urlString);

// Utility
export default Url;
