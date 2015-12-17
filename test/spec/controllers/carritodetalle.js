'use strict';

describe('Controller: CarritodetallectrlCtrl', function () {

  // load the controller's module
  beforeEach(module('farmaciasWebApp'));

  var CarritodetallectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CarritodetallectrlCtrl = $controller('CarritodetallectrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CarritodetallectrlCtrl.awesomeThings.length).toBe(3);
  });
});
