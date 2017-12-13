function showDoneMessage(id, message, variable) {
	var newP = document.createElement("p");
	var newMsg = document.createTextNode(message + variable);
	newP.appendChild(newMsg);
	document.getElementById(id).after(newP);
}

function parseInstruction(objs, assignment) {
	var sig = /\d+/;
	var ops = /[A-Z]+/;
	var instObj = {
		'inputs': [],
		'gate': "",
		'output': null
	};
	var wire = assignment[assignment.length - 1]
	
	for (var i = 0; i < assignment.length - 2; i++)
	{
		if (ops.test(assignment[i]))
		{
			instObj.gate = assignment[i];
		}
		else if (sig.test(assignment[i]))
		{
			instObj.inputs.push(assignment[i])
			objs[assignment[i]] = {'output': parseInt(assignment[i], 10)};
		}
		else
		{
			instObj.inputs.push(assignment[i]);
		}
	}
	
	objs[wire] = instObj;
}

function inputsReady(objs, obj) {
	for (var i = 0; i < obj.inputs.length; i++)
	{
		if (objs[obj.inputs[i]].output == null)
		{
			return false;
		}
	}
	
	return true;
}

function evalInstruction(objs, instr) {
	if (instr.gate !== "")
	{
		switch (instr.gate)
		{
			case "AND":
				if (instr.inputs.length == 2)
				{
					instr.output = 0xFFFF & (objs[instr.inputs[0]].output & objs[instr.inputs[1]].output);
				}
				else
				{
					console.log("Wrong Ops!");
				}
				break;
			case "OR":
				if (instr.inputs.length == 2)
				{
					instr.output = 0xFFFF & (objs[instr.inputs[0]].output | objs[instr.inputs[1]].output);
				}
				else
				{
					console.log("Wrong Ops!");
				}
				break;
			case "NOT":
				if (instr.inputs.length == 1)
				{
					instr.output = 0xFFFF & (~objs[instr.inputs[0]].output);
				}
				else
				{
					console.log("Wrong Ops!");
				}
				break;
			case "LSHIFT":
				if (instr.inputs.length == 2)
				{
					instr.output = 0xFFFF & (objs[instr.inputs[0]].output << objs[instr.inputs[1]].output);
				}
				else
				{
					console.log("Wrong Ops!");
				}
				break;
			case "RSHIFT":
				if (instr.inputs.length == 2)
				{
					instr.output = 0xFFFF & (objs[instr.inputs[0]].output >> objs[instr.inputs[1]].output);
				}
				else
				{
					console.log("Wrong Ops!");
				}
				break;
			default:
				console.log("Unknown Ops!");
				break;
		}
	}
	else
	{
		instr.output = objs[instr.inputs[0]].output;
	}
}

function evalInstructions(objs)
{
	for (var wire in objs)
	{
		if (objs[wire].output == null && inputsReady(objs, objs[wire]))
		{
			evalInstruction(objs, objs[wire]);
		}
	}
}

function day1(files) {	
	if (files && files[0])
	{
		var file = files[0];
		var reader = new FileReader();
		
		reader.onload = (function(f) {
			return function(e) {
				var instructions = e.target.result.split("\r\n");
				var wires = {};
				
				for (var i = 0; i < instructions.length; i++)
				{
					var instruction = instructions[i].split(" ");
					parseInstruction(wires, instruction);
				}
				
				while(wires["a"].output == null)
				{
					evalInstructions(wires);
				}
				
				showDoneMessage("input1", "Wire A: ", wires["a"].output);
			};
		})(file);
		
		reader.readAsText(file);
	}
}

function day2(files) {
	if (files && files[0])
	{
		var file = files[0];
		var reader = new FileReader();
		
		reader.onload = (function(f) {
			return function(e) {
				var instructions = e.target.result.split("\r\n");
				var wires = {};
				
				for (var i = 0; i < instructions.length; i++)
				{
					var instruction = instructions[i].split(" ");
					parseInstruction(wires, instruction);
				}
				
				while(wires["a"].output == null)
				{
					evalInstructions(wires);
				}
				
				showDoneMessage("input2", "(New) Wire A: ", wires["a"].output);
			};
		})(file);
		
		reader.readAsText(file);
	}
}

window.onload = function() {
}