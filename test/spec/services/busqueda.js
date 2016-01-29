'use strict';

describe('Service: busqueda', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var busqueda;
  beforeEach(inject(function (_busqueda_) {
    busqueda = _busqueda_;
  }));

  it('should do something', function () {
    expect(!!busqueda).toBe(true);
  });

});
