'use strict';

describe('Controller: HigieneCtrl', function () {

  // load the controller's module
  beforeEach(module('farmaciasWebApp'));

  var HigieneCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HigieneCtrl = $controller('HigieneCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HigieneCtrl.awesomeThings.length).toBe(3);
  });
});
