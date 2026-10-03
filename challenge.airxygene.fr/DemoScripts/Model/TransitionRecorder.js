/**
 * @author Stef
 */

function TransitionRecorder(discipline)
{
	this.transitionCounters	= new Array() ;
	this.total				= 0 ;
	
	var imax = discipline.getNbrFigures() ;

	for (var i=0 ; i<imax ; i++)
	{
		var code = discipline.getCodeAtIndex(i) ;
		this.transitionCounters[code] = new FigureRecorder(discipline) ;
	}

	this.nbrTransitions = function()
	{
		return this.transitionCounters.length ;
	}
	
	this.nbrTotal = function()
	{
		return this.total ;
	}
	
	this.transitionCounterForTransition = function(from,to)
	{
		return this.transitionCounters[from].figureCounterForFigureCode(to) ;
	}
	
	this.incrementTransitionCounterForTransition = function(from,to)
	{
		this.transitionCounters[from].incrementFigureCounterForCode(to) ;
		this.total++ ;
	}
}

 
 
 