'use strict';

describe('Service: Mathservice', function () {

  // load the service's module
  beforeEach(module('cheerMathApp'));

  // instantiate service
  var Mathservice;
  beforeEach(inject(function (_Mathservice_) {
    Mathservice = _Mathservice_;
  }));

  it('should do something', function () {
    expect(!!Mathservice).toBe(true);
  });

});
