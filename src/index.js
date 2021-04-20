const Url = function (urlObject) {
  const properties = {
    user: urlObject.username !== "" ? urlObject.username : null,
    password: urlObject.password !== "" ? urlObject.password : null,
    protocol: urlObject.protocol.slice(0, -1),
    host: urlObject.hostname,
    port: urlObject.port !== "" ? Number(urlObject.port) : null,
    path: urlObject.pathname,
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
  getQueryString: {
    value() {
      return `?${this.query.toString()}`;
    },
  },
  getQueryParam: {
    value(key) {
      return this.query.get(key);
    },
  },
  getQueryParamList: {
    value(key) {
      return this.query.getAll(key);
    },
  },
  getQueryPairs: {
    value() {
      return Array.from(this.query.entries());
    },
  },
  // SETTERS
  setProtocol: {
    value(val) {
      const urlObject = new URL(this.toString());
      urlObject.protocol = val;
      return new Url(urlObject);
    },
  },
  setUser: {
    value(val) {
      const urlObject = new URL(this.toString());
      urlObject.username = val;
      return new Url(urlObject);
    },
  },
  setPassword: {
    value(val) {
      const urlObject = new URL(this.toString());
      urlObject.password = val;
      return new Url(urlObject);
    },
  },
  setHost: {
    value(val) {
      const urlObject = new URL(this.toString());
      urlObject.hostname = val;
      return new Url(urlObject);
    },
  },
  setPath: {
    value(val) {
      const urlObject = new URL(this.toString());
      urlObject.pathname = val;
      return new Url(urlObject);
    },
  },
  // setPathSegments: {},
  // setPathSegment: {},
  setFragment: {
    value(val) {
      const urlObject = new URL(this.toString());
      urlObject.hash = val;
      return new Url(urlObject);
    },
  },
});

Url.fromString = (urlString) => {
  const urlObject = new URL(urlString);
  // Use standard url library to parse string
  return new Url(urlObject);
};

// Utility
export default Url;
