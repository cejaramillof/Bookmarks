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
    
    .service('Category',['$http',function($http){
        this.getAll = function(success,failure){
              //$http.get('http://bookmarks-angular.herokuapp.com/api/categories')
              $http({
                  method:'GET',
                  url:'http://bookmarks-angular.herokuapp.com/api/categories' 
              }).then(success,failure); 
        }
    }])
    
    .factory('Bookmark',['$resource',function($resource){
        return $resource('http://bookmarks-angular.herokuapp.com/api/bookmarks/:id',{
            id : '@id'
        },{
            update : {method:'PUT'}
        });
    }])
    
    .directive('bootstrapSelect',['$parse',function($parse){
        return {
            link: function (scope, element, attrs) {
                var collection = attrs.bootstrapSelect,
                    valueProperty = attrs.selectValue,
                    labelProperty = attrs.selectLabel,
                    model = attrs.selectModel,
                    getter = $parse(model),
                    setter = getter.assign;
              
                $(element).selectpicker();
              
                $(element).change(function(){
                    var col = scope[collection],
                        val = $(element).val();
                  
                    for(var i=0,len=col.length;i<len;i++){
                        if(val == col[i][valueProperty]){
                            setter(scope,col[i]);
                            break;
                        }
                    }
                });
              
                scope.$watch(model,function(data){
                    if(angular.isObject(data)){
                        $(element).selectpicker('val',data[valueProperty]);
                    }
                });
              
                scope.$watch('categories',function(data){
                    if(data){
                        $(element)
                            .find('option')
                            .remove();
                        var html = [];
                        $.each(data, function(index, object) {
                            html.push('<option value="'+object[valueProperty]+'">');
                            html.push(object[labelProperty]);
                            html.push('</option>');
                        });
                        $(element).append(html.join(''));
                        $(element).selectpicker('refresh');
                    }
                })
            }
        }
    }])
    
    .controller('MainController',['$scope','Category','Bookmark',function($scope,Category,Bookmark){
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
    }]);
})();