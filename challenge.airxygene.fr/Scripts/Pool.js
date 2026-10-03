//
//	Pool.js
//
//	by Stef
//



	//	These regular expressions allow to define some basic pools
	var poolAllFiguresRegexp		= /.*/ ;
	var	poolFreeFiguresRegexp		= /[A-Z]/ ;
	var poolBlockFiguresRegexp		= /[1-9][0-9]*/ ;

 

//
//	A Pool is a list of codes of figures of a discipline, a kind of subset of the discipline figures
//	It is supposed to be dynamic. It is built once, and then codes can be picked up and removed from the pool.
//	When there are no more figures in the pool (or before), the pool can be reset to its original list.
//	The original list that defines the subset of figures is specified by a regular expression. If a discipline figure
//	code matches the regexp, then the figure is added to the pool.
//
function PoolOFDisciplineWithRegexp(discipline,regexp)
{
	this.discipline		= discipline ;
	this.figureCodes	= new Array() ;
	this.regexp			= regexp ;

//	Getter methods
	this.getDiscipline		= function()
	{
		return this.discipline ;
	}
	
	this.getNbrFigureCodes	= function()
	{
		return this.figureCodes.length ;
	}
	
	this.getCodeAtIndex		= function(index)
	{
		return this.figureCodes[index] ;
	}

//	Builder methods
	this.reset = function()
	{
		this.figureCodes = new Array() ;

		for (i=0,imax=this.discipline.getNbrFigures() ; i<imax ; i++)
		{
			code = this.discipline.getCodeAtIndex(i) ;
			if (code.match(this.regexp))
			{
				this.figureCodes.push(code) ;
			}
		}
	}
	
	this.removeCodeAtIndex = function(index)	//	index starts at 0
	{
		newFigureCodes = new Array() ;
			
		for (codeIndex=0 ; codeIndex<this.figureCodes.length ; codeIndex++)
		{
			if (codeIndex!=index)
			{
				newFigureCodes.push(this.figureCodes[codeIndex]) ;
			}
		}
		this.figureCodes = newFigureCodes ;
	}

	this.findIndexOfCode = function(figCode)
	{
		var crd = -1 ;
		
		for (i=0 ; i<this.figureCodes.length ; i++)
		{
			if (this.figureCodes[i]==figCode)
			{
				crd = i ;
			}
		}
		return crd ;
	}
	
	this.removeFigureCode = function(figCode)
	{
		var index = this.findIndexOfCode(figCode) ;
		if (index!=-1)
		{
			this.removeCodeAtIndex(index) ;
		}
	}

//	Pick up methods
	this.canPickUp = function()
	{
		return (this.figureCodes.length>0) ;
	}
	
	this.pickUpAndRemoveCode = function()
	{
		randomIndex = Math.floor(Math.random()*this.figureCodes.length) ;
		code = this.figureCodes[randomIndex] ;
		this.removeCodeAtIndex(randomIndex) ;
		
		return code ;
	}
}

function createPoolOFDisciplineWithRegexp(discipline,regexp)
{
	return new PoolOFDisciplineWithRegexp(discipline,regexp) ;
}


