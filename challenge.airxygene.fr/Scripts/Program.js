//
//	Program.js
//
//	by Stef
//

 
//
//	A Program represent the jumps that will be part of a competition event. The jumps that will be flown.
//	A Program is a list of jumps, possibly of different disciplines
//
//	The class provides an interface to build the program via strings or figure by figure
//	It also provides an interface to iterate through jumps. Then us the jump iteration to access figures
//
function program()
{
//	Properties
 	this.jumpList	= new Array() ;
	this.iterator	= 0 ;
	
//	Getter methods
	this.getNbrJumps	= function()
	{
		return this.jumpList.length ;
	}
	
	this.getJumpAtIndex	= function(index)	//	index starts at 0
	{
		return this.jumpList[index] ;
	}

//	Build methods
	this.appendJumpsFromString	= function(discipline,string)
	{
		//	This regexp allows to isolate jump strings
		jumps				= string.match(/[^;]+;*/g) ;
		
		for (jumpIndex in jumps)
		{
			jump = new jumpOfThisDiscipline(discipline) ;
			jump.setString(jumps[jumpIndex]) ;
			
			this.jumpList.push(jump) ;
		}
	}
	
	this.insertJumpAtIndex	= function(jump,index)	//	index starts at 0
	{
		newList	= new Array() ;
		
		for (jumpIndex=0 ; jumpIndex<this.jumpList ; jumpIndex++)
		{
			if (jumpIndex==index)
			{
				newList.push(jump) ;
			}
			
			newList.push(this.jumpList[index]) ;
		}
		
		this.jumpList = newList ;
	}

	this.appendJump	= function(jump)
	{
		this.jumpList.push(jump) ;
	}
 
//	Jump iteration methods
	this.getFirstJump = function()
	{
		this.iterator = 0 ;
		return this.jumpList[this.iterator] ;
	}
	
	this.getNextJump = function()
	{
		this.iterator++ ;
		if (this.iterator<this.jumpList.length)
		{
			return this.jumpList[this.iterator] ;
		}
		else
		{
			return null ;
		}
	}
}
 
 
 
