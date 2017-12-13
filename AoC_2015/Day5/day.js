function showDoneMessage(id, message, variable) {
	var newP = document.createElement("p");
	var newMsg = document.createTextNode(message + variable);
	newP.appendChild(newMsg);
	document.getElementById(id).after(newP);
}

function day5_1(stringfiles) {
	var goodstrings = 0;
	var teststrings = 0;
	if (stringfiles && stringfiles[0])
	{
		var stringfile = stringfiles[0];
		var stringreader = new FileReader();
		
		stringreader.onload = (function(stringf) {
			return function(e) {
				var strings = e.target.result.split("\r\n");
				var vowels3 = /[aeiou]{1}.*[aeiou]{1}.*[aeiou]{1}/;
				var letter2 = /(.)\1+/;
				var badcombos = /(ab|cd|pq|xy)/;
				
				for (var i = 0; i < strings.length; i++)
				{
					if (vowels3.test(strings[i]))
					{
						if (letter2.test(strings[i]))
						{
							if (!badcombos.test(strings[i]))
							{
								goodstrings++;
							}
						}
					}
				}
				
				showDoneMessage("input5_1", "Good Strings: ", goodstrings);
			};
		})(stringfile);
		
		stringreader.readAsText(stringfile);
	}
}

function day5_2(stringfiles) {
	var goodstrings = 0;
	var teststrings = 0;
	if (stringfiles && stringfiles[0])
	{
		var stringfile = stringfiles[0];
		var stringreader = new FileReader();
		
		stringreader.onload = (function(stringf) {
			return function(e) {
				var strings = e.target.result.split("\r\n");
				var twoletter2 = /(.{2}).*\1+/;
				var letterbetween = /(.).\1/;
				
				for (var i = 0; i < strings.length; i++)
				{
					if (twoletter2.test(strings[i]))
					{
						if (letterbetween.test(strings[i]))
						{
							goodstrings++;
						}
					}
				}
				
				showDoneMessage("input5_2", "Good (New) Strings: ", goodstrings);
			};
		})(stringfile);
		
		stringreader.readAsText(stringfile);
	}
}

window.onload = function() {
}