//
//	CompetitionSet.js
//
//	by Stef
//


//
//	A CompetitionSet defines the picking rules for a jump of a competition. It is a specification for how to pick up the jump
//	of the program for the competition.
//	As such, there are many CompetitionSet classes that all provide the same interface to pick up a jump in competition pools
//	but the behaviour of the picking can be different from one class to another
//
//	Competition set is a virtual class



//
//	N1Type Competition set is a competition set that follows the following rules for picking up a jump :
//		* the pool is made up of free figures (code is letter) and block figures (code is number)
//		* any figure is picked up
//		* free figures count for 1 point, block figures count for 2 points
//		* when the sum of the points of the picked up figures reaches or goes over a limit, the jump is complete
//	Default is to have the point limit set to 5.
//
function CompetitionSetN1Type(discipline,maxPoints,poolCode)	//	Parameters are optional, default is 5,"A"
{
	this.discipline	= discipline ;
	//	Default values
	this.maxPoints	= maxPoints || 5 ;
	this.poolCode	= poolCode || "A" ;

	this.getDiscipline = function()
	{
		return this.discipline ;
	}
	
	this.pickUpJump = function(competition)
	{
		var	figArray	= new Array() ;
		var jumpString	= "" ;
		var points		= 0 ;
		
		do
		{
			//	try to pick up a figure
			var fig = competition.pickUpFromPool(this.poolCode) ;
			if (fig==null)
			{
				//	The pool was empty, reset it
				competition.resetPool(this.poolCode) ;
				
				//	Remove any figure that would already be in the jump (reg 4.3.3)
				for (f=0 ; f<figArray.length ; f++)
				{
					competition.removeFromPool(this.poolCode,figArray[f]) ;
				}
			}
			else
			{
				//	A figure has been chosen
				figArray.push(fig) ;
				
				if (points>0)
				{
					jumpString += "-" ;
				}
				jumpString	+= fig ;
				points		+= code2points(fig) ;
			}
		}
		while (points<this.maxPoints) ;
		
		return jumpString ;
	}
}

//
//	N1Type Indoor Competition just as the N1, but you can't pick up an M as a first jump figure
//
function CompetitionSetN1IndoorType(discipline,maxPoints,poolCode)	//	Parameters are optional, default is 5,"A"
{
	this.discipline	= discipline ;
	//	Default values
	this.maxPoints	= maxPoints || 5 ;
	this.poolCode	= poolCode || "A" ;

	this.getDiscipline = function()
	{
		return this.discipline ;
	}
	
	this.pickUpJump = function(competition)
	{
		var	figArray	= new Array() ;
		var jumpString	= "" ;
		var points		= 0 ;
		
		do
		{
			//	try to pick up a figure
			var fig = competition.pickUpFromPool(this.poolCode) ;
			if (fig==null)
			{
				//	The pool was empty, reset it
				competition.resetPool(this.poolCode) ;
				
				//	Remove any figure that would already be in the jump (reg 4.3.3)
				for (f=0 ; f<figArray.length ; f++)
				{
					competition.removeFromPool(this.poolCode,figArray[f]) ;
				}
			}
			else
			{
				if ((points==0) && (fig=='M'))
				{
					//	Choose another figure and add it first
					fig2 = competition.pickUpFromPool(this.poolCode) ;
					figArray.push(fig2) ;
					jumpString	+= fig2 ;
					points		+= code2points(fig2) ;
				}
				
				//	A figure has been chosen
				figArray.push(fig) ;
				
				if (points>0)
				{
					jumpString += "-" ;
				}
				jumpString	+= fig ;
				points		+= code2points(fig) ;
			}
		}
		while (points<this.maxPoints) ;
		
		return jumpString ;
	}
}

//
//	N2Type Competition set is a competition set that follows the following rules for picking up a jump :
//		* there are 2 pools, one is made of free figures (L), one is made of block figures (B)
//		* each jump is defined by an order of the pools to pick up in. For example  L-B-L jump picks up a free figure, then a block, then a free figure
//
function CompetitionSetN2Type(discipline,poolCodesArray)
{
	this.discipline	= discipline ;
	this.poolCodesArray	= poolCodesArray ;

	this.getDiscipline = function()
	{
		return this.discipline ;
	}
	
	this.pickUpJump = function(competition)
	{
		var	figArray	= new Array() ;
		var jumpString	= "" ;
		var points		= 0 ;
		var poolIndex	= 0 ;
		
		do
		{
			//	try to pick up a figure
			var fig = competition.pickUpFromPool(this.poolCodesArray[poolIndex]) ;
			if (fig==null)
			{
				//	The pool was empty, reset it
				competition.resetPool(this.poolCodesArray[poolIndex]) ;
				
				//	Remove any figure that would already be in the jump (reg 4.3.3)
				for (f=0 ; f<figArray.length ; f++)
				{
					competition.removeFromPool(this.poolCodesArray[poolIndex],figArray[f]) ;
				}
			}
			else
			{
				//	A figure has been chosen
				figArray.push(fig) ;
				
				if (points>0)
				{
					jumpString += "-" ;
				}
				jumpString	+= fig ;
				points		+= code2points(fig) ;
				poolIndex++ ;
			}
		}
		while (poolIndex<this.poolCodesArray.length) ;
		
		return jumpString ;
	}
}


//
//	VC2Type Competition set is a competition set that follows the following rules for picking up a jump :
//		* the pool is reset
//		* 5 figures are picked up
//
function CompetitionSetVC2Type(discipline,poolCode)
{
	this.discipline	= discipline ;
	this.poolCode	= poolCode || "A" ;
	
	this.getDiscipline = function()
	{
		return this.discipline ;
	}
	
	this.pickUpJump = function(competition)
	{
		//	The pool must be reset first (VC2 rules)
		competition.resetPool(this.poolCode) ;
		
		jumpString	= competition.pickUpFromPool(this.poolCode) ;
		
		for (i=0;i<4;i++)
		{
			newCode = competition.pickUpFromPool(this.poolCode) ;
			jumpString = jumpString + "-" + newCode ;
		}
		
		return jumpString ;
	}
}

//
//	Dememoniaque Competition set
//
function CompetitionSetDememoniaque(discipline,maxPoints,poolCode)
{
	this.discipline	= discipline ;
	//	Default values
	this.maxPoints	= maxPoints || 20 ;
	this.poolCode	= poolCode || "A" ;

	this.getDiscipline = function()
	{
		return this.discipline ;
	}
	
	this.pickUpJump = function(competition)
	{
		jumpString	= competition.pickUpFromPool(this.poolCode) ;
		points		= code2points(jumpString) ;
		
		while (points<this.maxPoints)
		{
			newCode = competition.pickUpFromPool(this.poolCode) ;
			if (newCode==null)
			{
				competition.resetPool(this.poolCode) ;
				newCode = competition.pickUpFromPool(this.poolCode) ;
			}
			points += code2points(newCode) ;
			jumpString = jumpString + "-" + newCode ;
		}
		
		return jumpString ;
	}
}



