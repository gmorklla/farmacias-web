'use strict';

describe('Service: youTubeList', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var youTubeList;
  beforeEach(inject(function (_youTubeList_) {
    youTubeList = _youTubeList_;
  }));

  it('should do something', function () {
    expect(!!youTubeList).toBe(true);
  });

});
