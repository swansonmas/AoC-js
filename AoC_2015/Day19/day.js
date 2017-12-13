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
}

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

var combine = function(a, min) {
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
    for (var i = min; i < a.length; i++) {
        fn(i, a, [], all);
    }
    all.push(a);
    return all;
}

function func1(strs) {
	var tfrs = new Map();
	strs.map( str => {
		if (tfrs.has(str[0])) {
			tfrs.get(str[0]).push(str[2]);
		} else {
			tfrs.set(str[0],[str[2]]);
		}
	});
	
	var mols = [];
	tfrs.forEach( (tfrArr, ltr) => {
		var ltrR = new RegExp(ltr, 'g');
		var newMol;
		while ((newMol = ltrR.exec(mol)) !== null) {
			var matches = mol.match(new RegExp(ltr, 'g'));
			tfrArr.map( (tfrStr) => {
				mols.push(newMol.input.slice(0,newMol.index) + tfrStr + newMol.input.slice(ltrR.lastIndex));
			});
		}
	});
	
	var unique = new Set(mols);
	return unique.size;
}

function stepMol(tfrs, curMol) {
	var mols = [];
	var minL = 0;
	for (var tfr of tfrs) {
		if ((tfr[0].length - tfr[1].length) >= minL) {
			var ltrR = new RegExp(tfr[0], 'g');
			var newMol;
			while ((newMol = ltrR.exec(curMol)) !== null) {
				minL = tfr[0].length - tfr[1].length;
				
				var matchStr = newMol.input.slice(0,newMol.index) + tfr[1] + newMol.input.slice(ltrR.lastIndex);
				mols.push(matchStr);
			}
		} else {
			break;
		}
	}
	
	var unique = new Set(mols);
	return unique;
}

function func2(strs) {
	var lens = [];
	strs.map( str => {
		lens.push([str[2],str[0]]);
	});
	lens.sort( (a, b) => (b[0].length-b[1].length) - (a[0].length-a[1].length));
	
	var tfrs = new Map();
	lens.map( len => {
		tfrs.set(len[0],len[1]);
	});
	
	var steps = 0;
	var mols = new Map();
	mols.set(mol, steps);
	
	while (!mols.has('e')) {
		steps++;
		
		var nextMols = new Map();
		var nextMinL = Infinity;
		mols.forEach( (stps, curMol) => {
			var newMols = stepMol(tfrs, curMol);
			var nextMol = newMols.entries().next();
			nextMols.set(nextMol.value[0], stps+1);
		});
		
		mols = nextMols;
		console.log(steps);
	}
	
	return mols.get('e');
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

/*
var input = `e => H
e => O
H => HO
H => OH
O => HH`;
var mol = "HOH";
*/

var input = `Al => ThF
Al => ThRnFAr
B => BCa
B => TiB
B => TiRnFAr
Ca => CaCa
Ca => PB
Ca => PRnFAr
Ca => SiRnFYFAr
Ca => SiRnMgAr
Ca => SiTh
F => CaF
F => PMg
F => SiAl
H => CRnAlAr
H => CRnFYFYFAr
H => CRnFYMgAr
H => CRnMgYFAr
H => HCa
H => NRnFYFAr
H => NRnMgAr
H => NTh
H => OB
H => ORnFAr
Mg => BF
Mg => TiMg
N => CRnFAr
N => HSi
O => CRnFYFAr
O => CRnMgAr
O => HP
O => NRnFAr
O => OTi
P => CaP
P => PTi
P => SiRnFAr
Si => CaSi
Th => ThCa
Ti => BP
Ti => TiTi
e => HF
e => NAl
e => OMg`;
var mol = "CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF"

window.onload = function() {
	var lines = input.split("\n").map( (line) => line.split(" "));
	/*
	var val1 = func1(lines);
	showDoneMessage("input1", "Part 1: ", val1);
	*/
	var val2 = func2(lines);
	showDoneMessage("input2", "Part 2: ", val2);
}