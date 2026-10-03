//
//	Competition.js
//
//	by Stef
//


//
//	A competition is the definition of an event, a specification of the jumps to pick up.
//	A competition is defined by pools that will be drawn, and sets that know in which pool to draw, and in which order
//
function competition(name,createPoolFct)
{
//	Properties
	this.name			= name ;
	this.pools			= new Array() ;	//	indexed by pool code
	this.poolCodes		= new Array() ;
	this.sets			= new Array() ;
	this.createPoolFct	= createPoolFct || createPoolOFDisciplineWithRegexp ;

//	Getter methods
	this.getName	= function()
	{
		return this.name ;
	}

//	Build methods
//		Build for pools
	this.createAndAddPool = function(poolCode,discipline,poolRegexp)
	{
		//	Add and initialise the pool
		this.pools[poolCode]	= this.createPoolFct(discipline,poolRegexp) ;
		this.pools[poolCode].reset() ;
		
		this.poolCodes.push(poolCode) ;
	}

//		Build for sets
	this.appendSet = function(competitionSet)
	{
		this.sets.push(competitionSet) ;
	}
	
	this.addSetAtIndex = function(index,competitionSet)	//	index starts at 0
	{
		imax = this.sets.length ;
		if (index>=imax)
		{
			this.setSpecs.push(competitionSet) ;
		}
		else
		{
			newSets = new Array() ;
		
			for (i=0 ; i<imax ; i++)
			{
				if (i==index)
				{
					newSets.push(competitionSet) ;
				}
				newSets.push(this.sets[i]) ;
			}
			
			this.sets = newSets ;
		}
	}
	
	this.removeSetAtIndex = function(index)	//	index starts at 0
	{
		imax = this.sets.length ;
		if (imax>0)
		{
			newSets = new Array() ;
		
			for (i=0 ; i<imax ; i++)
			{
				if (i!=index)
				{
					newSets.push(this.sets[i]) ;
				}
			}
			
			this.sets = newSets ;
		}
	}

//	Program picking up method
	this.pickUpProgram = function(nbrSets)
	{
		//	Reset all pools at the begining of the pickup
		for (poolCode in this.poolCodes)
		{
			this.pools[this.poolCodes[poolCode]].reset() ;
		}
		
		theProgram = new program() ;
		
		for (var i=0 ; i<nbrSets ; i++)
		{
			j = i % this.sets.length ;
			
			jumpString = this.sets[j].pickUpJump(this) ;
			theProgram.appendJumpsFromString(this.sets[j].getDiscipline(),jumpString) ;
		}
		
		return theProgram ;
	}
	
	this.pickUpFromPool = function(poolCode)
	{
		thePool = this.pools[poolCode] ;
		
		if (thePool.canPickUp())
		{
			return thePool.pickUpAndRemoveCode() ;
		}
		else
		{
			//	the pool is empty
			return null ;
		}
		
	}
	
	this.resetPool = function(poolCode)
	{
		thePool = this.pools[poolCode] ;
		thePool.reset() ;
	}
	
	this.removeFromPool = function(poolCode,figureCode)
	{
		thePool = this.pools[poolCode] ;
		thePool.removeFigureCode(figureCode) ;
	}
}
