'use strict';

describe('Service: promoOrCombo', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var promoOrCombo;
  beforeEach(inject(function (_promoOrCombo_) {
    promoOrCombo = _promoOrCombo_;
  }));

  it('should do something', function () {
    expect(!!promoOrCombo).toBe(true);
  });

});
