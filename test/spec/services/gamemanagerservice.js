'use strict';

describe('Service: Gamemanagerservice', function () {

  // load the service's module
  beforeEach(module('cheerMathApp'));

  // instantiate service
  var Gamemanagerservice;
  beforeEach(inject(function (_Gamemanagerservice_) {
    Gamemanagerservice = _Gamemanagerservice_;
  }));

  it('should do something', function () {
    expect(!!Gamemanagerservice).toBe(true);
  });

});
