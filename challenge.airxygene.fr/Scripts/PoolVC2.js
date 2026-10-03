//
//	PoolVC2.js
//
//	by Stef
//



//
//	A Pool for VC2 differs from other pools because when it is reset, 2 instances of each figure
//	must be added to the pool
//
function createPoolOfVC2(discipline,regexp)
{
	crd = new PoolOFDisciplineWithRegexp(discipline,regexp) ;
	crd.reset = function()
	{
		this.figureCodes = new Array() ;
		
		for (i=0,imax=this.discipline.getNbrFigures() ; i<imax ; i++)
		{
			code = this.discipline.getCodeAtIndex(i) ;
			if (code.match(this.regexp))
			{
				this.figureCodes.push(code) ;
				this.figureCodes.push(code) ;	//	second instance...
			}
		}
	}
	return crd ;
}




