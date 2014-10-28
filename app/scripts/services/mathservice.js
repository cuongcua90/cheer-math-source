'use strict';

angular.module('cheerMathApp')
  .factory('Mathservice', function Mathservice() {
        return {
            getRandomNumber: function(min, max){
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            generateExpression: function(levelObject){
                var hideOperatorArr = [];
                for (var i = 0; i<levelObject.numOfFactor-1;i++){
                    hideOperatorArr.push(this.getRandomNumber(0,levelObject.numOfFactor-2));
                }
                var chain = [];
                var firstNumber = this.getRandomNumber(levelObject.min, levelObject.max);
                var total = firstNumber;
                chain.push(firstNumber);
                var operatorIndexHide = this.getRandomNumber(1,levelObject.numOfFactor-1);
                for(var i = 1 ; i < levelObject.numOfFactor; i++){
                    var number = this.getRandomNumber(levelObject.min,levelObject.max);

                    var operatorSign = this.getRandomNumber(0,1);
                    var isHideOperator = (hideOperatorArr.indexOf(i-1)!==-1);
                    if (i===operatorIndexHide){
                        chain.push(-1);
                    }
                    else{
                        chain.push(operatorSign);
                    }
                    chain.push(number);

                    if (operatorSign === 0){
                        total += number;
                    }
                    else if (operatorSign === 1){
                        total -= number;
                    }
                }
                return {chain:chain,result:total};
            }
        }
    });
