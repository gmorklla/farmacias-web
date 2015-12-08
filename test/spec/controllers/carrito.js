'use strict';

describe('Controller: CarritoctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('farmaciasWebApp'));

  var CarritoctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CarritoctrlCtrl = $controller('CarritoctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CarritoctrlCtrl.awesomeThings.length).toBe(3);
  });
});
