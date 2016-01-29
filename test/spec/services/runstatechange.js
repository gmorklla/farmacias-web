'use strict';

describe('Service: runstatechange', function () {

  // load the service's module
  beforeEach(module('farmaciasWebApp'));

  // instantiate service
  var runstatechange;
  beforeEach(inject(function (_runstatechange_) {
    runstatechange = _runstatechange_;
  }));

  it('should do something', function () {
    expect(!!runstatechange).toBe(true);
  });

});
