'use strict';

describe('Service: locationSrv', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var locationSrv;
  beforeEach(inject(function (_locationSrv_) {
    locationSrv = _locationSrv_;
  }));

  it('should do something', function () {
    expect(!!locationSrv).toBe(true);
  });

});
