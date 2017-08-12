app.directive('coverflow', function(){
    return{
        restrict: 'E',
        scope: {
            list: '='
        },
        template:
        '<div class="coverflow">'+
            '<div class="coverflow__container">' +
                '<div class="coverflow__element" style="{{loadElementStyle($index)}}" ng-click="changeIndex($index)" ng-repeat="item in list">' +
                    '<h2  class="coverflow__title">{{ item.name }}</h2>' +
                    '<div class="card">'+
                        '<ul>'+
                            '<li>Location: {{item.location}}</li>'+
                            '<li>Capacity: {{item.capacity}}</li>'+
                            '<li>Preferred Genres: <span ng-repeat="genre in item.genres">{{genre}}{{$last ? "" : ", "}}</span></li>'+
                        '</ul>'+
                '</div>' +
                '</div>' +
            '</div>' +
        '</div>',
        
        replace: true,
        link:function(scope, element, attrs)  {
                function listenToKeystrokes() {
                    var e;
                    $(document).keydown(function(e) {
                        if (e.which === 37) {
                            goLeft();
                        } else if (e.which === 39) {
                            goRight();
                        }
                        scope.$apply();
                    });
                }
                scope.coverflowItems = scope.list;
                function init() {
                    scope.index = 0; //parseInt(scope.coverflowItems.length / 2);
                    listenToKeystrokes();
                }
                init();
                function getNonFocussedElementStyle(loc, i, multiplier) {
                    return "transform: translateX(" + String(loc * 40 -12 * multiplier) + "%) rotateY(" + String(loc * -90) +"deg) scale(.6); z-index: " + String(loc * multiplier);
                }
                function getFocussedElementStyle(i) {
                    return "transform: translateZ(0);";
                }
                function goLeft() {
                    if(scope.index !== 0) {
                        scope.index--;
                    }
                }
                function goRight() {
                    if(scope.index !== scope.coverflowItems.length - 1) {
                        scope.index++;
                    }
                }
                scope.changeIndex = function(i) {
                    scope.index = i;
                };
                scope.loadElementStyle = function(i) {
                    var multiplier = scope.index - i;
                    if(i < scope.index) {
                       return getNonFocussedElementStyle(-1, i, multiplier);
                    } else if (i === scope.index) {
                       return getFocussedElementStyle(i);
                    } else {
                       return getNonFocussedElementStyle(1, i, multiplier);
                    }
                };
            }
        }
    }
);