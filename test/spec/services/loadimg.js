'use strict';

describe('Service: loadImg', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var loadImg;
  beforeEach(inject(function (_loadImg_) {
    loadImg = _loadImg_;
  }));

  it('should do something', function () {
    expect(!!loadImg).toBe(true);
  });

});
