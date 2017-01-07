import {xhrFetch} from '../src/xhr';
import xhr from 'xhr';
import {expect} from 'code';
import sinon from 'sinon';

describe('XHR Fetch', () => {

  const url = 'http://test.env/url';
  let mockXhr,
    sandbox,
    request;

  class MockXHR {
    constructor() {

      mockXhr = this;

    }

    abort() {}

    open(method, url, async) {
      request = Object.assign(
        {},
        request,
        {
          method,
          url,
          async
        }
      );
    }

    send(body) {
      request = Object.assign({}, request, {body});
    }
  }

  beforeEach(() => {

    sandbox = sinon.sandbox.create();

    xhr.XMLHttpRequest = MockXHR;
    xhr.XDomainRequest = MockXHR;

  });

  afterEach(() => sandbox.restore());

  it('should return a promise', () => {

    expect(xhrFetch(url)).instanceOf(Promise);

  });

  it('should make a request to the given url', () => {

    xhrFetch(url);

    expect(request).exists();
    expect(request.url).equals(url);
    expect(request.method).equals('GET');
    expect(request.async).true();

  });

  it('should allow custom options', () => {

    const options = {
      body: 'post data',
      method: 'POST'
    };

    xhrFetch(url, options);

    expect(request).exists();
    expect(request.method).equals(options.method);
    expect(request.body).equals(options.body);

  });

  it('should reject on timeout', async() => {

    const clock = sinon.useFakeTimers();
    const options = {timeout: 100};
    const promise = xhrFetch(url, options);
    let response;

    clock.tick(options.timeout + 1);

    try {

      await promise;

      response = null;

    } catch (error) {

      response = error;

    }

    expect(response).exists();
    expect(response.statusCode).equals(0);

    clock.restore();

  });

  it('should reject when api fails', async() => {

    const promise = xhrFetch(url);
    let response;

    mockXhr.status = 301;
    mockXhr.onload();

    try {

      await promise;

      response = null;

    } catch (error) {

      response = error;

    }

    expect(response).exists();
    expect(response.ok).false();

  });

  it('should resolve on success', async() => {

    const promise = xhrFetch(url);

    mockXhr.status = 200;
    mockXhr.onload();

    const response = await promise;

    expect(response).exists();
    expect(response.ok).true();

  });

});
