import {xhrFetch} from '../src/xhr';
import sinon from 'sinon';
import {expect} from 'code';

describe('XHR Fetch', () => {

  const url = 'http://test.env/url';
  let request,
    xhr;

  beforeEach(() => {

    xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = req => request = req;

  });

  afterEach(() => xhr.restore());

  it('should return a promise', () => {

    expect(xhrFetch(url)).instanceOf(Promise);

  });

  it('should make a request to the given url', done => {

    xhrFetch(url);

    expect(request).exists();
    expect(request.url).equals(url);
    expect(request.method).equals('GET');
    expect(request.async).true();
    expect(request.timeout).equals(0);

    done();

  });

  it('should allow custom options', done => {

    const options = {
      body: 'post data',
      method: 'POST',
      timeout: 100
    };

    xhrFetch(url, options);

    expect(request).exists();
    expect(request.method).equals(options.method);
    expect(request.timeout).equals(options.timeout);
    expect(request.requestBody).equals(options.body);

    done();

  });

});
