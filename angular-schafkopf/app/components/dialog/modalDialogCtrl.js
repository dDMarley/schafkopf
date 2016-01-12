angular.module('schafkopf.controllers')
.controller('ModalDialogCtrl', function($scope, $uibModal, $log) {
	$scope.open = function(size) {
		var modalInstance = $uibModal.open({
			animation : true,
			templateUrl : 'app/components/dialog/modalDialog.html',
			controller : 'ModalInstanceCtrl',
			size : size,
			resolve : {
				items : function() {
					return $scope.items;
				}
			}
		});

//		modalInstance.result.then(function(selectedItem) {
//			$scope.selected = selectedItem;
//			$scope.elements[selectedItem][0].id = selectedItem;
//		}, function() {
//			$log.info('Modal dismissed at: ' + new Date());
//		});
	};

	// $scope.animationsEnabled = true;
	// $scope.toggleAnimation = function() {
	// $scope.animationsEnabled = !$scope.animationsEnabled;
	// };

})

// Please note that $modalInstance represents a modal window (instance)
// dependency.
// It is not the same as the $uibModal service used above.

.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, items) {

	$scope.ok = function() {
		$uibModalInstance.close(); // e.g. close($scope.selected.item);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
})

.controller('ModalElementsCtrl', function($rootScope, $scope, $log) {
	
	// Tabs section ---------------------------------------------
	$scope.tabs = {
		rufspiel : "Rufspiel",
		ramsch : "Ramsch",
		solo : "Solo",
		wenz : "Wenz",
		selected : "Rufspiel"
	};
	$scope.selectTab = function(selected) {
		$scope.tabs.selected = selected;
		initModalPanel();
	};
	$scope.status = {
		isopen : false
	};

	$scope.toggled = function(open) {
		$log.log('Dropdown is now: ', open);
	};

	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	};
	// ----------------------------------------------------------
	// Winner checkbox section ----------------------------------
	$scope.winner = {
		iswinner : "true"
	};
	// ----------------------------------------------------------
	// Du/Sie radios section ------------------------------------
	$scope.checkbox = {
	    du: false,
	    sie: false,
	    schneider: false,
	    schwarz: false
	};
	$scope.$watchCollection('checkbox', function(newValue, oldValue) {
		if(newValue.sie && !oldValue.du) {
			$scope.checkbox.du = true;
		}
		if(!newValue.du && oldValue.sie) {
			$scope.checkbox.sie = false;
		}
		if(newValue.schwarz && !oldValue.schneider) {
			$scope.checkbox.schneider = true;
		}
		if(!newValue.schneider && oldValue.schwarz) {
			$scope.checkbox.schwarz = false;
		}
	});
	
	
	// ----------------------------------------------------------
	// Player section -------------------------------------------
	$scope.playersOrgi = [ 'Spieler 1', 'Spieler 2', 'Spieler 3', 'Spieler 4' ];
	$scope.players1tmp = [];
	$scope.players2tmp = [];
	angular.copy($scope.playersOrgi, $scope.players1tmp);
	angular.copy($scope.playersOrgi, $scope.players2tmp);
	
	$scope.player1Selected = "Wähle Spieler";
	
	$scope.player2Selected = "Wähle Spieler";
	
	$scope.selectPlayer1 = function(player) {
		$scope.player1Selected = player;
		// Deep copy original list:
		angular.copy($scope.playersOrgi, $scope.players2tmp);
		index = $scope.players2tmp.indexOf(player);
		if (index > -1) {
			$scope.players2tmp.splice(index, 1);
		}
	};
	
	$scope.selectPlayer2 = function(player) {
		$scope.player2Selected = player;
		// Deep copy original list:
		angular.copy($scope.playersOrgi, $scope.players1tmp);
		index = $scope.players1tmp.indexOf(player);
		if (index > -1) {
			$scope.players1tmp.splice(index, 1);
		}
	};
	// ----------------------------------------------------------	
	// Läufer section -------------------------------------------
	$scope.tmpLaeufer = {
		ruf : [0,3,4,5,6,7,8],
		solo: [0,3,4,5,6,7],
		wenz: [0,2,3,4]
	};
	$scope.laeufer = $scope.tmpLaeufer.ruf;
	$scope.laeuferSelected = "Wähle Läufer";
	$scope.selectLaeufer = function(laeufer) {
		$scope.laeuferSelected = laeufer;
	};
	$scope.setDropdown = function(data) {
		$scope.laeufer = data;
	};
	// ----------------------------------------------------------
	
	$rootScope.collectRowData = function() {
		return gameData = {
				play_type : $scope.tabs.selected,
				first_winner : $scope.player1Selected,
				second_winner : $scope.player2Selected,
				is_winner : $scope.winner.iswinner,
				is_du : $scope.checkbox.du,
				is_sie : $scope.checkbox.sie,
				is_schneider : $scope.checkbox.schneider,
				is_schwarz : $scope.checkbox.schwarz,
				laeufer : $scope.laeuferSelected
		};
	};
	
	/**
	 * Init all elements each time a tab is changed:
	 */
	var initModalPanel = function() {
		$scope.winner.iswinner = "true";
		$scope.checkbox.du = false;
		$scope.checkbox.sie = false;
		$scope.checkbox.schneider = false,
		$scope.checkbox.schwarz = false,
		$scope.player1Selected = "Wähle Spieler";
		$scope.player2Selected = "Wähle Spieler";
		angular.copy($scope.playersOrgi, $scope.players1tmp);
		angular.copy($scope.playersOrgi, $scope.players2tmp);
		$scope.laeufer = [];
		$scope.laeuferSelected = "Wähle Läufer";
	};
});