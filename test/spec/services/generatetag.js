'use strict';

describe('Service: generateTag', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var generateTag;
  beforeEach(inject(function (_generateTag_) {
    generateTag = _generateTag_;
  }));

  it('should do something', function () {
    expect(!!generateTag).toBe(true);
  });

});
