angular.module('schafkopf.directives', [])
.directive('drawElement', function() {

	return {
		link : draw
	};		
	
	function draw($scope, element, attrs, ctrls) {
		// Get the observed scope value from the attributes
		// e.g. draw-element="col" --> value == $scope.col
		$scope.$watch(attrs.drawElement, function(value){
			// Init stuff here once:
			var elementContainer = value;
			// e.g props and css of the div ele
			element.prop("id", elementContainer.id);
			element.css("height", elementContainer.height + "px");
			element.css("width", elementContainer.width + "px");
			// and prepare the canvas ele for later drawing:
			var canvas = element.find("canvas")[0];
			// Canvas supported?
			if (canvas.getContext) {
				canvas.height = elementContainer.height;
				canvas.width = elementContainer.width;
				$scope.ctx = canvas.getContext('2d');
			}
			// --> Draw the background with $watchCollection
			// each time the array values of elements[n][n].text changes
			//drawBlock($scope.ctx, elementContainer);
        });
		
		// Draw the background with $watchCollection each time the elements[n][n] values change
		$scope.$watchCollection(attrs.drawElement, function(newNames, oldNames) {
			drawBlock($scope.ctx, newNames);
		});
		
		function drawBlock(ctx, eleContainer) {

			
			var color_pair = eleContainer.color.split("|");
			// Draw left-top canvas
			if(angular.equals(eleContainer.type,"info_left_top")) {
//				// first triangle
				ctx.fillStyle = getGradient(ctx, ctx.canvas.width, ctx.canvas.height, ctx.canvas.width/8, ctx.canvas.height/8, color_pair[0]);
				ctx.fillRect(eleContainer.left, eleContainer.top, eleContainer.width, eleContainer.height);
				
//				drawGradient(ctx, grd, 0, 0, ctx.canvas.width, ctx.canvas.height, 0, ctx.canvas.height);
//				// second triangle
//				var grd = getGradient(ctx, ctx.canvas.width, ctx.canvas.height, ctx.canvas.width/8, ctx.canvas.height/8, color_pair[1]);
//				drawGradient(ctx, grd, 0, 0, ctx.canvas.width, ctx.canvas.height, ctx.canvas.width, 0);
//			// Draw right-top canvas
			} else if(angular.equals(eleContainer.type,"info_right_top")) {
				// first triangle
				ctx.fillStyle = getGradient(ctx, 0, ctx.canvas.height, ctx.canvas.width - (ctx.canvas.width/8), ctx.canvas.height/8, color_pair[0]);
				ctx.fillRect(eleContainer.left, eleContainer.top, eleContainer.width, eleContainer.height);
				
//				var grd = getGradient(ctx, 0, ctx.canvas.height, ctx.canvas.width - (ctx.canvas.width/8), ctx.canvas.height/8, color_pair[0]);
//				drawGradient(ctx, grd, ctx.canvas.width, 0, 0, ctx.canvas.height, ctx.canvas.width, ctx.canvas.height);
//				// second triangle
//				var grd = getGradient(ctx, 0, ctx.canvas.height, ctx.canvas.width - (ctx.canvas.width/8), ctx.canvas.height/8, color_pair[1]);
//				drawGradient(ctx, grd, ctx.canvas.width, 0, 0, ctx.canvas.height, 0, 0);
			} else if(angular.equals(eleContainer.type,"info_left_bottom")) {
				// first triangle
				ctx.fillStyle = getGradient(ctx, ctx.canvas.width, 0, ctx.canvas.width/8, ctx.canvas.height - (ctx.canvas.height/8), color_pair[0]);
				ctx.fillRect(eleContainer.left, eleContainer.top, eleContainer.width, eleContainer.height);
				
//				var grd = getGradient(ctx, ctx.canvas.width, 0, ctx.canvas.width/8, ctx.canvas.height - (ctx.canvas.height/8), color_pair[0]);
//				drawGradient(ctx, grd, ctx.canvas.width, 0, 0, ctx.canvas.height, 0, 0);
//				// second triangle
//				var grd = getGradient(ctx, ctx.canvas.width, 0, ctx.canvas.width/8, ctx.canvas.height - (ctx.canvas.height/8), color_pair[1]);
//				drawGradient(ctx, grd, ctx.canvas.width, 0, 0, ctx.canvas.height, ctx.canvas.width, ctx.canvas.height);
			} else if(angular.equals(eleContainer.type,"info_right_bottom")) {
				// first triangle
				ctx.fillStyle = getGradient(ctx, 0, 0, ctx.canvas.width - (ctx.canvas.width/8), ctx.canvas.height - (ctx.canvas.height/8), color_pair[0]);
				ctx.fillRect(eleContainer.left, eleContainer.top, eleContainer.width, eleContainer.height);
				
//				var grd = getGradient(ctx, 0, 0, ctx.canvas.width - (ctx.canvas.width/8), ctx.canvas.height - (ctx.canvas.height/8), color_pair[0]);
//				drawGradient(ctx, grd, 0, 0, ctx.canvas.width, ctx.canvas.height, ctx.canvas.width, 0);
//				// second triangle
//				var grd = getGradient(ctx, 0, 0, ctx.canvas.width - (ctx.canvas.width/8), ctx.canvas.height - (ctx.canvas.height/8), color_pair[1]);
//				drawGradient(ctx, grd, 0, 0, ctx.canvas.width, ctx.canvas.height, 0, ctx.canvas.height);
			} else {
				// Draw rectangle for the background
				ctx.fillStyle = eleContainer.color;
				ctx.fillRect(eleContainer.left, eleContainer.top, eleContainer.width, eleContainer.height);
			}
			// Tag with + and - sign:
			if(angular.equals(eleContainer.type,"positive")) {
				ctx.strokeStyle = "white";
				ctx.moveTo(ctx.canvas.width * 0.775, ctx.canvas.height * 0.15);
				ctx.lineTo(ctx.canvas.width * 0.925, ctx.canvas.height * 0.15);
				ctx.stroke();
				ctx.moveTo(ctx.canvas.width * 0.850, ctx.canvas.height * 0.075);
				ctx.lineTo(ctx.canvas.width * 0.850, ctx.canvas.height * 0.225);
				ctx.lineWidth = 2;
				ctx.stroke();
			} else  if(angular.equals(eleContainer.type,"negative")) {
				ctx.strokeStyle = "white";
				ctx.moveTo(ctx.canvas.width * 0.075, ctx.canvas.height * 0.15);
				ctx.lineTo(ctx.canvas.width * 0.225, ctx.canvas.height * 0.15);
				ctx.lineWidth = 2;
				ctx.stroke();
			}
			
			if(angular.equals(eleContainer.type,"points")) {
				var textSplit = eleContainer.text.split("|");
				ctx.font = "20px Comic Sans MS";
				ctx.fillStyle = "white";
				ctx.textAlign = "center";
				ctx.fillText(textSplit[0], ctx.canvas.width/4, ctx.canvas.height/1.5);
				ctx.fillText("|", ctx.canvas.width/2, ctx.canvas.height/1.5);
				ctx.font = "10px Comic Sans MS";
				ctx.fillText("#", ctx.canvas.width/1.6, ctx.canvas.height/1.7);
				ctx.font = "15px Comic Sans MS";
				ctx.fillText(textSplit[1], ctx.canvas.width/1.25, ctx.canvas.height/1.6);
			} else if(angular.equals(eleContainer.type,"info_right")) {
				//ctx.font = "15px glyphicon";Glyphicons Halflings
				ctx.font = "10px glyphicon";
				ctx.fillStyle = "white";
				ctx.textAlign = "center";
				ctx.fillText(".", ctx.canvas.width/4, ctx.canvas.height/2.4);
				ctx.fillText("*", ctx.canvas.width/4, ctx.canvas.height/2.4);
				ctx.fillText(String.fromCharCode(0xe023), 20, ctx.canvas.height/1.5);//&#xe003;
				ctx.fill();
			} else {
				// Fill the canvas with text
				ctx.font = "20px Comic Sans MS";
				ctx.fillStyle = "white";
				ctx.textAlign = "center";
				ctx.fillText(eleContainer.text, ctx.canvas.width/2, ctx.canvas.height/1.5);
			}
			
			// Draw a boarder first
			ctx.strokeStyle = $scope.color_background;
			ctx.lineWidth = 2;
			ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		}

		function getGradient(ctx, x, y, x1 ,y1, color, scope) {
			var grd=ctx.createLinearGradient(x, y, x1, y1);
			grd.addColorStop(0, color);
			grd.addColorStop(1, $scope.color_background);
			return grd;
		}

		function drawGradient(ctx, grd,x1 ,y1 ,x2 ,y2 ,x3 ,y3) {
			ctx.fillStyle = grd; //"#ed9c28";
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.lineTo(x3, y3);
			ctx.closePath();
			ctx.fill();
		}
	}
});

