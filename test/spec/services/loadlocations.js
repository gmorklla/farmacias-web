'use strict';

describe('Service: loadlocations', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var loadlocations;
  beforeEach(inject(function (_loadlocations_) {
    loadlocations = _loadlocations_;
  }));

  it('should do something', function () {
    expect(!!loadlocations).toBe(true);
  });

});
