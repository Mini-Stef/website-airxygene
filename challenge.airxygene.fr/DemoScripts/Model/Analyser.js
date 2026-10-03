/**
 * @author Stef
 */

 
function Analyser(discipline)
{
	this.figureRecorder		= new FigureRecorder(discipline) ;
	this.transitionRecorder	= new TransitionRecorder(discipline) ;
	
	this.analyseJump = function(jump)
	{
		var jmax = jump.getNbrFigures() ;
		for (var j=0 ; j<jmax ; j++)
		{
			//	Simple figure stat
			var figure	= jump.getFigureAtIndex(j) ;
			var code	= figure.getCode() ;
			this.figureRecorder.incrementFigureCounterForCode(code) ;
			
			//	transition stats
			var previousFigure ;
			if (j>0)
			{
				previousFigure	= jump.getFigureAtIndex(j-1) ;
			}
			else
			{
				previousFigure	= jump.getFigureAtIndex(jmax-1) ;
			}
			var previousCode	= previousFigure.getCode() ;
			this.transitionRecorder.incrementTransitionCounterForTransition(previousCode,code) ;
		}
	}
}
