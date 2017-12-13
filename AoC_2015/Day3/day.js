function day3_1(radiofiles) {
	if (radiofiles && radiofiles[0])
	{
		var radiofile = radiofiles[0];
		var radioreader = new FileReader();
		
		radioreader.onload = (function(radios) {
			return function(e) {
				var dirlist = e.target.result;
				var dirs = dirlist.split("");
				var row = 0;
				var col = 0;
				var coords = row + "," + col;
				var houses = [];
				houses.push(coords);
				
				for (var i = 0; i < dirs.length; i++)
				{
					switch (dirs[i])
					{
						case "<":
							col--;
							break;
						case ">":
							col++;
							break;
						case "^":
							row++;
							break;
						case "v":
							row--;
							break;
						default:
							console.log("Bad Dir!");
							break;
					}
					coords = row + "," + col;
					
					if (!houses.includes(coords))
					{
						houses.push(coords);
					}
				}
				
				console.log("Houses Delivered: " + houses.length);
			};
		})(radiofile);
		
		radioreader.readAsText(radiofile);
	}
}

function day3_2(radiofiles) {
	if (radiofiles && radiofiles[0])
	{
		var radiofile = radiofiles[0];
		var radioreader = new FileReader();
		
		radioreader.onload = (function(radios) {
			return function(e) {
				var dirlist = e.target.result;
				var dirs = dirlist.split("");
				var santrow = 0;
				var santcol = 0;
				var robrow = 0;
				var robcol = 0;
				var santcoords = santrow + "," + santcol;
				var robcoords = robrow + "," + robcol;
				var houses = [];
				houses.push(santcoords);
				
				var i;
				for (i = 0; i < (dirs.length - 1); i++)
				{
					switch (dirs[i++])
					{
						case "<":
							santcol--;
							break;
						case ">":
							santcol++;
							break;
						case "^":
							santrow++;
							break;
						case "v":
							santrow--;
							break;
						default:
							console.log("Bad Dir!");
							break;
					}
					santcoords = santrow + "," + santcol;
					
					switch (dirs[i])
					{
						case "<":
							robcol--;
							break;
						case ">":
							robcol++;
							break;
						case "^":
							robrow++;
							break;
						case "v":
							robrow--;
							break;
						default:
							console.log("Bad Dir!");
							break;
					}
					robcoords = robrow + "," + robcol;
					
					if (!houses.includes(santcoords))
					{
						houses.push(santcoords);
					}
					if (!houses.includes(robcoords))
					{
						houses.push(robcoords);
					}
				}
				
				if (i == dirs.length)
				{
					console.log("Houses (Robo-)Delivered: " + houses.length);
				}
			};
		})(radiofile);
		
		radioreader.readAsText(radiofile);
	}
}










function test_day3_1() {
	//console.log("Hi!")
	var houses = [];
	var row = 0;
	var col = 0;
	
	fetch('http://adventofcode.com/2015/day/3/input', {mode: 'no-cors'}).then(
		function(response) {
			if(response.status !== 200) {
				console.log('whoops!' + response.status);
				return;
			}
			
			console.log(response.text);
		}
	)
	.catch(function(err) {
		console.log('Fetch Error', err);
		});
	//Deliver origin present
	houses.push = {row, col};
};
