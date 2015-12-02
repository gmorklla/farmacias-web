'use strict';

describe('Controller: NotaCtrl', function () {

  // load the controller's module
  beforeEach(module('farmaciasWebApp'));

  var NotaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotaCtrl = $controller('NotaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NotaCtrl.awesomeThings.length).toBe(3);
  });
});
