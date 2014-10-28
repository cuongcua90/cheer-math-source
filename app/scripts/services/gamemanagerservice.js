'use strict';

angular.module('cheerMathApp')
  .factory('Gamemanagerservice', function Gamemanagerservice(Mathservice) {
        var levelDefine = [
            {min:0,max:10,numOfFactor:2},
            {min:0,max:20,numOfFactor:2},
            {min:0,max:10,numOfFactor:3},
            {min:0,max:30,numOfFactor:3}
        ]
        return {
            generate: function(levelIndex){
                return Mathservice.generateExpression(levelDefine[levelIndex]);
            },
            isCorrectExpression: function(expression){
                var chain = expression.chain;
                var total = chain[0];
                for (var i = 1; i<chain.length-1; i+=2){
                    if (chain[i] === 0){
                        total += chain[i+1];
                    }
                    else if (chain[i]===1){
                        total -= chain[i+1];
                    }
                    else
                        return false;
                }
                return (expression.result === total);
            }
        }
    // AngularJS will instantiate a singleton by calling "new" on this function
  });