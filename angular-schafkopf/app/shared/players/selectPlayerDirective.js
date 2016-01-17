angular.module('schafkopf.directives')
.controller('SelectPlayerController',['$scope', function($scope) {
	$scope.checked = false;
//	$scope.visible = false;
	
	// Prepare the dropdown items:
	$scope.players_position = [ 'Spieler 1', 'Spieler 2', 'Spieler 3', 'Spieler 4' ];
	if($scope.player_count == 5) {
		$scope.players_position[4] = 'Spieler 5';
	}
	// Init player select:
	$scope.selected = $scope.players_position[0];
	$scope.focusedPlayer = $scope.players[0];
	// On dropdown change:
	$scope.onSelect = function(playerSelect) {
		var sP = $scope.players[playerSelect.split(" ")[1] - 1];
		if(!sP.isInit) {
			$scope.yourName = "";
		} else {
			$scope.yourName = sP.name;
		}
		$scope.selected = playerSelect;
		$scope.focusedPlayer = sP;
	};
	// On input change:
	$scope.onInputChange = function(value) {
		$scope.focusedPlayer.name = value;
		$scope.focusedPlayer.isInit = true;
	};

} ])
.directive('selectPlayer',function() {
			return {

				templateUrl : 'app/shared/players/playerView.html',
				controller : 'SelectPlayerController',
				link : function($scope, element, attrs, ctrls) {

					$scope.$watchCollection($scope.players, function(value) {
						var div = element.find("table").find("div");
						div.css("width", ($scope.width * 2) + "px");
						div.css("height", ($scope.height * 1.5) + "px");
						div.css("line-height", ($scope.height * 1.5) + "px");
						div.eq(0).css("width", $scope.width + "px").css(
								"background-color", "transparent");
						div.eq($scope.player_count + 1).css("width",
								$scope.width + "px").css("background-color",
								"transparent");
					});
				}
			};

		});