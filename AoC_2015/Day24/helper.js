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

var permute = function(a) {
	var fn = function(a) {
		var i, ch;
		for (i = 0; i < a.length; i++) {
			ch = a.splice(i, 1)[0];
			usedChars.push(ch);
			if (a.length == 0) {
				permArr.push(usedChars.slice());
			}
			fn(a);
			a.splice(i, 0, ch);
			usedChars.pop();
		}
	}
	var permArr = [],
		usedChars = [];
	fn(a);
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

var combineStr = function(s, min, max) {
	return combine(s, min, max).map( c => c.join('') );
}