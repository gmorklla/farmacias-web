'use strict';

describe('Service: prettyUrlSpc', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var prettyUrlSpc;
  beforeEach(inject(function (_prettyUrlSpc_) {
    prettyUrlSpc = _prettyUrlSpc_;
  }));

  it('should do something', function () {
    expect(!!prettyUrlSpc).toBe(true);
  });

});
