(function(){
    "use strict";
    angular.module('Bookmarks',[
        //dependencies here
    ])
  
    .controller('MainController', function($scope){
        $scope.name = 'Carlos Jaramillo';
        $scope.categories = ['HTML5', 'Javascript', 'CSS3'];
        $scope.bookmarks = [
          {id:1, name:'Quizzpot.com', url:'https://quizzpot.com', category: 'JavaScript'},
          {id:2, name:'Html5 Game Devs', url:'https://html5gamedevs.com', category: 'Games'},
          {id:3, name:'CSS Tricks', url:'https://css-tricks.com', category: 'CSS'},
          {id:4, name:'Bootstrap', url:'https://getbootstrap.com', category: 'CSS'},
          {id:5, name:'Card', url:'https://jessepollak.github.io/card/', category: 'JavaScript'}
        ]
    });
})();