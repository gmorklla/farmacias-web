'use strict';

describe('Service: getGoogle', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var getGoogle;
  beforeEach(inject(function (_getGoogle_) {
    getGoogle = _getGoogle_;
  }));

  it('should do something', function () {
    expect(!!getGoogle).toBe(true);
  });

});
