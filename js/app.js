(function(){
    "use strict";
    angular.module('Bookmarks',[
        //dependencies here
    ])
  
    .controller('MainController', function($scope){
        $scope.name = 'Carlos Jaramillo';
        $scope.categories = ['HTML5', 'Javascript', 'CSS3', 'GAMES'];
        $scope.bookmarks = [
            {id:1, name:'Quizzpot.com', url:'https://quizzpot.com', category: 'JavaScript'},
            {id:2, name:'Html5 Game Devs', url:'https://html5gamedevs.com', category: 'Games'},
            {id:3, name:'CSS Tricks', url:'https://css-tricks.com', category: 'CSS3'},
            {id:4, name:'Bootstrap', url:'https://getbootstrap.com', category: 'CSS3'},
            {id:5, name:'Card', url:'https://jessepollak.github.io/card/', category: 'JavaScript'}
        ]  
        $scope.currentCategory = 'JavaScript';
        $scope.setCurrentCategory = function(category) {
            $scope.currentCategory = category;
        }
        $scope.isCurrentCategory = function(category) {
            return $scope.currentCategory === category;
        }
        $scope.save = function(bookmark){
            console.log(bookmark);
        }
    });
})();