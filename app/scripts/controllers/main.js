'use strict';

angular.module('cheerMathApp')
   .controller('MainCtrl', ['$scope','Gamemanagerservice','Mathservice','$timeout','$window','$log','localStorageService',
        function ($scope, Gamemanagerservice,Mathservice,$timeout, $window,$log, localStorageService) {
            $scope.startTimer = function (){
                $scope.$broadcast('timer-start');
            };
            $scope.stopTimer = function (){
                $scope.$broadcast('timer-stop');
            };
            $scope.clearTimer = function() {
                $scope.$broadcast('timer-clear');
            };
            $scope.resetTimer = function() {
                $scope.$broadcast('timer-reset');
            };
            $scope.newGame = function(){
                $scope.expression = Gamemanagerservice.generate(0);
                $scope.checkingAnswer = false;
                $scope.gameOver = false;
                $scope.resetTimer();
                $scope.score = 0;
                $scope.consecutiveNumber = 0;
                $scope.level = 1;
            };

            $scope.init = function(){
                $scope.trueAudio = document.createElement('audio');
                $scope.trueAudio.src = "http://piolab.github.io/cheer-math/media/right_answer.mp3";
                $scope.trueAudio.load();
                $scope.trueAudio.addEventListener("loadeddata",function(){
                    $scope.trueAudio.onloaded = true;
                });
                $scope.wrongAudio = document.createElement('audio');
                $scope.wrongAudio.src = "http://piolab.github.io/cheer-math/media/wrong_answer.mp3";
                $scope.wrongAudio.load();
                $scope.wrongAudio.addEventListener("loadeddata",function(){
                    $scope.wrongAudio.onloaded = true;
                });
                var value = localStorageService.get('cheer-math-score');
                $scope.bestScore = value;
                $scope.newGame();
            }
          
            $scope.playTrueAudio = function(){
                if ($scope.trueAudio.onloaded){
                    $scope.trueAudio.play();
                    $scope.trueAudio.currentTime = 0;
                }
            }
            $scope.playWrongAudio = function(){
                if ($scope.wrongAudio.onloaded){
                    $scope.wrongAudio.play();
                    $scope.wrongAudio.currentTime = 0;
                }
            }
//            $scope.init();

            $scope.nextGame = function(){
                $scope.expression = Gamemanagerservice.generate($scope.level-1);
//                if ($scope.score === 1){
//                    $scope.startTimer();
//                }
                $scope.checkingAnswer = false;
            };
            $scope.gameCheck = function(){
                if ($scope.score === 0){
                    $scope.startTimer();
                }
                $scope.checkingAnswer = true;
                var indexBlankOperator = $scope.expression.chain.indexOf(-1);
                if (indexBlankOperator!==-1){
                    $scope.showTrue = false;
                    $scope.gameOver = true;
                    
                    $scope.stopTimer();
                    return false;
                }
                else{
                    $scope.showTrue = Gamemanagerservice.isCorrectExpression($scope.expression);
                    if ($scope.showTrue) {
                        $scope.playTrueAudio();
                        $scope.consecutiveNumber ++;
                        // if 5 right answers consecutive
                        if ($scope.consecutiveNumber>=5) {
                            if ($scope.level < 4){
                                $scope.level ++;
                            }
                            $scope.consecutiveNumber = 0;
                            $scope.$broadcast('timer-add-cd-seconds', 4 + $scope.level);
                        }
                        $scope.score ++;
                    }
                    else {
                        $scope.gameOver = true;
                        $scope.stopTimer();
                    }
                    return $scope.showTrue;
                }
            };
           
            $scope.updateBestScore = function(){
                if ($scope.score > $scope.bestScore){
                    $scope.bestScore = $scope.score;
                    localStorageService.add('cheer-math-score',$scope.bestScore);
                }

            }
            $scope.plusButtonClick = function(){
                if ($scope.gameOver) return;
                var indexBlankOperator = $scope.expression.chain.indexOf(-1);
                if (indexBlankOperator!==-1){
                    $scope.expression.chain[indexBlankOperator] = 0;
                    indexBlankOperator = $scope.expression.chain.indexOf(-1);
                    if (indexBlankOperator===-1){
                        if($scope.gameCheck()){
                            $timeout($scope.nextGame,300);
                        }
                        else {
                            $scope.playWrongAudio();
                            $scope.updateBestScore();
                            $scope.checkingAnswer = false;
                        }
//                    $scope.nextGame();
                    }
                }
            }
            $scope.minusButtonClick = function(){
                if ($scope.gameOver) return;
                var indexBlankOperator = $scope.expression.chain.indexOf(-1);
                if (indexBlankOperator!==-1){
                    $scope.expression.chain[indexBlankOperator] = 1;
                    indexBlankOperator = $scope.expression.chain.indexOf(-1);
                    if (indexBlankOperator===-1){
                        if ($scope.gameCheck()){
                            $timeout($scope.nextGame,300);
                        }
                        else {
                            $scope.playWrongAudio();
                            $scope.updateBestScore();
                            $scope.checkingAnswer = false;
                        }
                    }
                }
            }
            $scope.$on('timer-stopped', function (event, data) {

                $scope.$apply(function(){
                    $scope.gameOver = true;
                });
//                $scope.stopTimer();
//                console.log('Timer Stopped - data = ', data);
            });
            $scope.$on('timer-tick', function (event, data) {

            });
            $scope.onKeyDown = function(event){
                if (event.keyCode === 37){
                    $scope.plusButtonClick();
                }
                else if (event.keyCode === 39){
                    $scope.minusButtonClick();
                }
                else if (event.keyCode === 38 || event.keyCode === 40){
                    if ($scope.gameOver){
                        $scope.newGame();
                    }

                }
            };

        }]);
