	//See how many problems you can do in a certain amount of time
	//See how long it takes you to do a certain amount of problems
	
	//classwork mode (loads in an array of settings and randomly gen's problems)
	//custom classwork mode (loads in an array of set of already created problems)
	//coursework mode (loads in an array of classwork or custom classwork modes problems for the entire course)

function Menu()
{
	this.reset=function()
	{
		grade.reset();
		settings.answeredProblemTypes = false;
		document.getElementById('practiceQuestions').style.display='block';
		document.getElementById('centered-box').style.display='none';
		document.getElementById('back-button').style.display='none';
		return false;
	}
}

function Settings()
{
	this.minNumber=0;
	this.maxNumber=12;
	
	this.practiceMode = true;
	this.answeredProblemTypes = false;
	
	this.additionEnabled=true;
	this.subtractionEnabled=true;
	this.multiplicationEnabled=true;
	this.divisionEnabled=true;
	
	this.getMaxNumber=function()
	{
		return this.maxNumber;
	}
	this.setMaxNumber=function(newMaxNumber)
	{
		this.maxNumber=newMaxNumber;
	}
	this.getMinNumber=function()
	{
		return this.minNumber;
	}
	this.setMinNumber=function(newMinNumber)
	{
		this.minNumber=newMinNumber;
	}
	this.resetProblemTypes=function()
	{
		this.additionEnabled=true;
		this.subtractionEnabled=true;
		this.multiplicationEnabled=true;
		this.divisionEnabled=true;
	}
	this.setProblemTypes=function(form)
	{
		if((form.addition.checked || form.subtraction.checked || form.multiplication.checked || form.division.checked) && (form.maxNumber.value.length>0 && !isNaN(form.maxNumber.value) && form.maxNumber.value>0))
		{
			this.additionEnabled=form.addition.checked;
			this.subtractionEnabled=form.subtraction.checked;
			this.multiplicationEnabled=form.multiplication.checked;
			this.divisionEnabled=form.division.checked;
			this.setMaxNumber(form.maxNumber.value);
			this.answeredProblemTypes=true;
			document.getElementById('practiceQuestions').style.display='none';
			document.getElementById('centered-box').style.display='block';
			document.getElementById('back-button').style.display='block';
			document.getElementById('output').innerHTML='';
			problem.newProblem();
		} else {
			alert("You must select at least one problem type, and enter an equation number larger than 0!");
		}
		return false;
	}
}

function Grades()
{
	this.attempts=0;
	this.correct=0;
	this.precent=0;
	this.addAttempt=function()
	{
		this.attempts++;
	}
	this.getAttempts=function()
	{
		return this.attempts;
	}
	this.addCorrect=function()
	{
		this.correct++;
	}
	this.getCorrect=function()
	{
		return this.correct;
	}
	this.getPrecent=function()
	{
		return Math.round(((this.correct / this.attempts)*100)*10)/10; //rounds to nearest tenth decimal
	}
	this.getLetterGrade=function()
	{
		if(this.getPrecent()>=90)
			return 'A';
		else if (this.getPrecent()>=80)
			return 'B';
		else if (this.getPrecent()>=70)
			return 'C';
		else if (this.getPrecent()>=60)
			return 'D';
		else
			return 'F';
	}
	this.reset=function()
	{
		this.attempts = 0;
		this.correct = 0;
		this.precent = 0;
	}
}

function AdditionProblem()
{
	this.firstNumber;
	this.secondNumber;
	this.newProblem=function(_firstNumber, _secondNumber)
	{
		this.firstNumber = _firstNumber;
		this.secondNumber = _secondNumber;
		document.getElementById('numbers').innerHTML="<div id='firstNumber'>"+this.firstNumber+"</div><div id='secondNumber'>+ "+this.secondNumber+"</div>";
	}
	this.checkAnswer=function(userAnswer)
	{
		if(userAnswer == (this.firstNumber + this.secondNumber))
			return true;
		else
			return false;
	}
	this.getAnswer=function()
	{
		return this.firstNumber + this.secondNumber;
	}
}

function SubtractionProblem()
{
	//negative answers allowed?
	this.firstNumber;
	this.secondNumber;
	this.newProblem=function(_firstNumber, _secondNumber)
	{
		this.firstNumber = _firstNumber;
		this.secondNumber = _secondNumber;
		document.getElementById('numbers').innerHTML="<div id='firstNumber'>"+this.firstNumber+"</div><div id='secondNumber'>- "+this.secondNumber+"</div>";
	}
	this.checkAnswer=function(userAnswer)
	{
		if(userAnswer == (this.firstNumber - this.secondNumber))
			return true;
		else
			return false;
	}
	this.getAnswer=function()
	{
		return this.firstNumber - this.secondNumber;
	}
}

function MultiplicationProblem()
{
	//allow negative numbers in equation?
	//max number size?
	this.firstNumber;
	this.secondNumber;
	this.newProblem=function(_firstNumber, _secondNumber)
	{
		this.firstNumber = _firstNumber;
		this.secondNumber = _secondNumber;
		document.getElementById('numbers').innerHTML="<div id='firstNumber'>"+this.firstNumber+"</div><div id='secondNumber'>&times; "+this.secondNumber+"</div>";
	}
	this.checkAnswer=function(userAnswer)
	{
		if(userAnswer == (this.firstNumber * this.secondNumber))
			return true;
		else
			return false;
	}
	this.getAnswer=function()
	{
		return this.firstNumber * this.secondNumber;
	}
}

function DivisionProblem()
{
	//regen second number if 0
	this.firstNumber;
	this.secondNumber;
	this.newProblem=function(_firstNumber, _secondNumber)
	{
		this.secondNumber = _secondNumber;
		if(this.secondNumber == 0)
			this.secondNumber++;
		this.firstNumber = _firstNumber*this.secondNumber;
		document.getElementById('numbers').innerHTML="<div id='firstNumber'>"+this.firstNumber+"</div><div id='secondNumber'>&divide; "+this.secondNumber+"</div>";
	}
	this.checkAnswer=function(userAnswer)
	{
		if(userAnswer == (this.firstNumber / this.secondNumber))
			return true;
		else
			return false;
	}
	this.getAnswer=function()
	{
		return this.firstNumber / this.secondNumber;
	}
}

add = new AdditionProblem();
subtract = new SubtractionProblem();
multiply = new MultiplicationProblem();
divide = new DivisionProblem();

function Problem()
{
	problemType = 0; //would be good to be replaced by a enum in the future
	this.getProblemType=function()
	{
		return problemType;
	}
	this.generateNumber=function(min, max)
	{
		return Math.floor((Math.random() * ((max - min) + 1)) + min);
	}
	this.newProblem=function()
	{
		problemTypeInvalid = true;
		while(problemTypeInvalid)
		{
			//total problems divided by problems enabled
			problemType = this.generateNumber(1,4);
			if(settings.additionEnabled && problemType == 1) { //The random problem picker can be made much more efficient
				//add
				add.newProblem(this.generateNumber(settings.minNumber, settings.maxNumber), this.generateNumber(settings.minNumber, settings.maxNumber));
				problemType = 1;
				problemTypeInvalid = false;
			} else if(settings.subtractionEnabled && problemType == 2) {
				//subtract
				subtract.newProblem(this.generateNumber(settings.minNumber, settings.maxNumber), this.generateNumber(settings.minNumber, settings.maxNumber));
				problemType = 2;
				problemTypeInvalid = false;
			} else if(settings.multiplicationEnabled && problemType == 3) {
				//multiply
				multiply.newProblem(this.generateNumber(settings.minNumber, settings.maxNumber), this.generateNumber(settings.minNumber, settings.maxNumber));
				problemType = 3;
				problemTypeInvalid = false;
			} else if(settings.divisionEnabled && problemType == 4) {
				//divide
				divide.newProblem(this.generateNumber(settings.minNumber, settings.maxNumber), this.generateNumber(settings.minNumber, settings.maxNumber));
				problemType = 4;
				problemTypeInvalid = false;
			}
		}
	}
	this.checkAnswer=function(userAnswer)
	{
		if(problemType == 1)
			return add.checkAnswer(userAnswer);
		else if(problemType == 2)
			return subtract.checkAnswer(userAnswer);
		else if(problemType == 3)
			return multiply.checkAnswer(userAnswer);
		else if(problemType == 4)
			return divide.checkAnswer(userAnswer);
		else
			return false;
	}
}

function SubmitAnswer(form)
{
	if(form.userAnswer.value.length>0 && !isNaN(form.userAnswer.value))
	{
		grade.addAttempt();
		if(problem.checkAnswer(form.userAnswer.value))
		{
			//correct answer
			grade.addCorrect();
			document.getElementById('output').innerHTML='Correct!<br/> Score: '+grade.getCorrect()+"/"+grade.getAttempts()+" &nbsp;"+grade.getPrecent()+"% &nbsp;"+grade.getLetterGrade();
		} else {
			//wrong answer
			tempAnswer = 0;
			if(problem.getProblemType() == 1)
				tempAnswer = add.getAnswer();
			else if(problem.getProblemType() == 2)
				tempAnswer = subtract.getAnswer();
			else if(problem.getProblemType() == 3)
				tempAnswer = multiply.getAnswer();
			else if(problem.getProblemType() == 4)
				tempAnswer = divide.getAnswer();
			document.getElementById('output').innerHTML='Sorry the answer was '+tempAnswer+'<br/> Score: '+grade.getCorrect()+"/"+grade.getAttempts()+" &nbsp;"+grade.getPrecent()+"% &nbsp;"+grade.getLetterGrade();
		}
		form.userAnswer.value="";
		problem.newProblem();
	}
	return false;
}