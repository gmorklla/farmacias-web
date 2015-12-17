'use strict';

describe('Service: LoadHigieneSrv', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var LoadHigieneSrv;
  beforeEach(inject(function (_LoadHigieneSrv_) {
    LoadHigieneSrv = _LoadHigieneSrv_;
  }));

  it('should do something', function () {
    expect(!!LoadHigieneSrv).toBe(true);
  });

});
