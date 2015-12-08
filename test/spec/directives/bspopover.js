'use strict';

describe('Directive: bsPopOver', function () {

  // load the directive's module
  beforeEach(module('farmaciasWebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bs-pop-over></bs-pop-over>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bsPopOver directive');
  }));
});
