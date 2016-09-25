import { url2tag } from '../src/utils.js';
import { assert } from 'chai';

describe('url2tag', () => {
  it('should handle IPs', () => {
    let url = 'http://127.0.0.1';
    assert.equal('127.0.0.1', url2tag(url));
  });
  it('should return the same tag from different domains', () => {
    assert.equal('google', url2tag('http://google.fr'));
    assert.equal('google', url2tag('http://mail.google.com'));
  });
  it('should return hostname', () => {
    assert.equal('localhost', url2tag('http://localhost'));
  });
  it('should handle firefox internal urls', () => {
    assert.equal('', url2tag('about:config'));
  });
});
