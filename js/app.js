(function(){
    "use strict";
    angular.module('Bookmarks',[
        //dependencies here
        'ngResource'
    ])
    
//    .service('Category',function(){
//      
//    })
//    
//    .factory('Category',function(){
//      
//    })
//    
//    .provider('Category',function(){
//      
//    })    
    
    .service('Category',function($http){
        this.getAll = function(success,failure){
              //$http.get('http://bookmarks-angular.herokuapp.com/api/categories')
              $http({
                  method:'GET',
                  url:'http://bookmarks-angular.herokuapp.com/api/categories' 
              }).then(success,failure); 
        }
    })
    
    .factory('Bookmark', function($resource){
        return $resource('http://bookmarks-angular.herokuapp.com/api/bookmarks/:id',{
            id : '@id'
        },{
            update : {method:'PUT'}
        });
    })
    
    .directive('bootstrapSelect',function(){
        return {
            require : 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var collection = attrs.bootstrapSelect,
                    valueProperty = attrs.selectValue,
                    labelProperty = attrs.selectLabel,
                    model = attrs.ngModel;
              
                $(element).selectpicker();
                console.log('My directive');
            }
        }
    })
    
    .controller('MainController',function($scope,Category,Bookmark){
        $scope.name = 'Carlos Jaramillo';
        Category.getAll(function(data){
            $scope.categories = data.data.categories;
            $scope.currentCategory = data.data.categories[0];
            $scope.bookmarks = Bookmark.query();
        });  
        //$scope.categories = ['HTML5', 'JavaScript', 'CSS3', 'Games'];
        //$scope.bookmarks = [
        //    {id:1, title:'Quizzpot.com', url:'https://quizzpot.com', category: 'JavaScript'},
        //    {id:2, title:'Html5 Game Devs', url:'https://html5gamedevs.com', category: 'Games'},
        //    {id:3, title:'CSS Tricks', url:'https://css-tricks.com', category: 'CSS3'},
        //    {id:4, title:'Bootstrap', url:'https://getbootstrap.com', category: 'CSS3'},
        //    {id:5, title:'Card', url:'https://jessepollak.github.io/card/', category: 'JavaScript'}
        //];  
        //$scope.currentCategory = 'JavaScript';
        $scope.setCurrentCategory = function(category) {
            $scope.currentCategory = category;
        }
        $scope.isCurrentCategory = function(category) {
            return $scope.currentCategory.id === category.id;
        }
        $scope.showWindow = function(bookmark){
            $scope.bookmarkForm.$setPristine();
            $scope.bookmarkForm.$setUntouched();
          
            bookmark = bookmark || {category:$scope.currentCategory,url:''};
            $scope.bookmark = bookmark;
            $('#bookmarkModal').modal('show');
        }
        $scope.save = function(bookmark){
            if($scope.bookmarkForm.$valid){
                if(!bookmark.id){
                    var record = new Bookmark();
                  
                    record.title = bookmark.title;
                    record.url = bookmark.url;
                    record.category_id = bookmark.category.id;
                    //Bookmark.save({},function(){})
                    record.$save(function(response){
                        $scope.bookmarks.push(record);
                    });
                }else{
                    bookmark.$update();
                }
                $('#bookmarkModal').modal('hide');
            }
        }
        $scope.remove = function(bookmark){
            bookmark.$remove(function(){
                for(var i=0,len=$scope.bookmarks.length;i<len;i++){
                  if($scope.bookmarks[i].id === bookmark.id){
                      $scope.bookmarks.splice(i,1);
                      break;
                  }
                }
            });              
        }
    });
})();