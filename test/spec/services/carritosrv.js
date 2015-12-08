'use strict';

describe('Service: CarritoSrv', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var CarritoSrv;
  beforeEach(inject(function (_CarritoSrv_) {
    CarritoSrv = _CarritoSrv_;
  }));

  it('should do something', function () {
    expect(!!CarritoSrv).toBe(true);
  });

});
