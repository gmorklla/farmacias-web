'use strict';

describe('Controller: VitaminasCtrl', function () {

  // load the controller's module
  beforeEach(module('farmaciasWebApp'));

  var VitaminasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VitaminasCtrl = $controller('VitaminasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VitaminasCtrl.awesomeThings.length).toBe(3);
  });
});
