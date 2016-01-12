angular.module('schafkopf.directives').directive('selectPlayer', function() {
	
	return {
		templateUrl: 'app/shared/players/playerView.html',
		link : function($scope, element, attrs, ctrls) {
			
			$scope.$watch(attrs.selectPlayer, function(value){
				var div = element.find("div");
				div.css("width", ($scope.width * 2) + "px");
				div.css("height", ($scope.height * 2) + "px");
				div.eq(0).css("width", $scope.width + "px").css("background-color", "transparent");
				div.eq($scope.player_count + 1).css("width", $scope.width + "px").css("background-color", "transparent");
			});
		}
	};

});