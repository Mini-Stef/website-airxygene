/**
 * @author Stef
 */


function arrayStringFromFigureRecorder(figureRecorder)
{
	var str = "<table>" ;
	
	var nbrFigures	= figureRecorder.nbrFigures() ;
	var column		= 0 ;
	var nbrBoxes	= (Math.floor((nbrFigures-1)/10)+1)*10 ;
	
	for (var figureIndex=0 ; figureIndex<nbrBoxes ; figureIndex++)
	{
		if (column==0)
		{
			str += "<tr>" ;
		}
		
		str += "<td>" ;
		if (figureIndex<nbrFigures)
		{
			var code	= figureRecorder.discipline.getCodeAtIndex(figureIndex) ;
			var stat	= figureRecorder.figureCounterForFigureCode(code) ;
				stat	= Math.round((stat/figureRecorder.nbrTotal())*10000)/100 ;
			str += code + "<br />" + stat + "%" ;
		}
		str += "</td>" ;
		
		if (column==(10-1))
		{
			str += "</tr>" ;
		}
		
		column = (column+1)%10 ;
	}
	
	str += "</table>" ;
	
	return str ;
}
