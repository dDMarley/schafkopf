angular.module('schafkopf.controllers')
.controller('CalcRowCtrl', function($scope) {
	
	// Its called per event $broadcast down from the modal dialog,
	// but could be call from other components
	$scope.$on('ok_row_calculation',
			function(evt, data) {
		var rowData = data;
		result = calcRow(rowData);
		var row = $scope.elements[$scope.round_number];
		var counter = 1;
		for (var i = 1; i < 5; i++) {
			if (isPlayerWinner(rowData, 'Spieler ' + i)) {
				if (result[0] > 0) {
					row[counter].text = result[0];
					row[counter + 1].text = 0;
				} else {
					row[counter + 1].text = (result[0]);
					row[counter].text = 0;
				};
			} else {
				if (result[0] > 0) {
					row[counter + 1].text = (result[0] / result[1] * - 1);
					row[counter].text = 0;
				} else {
					row[counter].text = (result[0] / result[1] * -1);
					row[counter + 1].text = 0;
				};
			}
			counter = counter + 2;
		};
		$scope.round_number++;
		calcHeader(rowData, row);
		calcFooter(rowData, row);
	});
	
	function calcHeader(rowData, row) {
		var points;
		var solos;
		// Condition solo:
		var is_solo = angular.equals(rowData.play_type, "Solo") || angular.equals(rowData.play_type, "Wenz");
		// Add actual values to the points/solos elements
		for (var i = 1; i <= $scope.player_count; i++) {
			// Split existing header ele:
			var text_split = $scope.header_row[i].text.split("|");
			// Calc the points first:
			points = parseInt(text_split[0]) + parseInt(row[i + i -1].text) + parseInt(row[i + i].text);
			// Now check for winning solos:
			solos = text_split[1];
			// A solo must be successful to count and for that, increment in the inner header row
			if(angular.equals(rowData.is_winner, "true") && is_solo) {
				// Lets check if the actuall player is the winner
				if(angular.equals(rowData.first_winner, "Spieler " + i)) {
					if(!angular.equals(solos, "-")) {
						solos = parseInt(solos) + 1;
					} else {
						solos = 1;
					}
				}
			}
			// Populate the calculated values for drawing
			$scope.header_row[i].text = points + "|" + solos;
		}
		// Mark a played solo no mater if successful or not
		if(is_solo) {
			row[row.length - 1].text = "*"; 
		}
	}
	
	function calcFooter(rowData, row) {
		for (var i = 1; i <= 8; i = i + 2) {
			$scope.footer_row[i].text = parseInt($scope.footer_row[i].text) + parseInt(row[i].text);
			$scope.footer_row[i + 1].text = parseInt($scope.footer_row[i + 1].text) + parseInt(row[i + 1].text);
		}
	}
	
	var isPlayerWinner = function(rowData, player) {
		var winner1 = rowData.first_winner; //.split("@@")[1];
		var winner2 = "";
		if (rowData.second_winner) {
			winner2 = rowData.second_winner; //.split("@@")[1];
		}
		if (player === winner1 || player === winner2) {
			return true;
		} else {
			return false;
		}
	};
	
	var calcRow = function(rowData) {
		if (rowData.play_type === "Rufspiel") {
			return calcRufSpiel(rowData);
		} else if (rowData.play_type === "Ramsch") {
			return calcRamsch(rowData);
		} else if (rowData.play_type === "Solo") {
			return calcSolo(rowData);
		} else {
			return calcWenz(rowData);
		}
	};
	
	function calcRufSpiel(rowData) {
		var rufSpiel = 1;
		if (rowData.is_schneider) {
			rufSpiel++;
		}
		if (rowData.is_schwarz) {
			rufSpiel++;
		}
		if (rowData.laeufer >= 3) {
			rufSpiel = rufSpiel + rowData.laeufer;
			if (rowData.laeufer == 8) {
				rufSpiel = 11;
			}
		}
		var array = [];
		array[0] = rufSpiel;
		array[1] = 1;
		return array;
	};
	
	function calcRamsch(rowData) {
		var array = [];
		if(rowData.is_winner == 'true') {
			array[0] = 6;
		} else {
			array[0] = -6;
		}
		array[1] = 3;
		return array;
	};
	
	function calcSolo(rowData) {
		var array = [];
		// Special handling for 'du' & 'sie':
		if (rowData.is_sie) {
			array[0] = 54;
			array[1] = 3;
			return array;
		} else if (rowData.is_du) {
			if (rowData.laeufer >= 3 && rowData.laeufer <= 7) {
				array[0] = (8 + rowData.laeufer) * 3;
				array[1] = 3;
				return array;
			}
		}
		// Normal solo handling:
		var solo = 4;
		if (rowData.is_schneider) {
			solo++;
		}
		if (rowData.is_schwarz) {
			solo++;
		}
		if (rowData.laeufer >= 3 && rowData.laeufer <= 7) {
			solo = solo + rowData.laeufer;
		}
		if(rowData.is_winner == 'true') {
			array[0] = solo * 3;
		} else {
			array[0] = solo * -3;
		}
		array[1] = 3;
		return array;
	};
	
	function calcWenz(rowData) {
		var array = [];
		// Special handling for 'du':
		if (rowData.is_du) {
			if (rowData.laeufer >= 2 && rowData.laeufer <= 7) {
				array[0] = (8 + rowData.laeufer) * 3;
				array[1] = 3;
				return array;
			};
		}
		var wenz = 4;
		if (rowData.is_schneider) {
			wenz++;
		}
		if (rowData.is_schwarz) {
			wenz++;
		}
		if (rowData.laeufer >= 2 && rowData.laeufer <= 7) {
			wenz = wenz + rowData.laeufer;
		}
		if(rowData.is_winner == 'true') {
			array[0] = wenz * 3;
		} else {
			array[0] = wenz * -3;
		}
		array[1] = 3;
		return array;
	};
});