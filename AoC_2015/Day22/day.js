var showDoneMessage = function(id, message, variable) {
	var newP = document.createElement("p");
	var newMsg = document.createTextNode(message + variable);
	newP.appendChild(newMsg);
	document.getElementById(id).after(newP);
}

var readlines = function(files) {
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
};

var buildJSON = function(entries, key, keys, values) {
	var obj = {}
	entries.map( (entry) => {
		obj[entry[key].replace(':','')] = {};
		keys.map( (k, i) => {
			obj[entry[key].replace(':','')][entry[k].replace(':','')] = parseInt(entry[values[i]], 10);
		});
	});
	
	return obj;
};

var permute = function(s) {
	var fn = function(s) {
		var i, ch;
		for (i = 0; i < s.length; i++) {
			ch = s.splice(i, 1)[0];
			usedChars.push(ch);
			if (s.length == 0) {
				permArr.push(usedChars.slice());
			}
			fn(s);
			s.splice(i, 0, ch);
			usedChars.pop();
		}
	}
	var permArr = [],
		usedChars = [];
	fn(s);
	return permArr
};

var permuteStr = function(s) {
	return permute(s.split('')).map( p => p.join('') );
}

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

var combineStr = function(a, min, max) {
	return combine(a, min, max).map( c => c.join('') );
}

// [Shield, Poison, Recharge]
//  0     1       2      3   4      5
// [Mana, Damage, Armor, HP, Mana+, Turns]
function nextTurns(battle, mode) {	
	battle['turn']++;
	
	if (battle['turn'] % 2 == 0) {
		battle['user']['hp'] -= mode;
	}
	if (battle['user']['hp'] <= 0) {
		var lostMode = [];
		return lostMode;
	}
	
	var bfx = battle['user']['fx'];
	battle['user']['fx'] = bfx.map( turns => turns - 1);
	bfx.map( function(turns, effect) {
		if (turns > -1) {
			switch (effect) {
				case 0: // Shield
					if (turns == 0) { battle['user']['arm'] = 0; }
					//else { battle['user']['arm'] = spells['Shield'][2]; }
					break;
				case 1: // Poison
					battle['boss']['hp'] -= spells['Poison'][1];
					if (battle['boss']['hp']  <= 0) {
						if (battle['spent'] < input[0]) {
							input = [battle['spent'],battle['spells']];
						}
						var won = [];
						return won;
					}
					break;
				case 2: // Recharge
					battle['user']['mana'] += spells['Recharge'][4];
					break;
				default:
					console.log('Bad Effect!');
					break;
			}
		}
	});
	
	
	if (battle['turn'] % 2 == 1) { // Boss' turn
		battle['user']['hp'] -= (battle['boss']['dmg'] - battle['user']['arm']);
		if (battle['user']['hp'] > 0) {
			return battle;
		} else {
			var lost = []
			return lost;
		}
	}
	else { // User's turn
		var turns = [];
		var btl;
		for (var spl in spells) {
			if (spells.hasOwnProperty(spl)) {
				btl = JSON.parse(JSON.stringify(battle));
				if((btl = cast(spl, btl)) !== null) {
					btl['spells'].push(spl.slice(0,1));
					if (btl['boss']['hp'] > 0) {
						turns.push(btl);
					}
					else if (btl['spent'] < input[0]) {
						input = [btl['spent'],btl['spells']];
						//wonQuick
					}
					else{
						//wonSlow
					}
				}
				else {
					//return battle;
				}
			}
		}
		return turns;
	}

	//return battle;
}

// [Shield, Poison, Recharge]
//  0     1       2      3   4      5
// [Mana, Damage, Armor, HP, Mana+, Turns]
function cast(spell, battle) {
	battle['spent'] += spells[spell][0];
	battle['user']['mana'] -= spells[spell][0];
	if (battle['user']['mana'] < 0) { return null; }
	
	switch(spell) {
		case 'Magic Missile':
			battle['boss']['hp'] -= spells[spell][1];
			break;
	    case 'Drain':
			battle['boss']['hp'] -= spells[spell][1];
			battle['user']['hp'] += spells[spell][3];
			break;
	    case 'Shield':
			if (battle['user']['fx'][0] <= 0) {
				battle['user']['fx'][0] = spells[spell][5]-1;
				battle['user']['arm'] = spells[spell][2];
			}
			else {
				battle = null;
			}
			break;
	    case 'Poison':
			if (battle['user']['fx'][1] <= 0) {
				battle['user']['fx'][1] = spells[spell][5]-1;
			}
			else {
				battle = null;
			}
			break;
	    case 'Recharge':
			if (battle['user']['fx'][2] <= 0) {
				battle['user']['fx'][2] = spells[spell][5]-1;
			}
			else {
				battle = null;
			}
			break;
		default:
			console.log('Bad Spell');
			break;
	}
	
	return battle;
}

function testBattl() {
	var btl = { user, boss, 'turn': -1, 'spent': 0, 'spells': [] };	
}

function func1(strs) {
	var btl = { user, boss, 'turn': -1, 'spent': 0, 'spells': [] };
	var btls = [btl];
	
	while (btls.length > 0) {
		var nBtl;
		//if (input[0] == Infinity) {
			nBtl = btls.pop();
		/*}
		else {
			nBtl = btls.shift();
		}*/
		if (nBtl['spent'] > input[0]) {
			//console.log('Too Slow!')
		}
		else if (nBtl !== undefined) { 
			btls = btls.concat(nextTurns(nBtl, 0));
		}
		else {
			console.log('whoops')
		}
	}
	
	return input;
}

function func2(strs) {
	var btl = { user, boss, 'turn': -1, 'spent': 0, 'spells': [] };
	var btls = [btl];
	
	while (btls.length > 0) {
		var nBtl;
		//if (input[0] == Infinity) {
			nBtl = btls.pop();
		/*}
		else {
			nBtl = btls.shift();
		}*/
		if (nBtl['spent'] > input[0]) {
			//console.log('Too Slow!')
		}
		else if (nBtl !== undefined) { 
			btls = btls.concat(nextTurns(nBtl, 1));
		}
		else {
			console.log('whoops')
		}
	}
	
	return input;
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

var user = {
	hp: 50,
	mana: 500,
	arm: 0,
	fx: [-1, -1, -1] // [Shield, Poison, Recharge]
}

var boss = {
	hp: 51,
	dmg: 9
}
// 						Mana	Damage 	Armor 	HP 	Mana+ 	Turns
var spells = {
	'Magic Missile':	[53 ,	4,		0,		0,	0  ,	0],
	'Drain':			[73 ,	2,		0,		2,	0  ,	0],
	'Shield':			[113,	0,		7,		0,	0  ,	6],
	'Poison':			[173,	3,		0,		0,	0  ,	6],
	'Recharge':			[229,	0,		0,		0,	101,	5]
};
var input = [Infinity,[]];
window.onload = function() {
	var lines = input;//.split("\n").map( (line) => line.split(" "));
	/*
	*/
	lines = [Infinity,[]];
	var val1 = func1(lines);
	showDoneMessage("input1", "Part 1: ", val1);
	
	input = [Infinity,[]];
	var val2 = func2(lines);
	showDoneMessage("input2", "Part 2: ", val2);
}