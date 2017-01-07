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

    done();

  });

});
