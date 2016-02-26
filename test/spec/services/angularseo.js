'use strict';

describe('Service: angularSeo', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var angularSeo;
  beforeEach(inject(function (_angularSeo_) {
    angularSeo = _angularSeo_;
  }));

  it('should do something', function () {
    expect(!!angularSeo).toBe(true);
  });

});
