function showDoneMessage(id, message, variable) {
	var newP = document.createElement("p");
	var newMsg = document.createTextNode(message + variable);
	newP.appendChild(newMsg);
	document.getElementById(id).after(newP);
}

function readlines(files) {
	return new Promise((resolve, reject) => {
		if (files && files[0])
		{
			var file = files[0];
			var reader = new FileReader();
			
			reader.onload = () => {
				resolve(reader.result.split("\r\n"));
			};
			
			reader.readAsText(file);
		}
	});
}

var buildJSON = function (entries, key, keys, values) {
	var obj = {}
	entries.map( (entry) => {
		obj[entry[key].replace(':','')] = {};
		keys.map( (k, i) => {
			obj[entry[key].replace(':','')][entry[k].replace(':','')] = parseInt(entry[values[i]], 10);
		});
	});
	
	return obj;
};

var permute = function(input) {
	var fn = function(input) {
		var i, ch;
		for (i = 0; i < input.length; i++) {
			ch = input.splice(i, 1)[0];
			usedChars.push(ch);
			if (input.length == 0) {
				permArr.push(usedChars.slice());
			}
			fn(input);
			input.splice(i, 0, ch);
			usedChars.pop();
		}
	}
	var permArr = [],
		usedChars = [];
	fn(input);
	return permArr
};

var combine = function(a, min, max) {
    var fn = function(n, src, got, all) {
        if (n == 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }
    var all = [];
    for (var i = min; i <= max; i++) {
        fn(i, a, [], all);
    }
	if (a.length <= max) { 
		all.push(a);
	}
    return all;
};

function iWin(udmg, uarm) {
	var udiff = Math.max((udmg - barm),1);
	var bdiff = Math.max((bdmg - uarm),1);
	var uturns = Math.ceil((bhp - udiff) / udiff);
	var bturns = Math.ceil(uhp / bdiff);
	return uturns < bturns;
}

//Cost  Damage  Armor
function func1(strs) {
	var cost = 0;
	var udmg = 0, uarm = 0;                                     
	var ringsTwo = combine(['Defense+1','Damage+1','Defense+2','Damage+2','Damage+3','Defense+3'],0,2);
	var battles = [];
	for (var wep in weapons) {
		if (weapons.hasOwnProperty(wep)) {
			var cw = weapons[wep];
			cost = 0;
			udmg = 0;
			uarm = 0;
			
			cost += cw[0];
			udmg += cw[1];
			if (iWin(udmg,uarm)) { battles.push(cost); }
			
			ringsTwo.map( cr => {
				var crCost = 0;
				var crDmg = 0, crArm = 0;
				cr.map ( rng => {
					crCost += rings[rng][0];
					crDmg += rings[rng][1];
					crArm += rings[rng][2];
				});
				if (iWin(udmg+crDmg,uarm+crArm)) { battles.push(cost + crCost); }
			});
			
			for (var arm in armor) {
				if (armor.hasOwnProperty(arm)) {
					var ca = armor[arm];
					var caCost = ca[0];
					var caArm = ca[2];
					
					if (iWin(udmg,uarm+caArm)) { battles.push(cost + caCost); }
					
					ringsTwo.map( cr => {
						var crCost = 0;
						var crDmg = 0, crArm = 0;
						cr.map ( rng => {
							crCost += rings[rng][0];
							crDmg += rings[rng][1];
							crArm += rings[rng][2];
						});
						if (iWin(udmg+crDmg,uarm+caArm+crArm)) { battles.push(cost + caCost + crCost); }
					});
				}
			}
		}
	}
	
	battles.sort( (a,b) => a - b);
	
	return battles[0];
}

function func2(strs) {
	var cost = 0;
	var udmg = 0, uarm = 0;                                     
	var ringsTwo = combine(['Defense+1','Damage+1','Defense+2','Damage+2','Damage+3','Defense+3'],0,2);
	var battles = [];
	for (var wep in weapons) {                                  
		if (weapons.hasOwnProperty(wep)) {                      
			var cw = weapons[wep];
			cost = 0;
			udmg = 0;
			uarm = 0;
			
			cost += cw[0];
			udmg += cw[1];
			if (!iWin(udmg,uarm)) { battles.push(cost); }
			
			ringsTwo.map( cr => {
				var crCost = 0;
				var crDmg = 0, crArm = 0;
				cr.map ( rng => {
					crCost += rings[rng][0];
					crDmg += rings[rng][1];
					crArm += rings[rng][2];
				});
				if (!iWin(udmg+crDmg,uarm+crArm)) { battles.push(cost + crCost); }
			});
			
			for (var arm in armor) {
				if (armor.hasOwnProperty(arm)) {
					var ca = armor[arm];
					var caCost = ca[0];
					var caArm = ca[2];
					
					if (!iWin(udmg,uarm+caArm)) { battles.push(cost + caCost); }
					
					ringsTwo.map( cr => {
						var crCost = 0;
						var crDmg = 0, crArm = 0;
						cr.map ( rng => {
							crCost += rings[rng][0];
							crDmg += rings[rng][1];
							crArm += rings[rng][2];
						});
						if (!iWin(udmg+crDmg,uarm+caArm+crArm)) { battles.push(cost + caCost + crCost); }
					});
				}
			}
		}
	}
	
	battles.sort( (a,b) => b - a);
	
	return battles[0];
}

function day1(files) {
	var read1 = readlines(files);
	read1.then(function (strings) {
		var val1 = func1(strings);
		
		showDoneMessage("input1", "Part 1: ", val1);
	});
}

function day2(files) {
	var read2 = readlines(files);
	read2.then(function (strings) {
		var val2 = func2(strings);
		
		showDoneMessage("input2", "Part 2: ", val2);
	});
}

var uhp = 100;
var bhp = 104;
var bdmg = 8;
var barm = 1;
var input = ``;

var weapons = {
'Dagger':[    8,     4,       0],
'Shortsword':[   10,     5,       0],
'Warhammer':[   25,     6,       0],
'Longsword':[   40,     7,       0],
'Greataxe':[   74,     8,       0]
}                                
var armor = {                     
'Leather':[   13,     0,       1],
'Chainmail':[   31,     0,       2],
'Splintmail':[   53,     0,       3],
'Bandedmail':[   75,     0,       4],
'Platemail':[  102,     0,       5]
}             
var rings = {  
'Defense+1':[    20,     0,       1],                   
'Damage+1':[    25,     1,       0],
'Defense+2':[    40,     0,       2],
'Damage+2':[    50,     2,       0],
'Damage+3':[   100,     3,       0],
'Defense+3':[    80,     0,       3]
}
window.onload = function() {
	var lines = input;//.split("\n").map( (line) => line.split(" "));
	
	var val1 = func1(lines);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var val2 = func2(lines);
	showDoneMessage("input2", "Part 2: ", val2);
}