'use strict';

describe('Service: loadPromo', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var loadPromo;
  beforeEach(inject(function (_loadPromo_) {
    loadPromo = _loadPromo_;
  }));

  it('should do something', function () {
    expect(!!loadPromo).toBe(true);
  });

});
