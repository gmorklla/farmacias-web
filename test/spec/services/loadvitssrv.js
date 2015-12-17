'use strict';

describe('Service: LoadVitsSrv', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var LoadVitsSrv;
  beforeEach(inject(function (_LoadVitsSrv_) {
    LoadVitsSrv = _LoadVitsSrv_;
  }));

  it('should do something', function () {
    expect(!!LoadVitsSrv).toBe(true);
  });

});
