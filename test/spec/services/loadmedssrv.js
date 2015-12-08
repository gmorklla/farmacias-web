'use strict';

describe('Service: LoadMedsSrv', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var LoadMedsSrv;
  beforeEach(inject(function (_LoadMedsSrv_) {
    LoadMedsSrv = _LoadMedsSrv_;
  }));

  it('should do something', function () {
    expect(!!LoadMedsSrv).toBe(true);
  });

});
