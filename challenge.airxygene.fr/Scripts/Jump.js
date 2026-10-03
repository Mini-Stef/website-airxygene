//
//	Jump.js
//
//	by Stef
//


// 
//	A jump is a list of figures of a discipline
//	It is built from a jump string of the form "A-12-H"
//	
//	This class provides methods to define a jump string, and add or remove figures from the figure list
//	the figure list and the jump string are kept in sync
//
//	This class also provides iterator methods on the jump list
//	The jump list shall NOT be modified when it is iterated
//
function jumpOfThisDiscipline(discipline)
{
//	Properties
	this.discipline		= discipline ;
	this.figureList 	= new Array() ;
	this.jumpString		= "" ;
	this.iterator		= 0 ;
	this.points			= 0 ;


//	Getter methods
	this.getDiscipline = function()
	{
		return this.discipline ;
	}
	
	this.getNbrFigures = function ()
	{
		return this.figureList.length ;
	}
	
	this.getFigureAtIndex = function(index)	//	index starts at 0
	{
		return this.figureList[index] ;
	}
	
	this.getPoints	= function()
	{
		return this.points ;
	}
	
	this.getString	= function()
	{
		return this.jumpString ;
	}

//	Methods to build the jump list
	this.setString = function(string)
	{
		//	Robust to lower/upper case
		this.jumpString		= string.toUpperCase() ;
		
		//	Extract the figure codes from the given string
		//	This regular expression allows to extract a figure code from a string
		codes				= this.jumpString.match(/([A-Z])|([1-9][0-9]*)/g) ;
		
		//	Read the figures from the discipline and add them to a new jump list
		this.figureList		= new Array() ;
		for (codeIndex in codes)
		{
			fig = this.discipline.getFigureFromCode(codes[codeIndex]) ;
			this.figureList.push(fig) ;
		}
		
		this.computeJumpPoints() ;
	}
	
	this.removeFigureAtIndex = function(index)		//	index starts at 0
	{
		//	The jump string must be kept in synch, there fore rebuild the string
		//	and from the string, rebuild a new jump
		codes	= this.jumpString.match(jumpParsingRegexp) ;
		newJumpString = "" ;
			
		for (codeIndex=0 ; codeIndex<codes.length ; codeIndex++)
		{
			if (codeIndex!=index)
			{
				newJumpString = newJumpString + codes[codeIndex] + "-" ;
			}
		}
		
		this.setString(newJumpString) ;
	}
	
	this.insertFigureAtIndex = function(figure,index)	//	index starts at 0
	{
		//	The jump string must be kept in synch, there fore rebuild the string
		//	and from the string, rebuild a new jump
		codes	= this.jumpString.match(jumpParsingRegexp) ;
		newJumpString = "" ;
		
		for (codeIndex=0 ; codeIndex<codes.length ; codeIndex++)
		{
			if (codeIndex==index)
			{
				newJumpString = newJumpString + figure.getCode() + "-" ;
			}
			newJumpString = newJumpString + codes[codeIndex] + "-" ;
		}
		
		this.setString(newJumpString) ;
	}
	
	this.computeJumpPoints	= function()
	{
		this.points	= 0 ;
		for (i in this.figureList)
		{
			this.points += this.figureList[i].getPoints() ;
		}
	}


//	Iterator methods
	this.getFirstFigure		= function()
	{
		this.iterator = 0 ;
		return this.figureList[this.iterator] ;
	}
	
	this.getNextFigure		= function()
	{
		this.iterator++ ;
		if (this.iterator<this.figureList.length)
		{
			return this.figureList[this.iterator] ;
		}
		else
		{
			return null ;
		}
	}
}
