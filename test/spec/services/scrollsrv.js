'use strict';

describe('Service: ScrollSrv', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var ScrollSrv;
  beforeEach(inject(function (_ScrollSrv_) {
    ScrollSrv = _ScrollSrv_;
  }));

  it('should do something', function () {
    expect(!!ScrollSrv).toBe(true);
  });

});
