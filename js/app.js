(function(){
    "use strict";
    angular.module('Bookmarks',[
        //dependencies here
    ])
  
    .controller('MainController', function($scope){
        $scope.name = 'Carlos Jaramillo';
        $scope.categories = ['HTML5', 'Javascript', 'CSS3'];
    });
})();