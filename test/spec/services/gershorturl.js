'use strict';

describe('Service: gerShortUrl', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var gerShortUrl;
  beforeEach(inject(function (_gerShortUrl_) {
    gerShortUrl = _gerShortUrl_;
  }));

  it('should do something', function () {
    expect(!!gerShortUrl).toBe(true);
  });

});
