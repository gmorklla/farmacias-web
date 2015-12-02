'use strict';

describe('Controller: PromosCtrl', function () {

  // load the controller's module
  beforeEach(module('farmaciasWebApp'));

  var PromosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PromosCtrl = $controller('PromosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PromosCtrl.awesomeThings.length).toBe(3);
  });
});
