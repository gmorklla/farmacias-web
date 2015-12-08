'use strict';

describe('Service: MuestraProductos', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var MuestraProductos;
  beforeEach(inject(function (_MuestraProductos_) {
    MuestraProductos = _MuestraProductos_;
  }));

  it('should do something', function () {
    expect(!!MuestraProductos).toBe(true);
  });

});
