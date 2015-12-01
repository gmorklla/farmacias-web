'use strict';

describe('Controller: SiminotasCtrl', function () {

  // load the controller's module
  beforeEach(module('farmaciasWebApp'));

  var SiminotasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SiminotasCtrl = $controller('SiminotasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SiminotasCtrl.awesomeThings.length).toBe(3);
  });
});
