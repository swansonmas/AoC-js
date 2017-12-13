function day2_1(giftfiles) {
	if(giftfiles && giftfiles[0]) {
		var giftfile = giftfiles[0]
		var giftreader = new FileReader();
		
		giftreader.onload = (function(gifts) {
			return function(e) {
				//console.log(e.target.result)
				var giftlist = e.target.result
				var gifts = giftlist.split("\r\n")
				var paper = 0
				
				for(var i = 0; i < gifts.length; i++) {
					var dims = gifts[i].split("x")
					var areas = [];
					areas.push(dims[0]*dims[1])
					areas.push(dims[1]*dims[2])
					areas.push(dims[2]*dims[0])
					
					areas.sort(function(a, b) { return a - b; });
					paper += (3*areas[0]) + (2*areas[1]) + (2*areas[2])
				}
				console.log("Paper Required: " + paper)
			};
		})(giftfile);
		
		giftreader.readAsText(giftfile);
	}
}

function day2_2(giftfiles) {
	if(giftfiles && giftfiles[0]) {
		var giftfile = giftfiles[0]
		var giftreader = new FileReader();
		
		giftreader.onload = (function(gifts) {
			return function(e) {
				//console.log(e.target.result)
				var giftlist = e.target.result
				var gifts = giftlist.split("\r\n")
				var ribbon = 0;
				
				for(var i = 0; i < gifts.length; i++) {
					var dims = gifts[i].split("x").sort(function(a, b) { return a - b; });
					var areas = [];
					areas.push(dims[0]*dims[1])
					areas.push(dims[1]*dims[2])
					areas.push(dims[2]*dims[0])
					
					areas.sort(function(a, b) { return a - b; });
					ribbon += (2*dims[0]) + (2*dims[1]) + (dims[0]*dims[1]*dims[2])
				}
				console.log("Ribbon Required: " + ribbon)
			};
		})(giftfile);
		
		giftreader.readAsText(giftfile);
	}
}