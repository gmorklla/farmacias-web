'use strict';

describe('Controller: MedicamentosCtrl', function () {

  // load the controller's module
  beforeEach(module('farmaciasWebApp'));

  var MedicamentosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MedicamentosCtrl = $controller('MedicamentosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MedicamentosCtrl.awesomeThings.length).toBe(3);
  });
});
