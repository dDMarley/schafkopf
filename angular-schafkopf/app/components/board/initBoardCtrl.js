angular.module('schafkopf.controllers', [])
.controller('InitBoardCtrl', function($rootScope, $scope) {
	// Config goes here
	var rows = 24;
	$rootScope.player_count = 4;
	var columns = ($scope.player_count * 2) + 1;
	var width = 40;
	$rootScope.width = width;
	var height = 40;
	$rootScope.height = height;
	var top = 0;
	var left = 0;
	
	// https://color.adobe.com/de
	$scope.color_background = "#A19776";
	$scope.color_game_border = "#7F3442";
	$scope.color_game_content_dark = "#151624";
	$scope.color_game_content_light = "#3F4D59";
	var color_game_map = ["#151624", "#151624", "#3F4D59","#3F4D59","#151624","#151624","#3F4D59", "#3F4D59"];
	
	// -------------------------------
	
	// ---------- Get Players ---------
	
	$rootScope.players = {
			player_one : {
				name: "Spieler 1",
				id: "1",
				position: "player_1"
			},
			player_two : {
				name: "Spieler 2",
				id: "1",
				position: "player_2"
			},
			player_three : {
				name: "Spieler 3",
				id: "1",
				position: "player_3"
			},
			player_four : {
				name: "Spieler 4",
				id: "1",
				position: "player_4"
			},
	};
	
	// --- Plus Minus row
	var header_row = [];
	var footer_row = [];
	for(var j = 0; j <= columns; j++) {
		var id_header;
		var id_footer;
		var text_header;
		var text_footer;
		var color;
		var type_header;
		var type_footer;
		var width_header = width;
		if (j == 0) {
			id_header = "corner_top_" + j;
			id_footer = "corner_bootom_" + j;
			type_header = "info_left_top";
			type_footer = "info_left_bottom";
			text_header = "";
			text_footer = "";
			color = $scope.color_game_border + "|" + $scope.color_game_border;
		} else if (j == columns) {
			id_header = "corner_top_" + j;
			id_footer = "corner_bootom_" + j;
			type_header = "info_right_top";
			type_footer = "info_right_bottom";
			text_header = "";
			text_footer = "";
			color = $scope.color_game_border + "|" + $scope.color_game_border;
		} else if (j % 2) {
			id_header = "points_" + j;
			id_footer = "points_pos_" + j;
			type_header = "points";
			type_footer = "points_pos";
			text_header = "0|-";
			text_footer = "0";
			width_header = width * 2;
			color = $scope.color_game_border;
		} else {
			id_header = "solos_" + j;
			id_footer = "points_neg_" + j;
			type_header = "amount_solos";
			type_footer = "points_neg";
			text_header = "-";
			text_footer = "0";
			color = $scope.color_game_border;
		}
		
		if(j == 0 || j == columns || j % 2) {
			header_row.push({
				id : id_header,
				text: text_header,
				type : type_header,
				color : color,
				width : width_header,
				height : height,
				top : top,
				left : left
			});
		}
		
		footer_row.push({
			id : id_footer,
			text: text_footer,
			type : type_footer,
			color : color,
			width : width,
			height : height,
			top : top,
			left : left
		});
	}
	
	// Create scrollable game board
	var elements = [];
	var row = [];
	var id = 0;
	for (var i = 1; i <= rows; i++) {
		row = [];
		for (var j = 0; j <= columns; j++) {
			// Increment the id counter
			id++;
			var text = "";
			var color;
			if(j == 0) {
				color = $scope.color_game_border;
				type = "info_left";
				text = i;
			} else if(j == columns) {
				color = $scope.color_game_border;
				type = "info_right";
			} else if (j % 2) {
				color = color_game_map[j - 1];//"#5CB85C";
				type = "positive";
			} else {
				color = color_game_map[j - 1];//'#428BCA';
				type = "negative";
			}
			// Push to the array
			row.push({
				id : id,//TODO
				text: text,
				type : type,
				color : color,
				width : width,
				height : height,
				top : top,
				left : left
			});

		}
		elements.push(row);
	}
	$rootScope.header_row = header_row;
	$rootScope.elements = elements;
	$rootScope.footer_row = footer_row;
	$rootScope.round_number = 0;
});