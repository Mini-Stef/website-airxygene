/**
 * @author Stef
 */

 
function FigureRecorder(discipline)
{
	this.discipline		= discipline ;
	this.figureCounters	= new Array() ;
	this.total			= 0 ;
	
	var imax = discipline.getNbrFigures() ;
	
	for (var i=0 ; i<imax ; i++)
	{
		var code = discipline.getCodeAtIndex(i) ;
		this.figureCounters[code] = 0 ;
	}
	
	this.nbrFigures = function()
	{
		return this.discipline.getNbrFigures() ;
	}
	
	this.nbrTotal = function()
	{
		return this.total ;
	}
	
	this.figureCounterForFigureCode = function(code)
	{
		return this.figureCounters[code] ;
	}
	
	this.incrementFigureCounterForCode = function(code)
	{
		this.figureCounters[code]++ ;
		this.total++ ;
	}
}
