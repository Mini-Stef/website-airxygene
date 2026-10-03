//
//	Discipline.js
//
//	by Stef
//


//
//	A Discipline is a set of figures, that can be fetched by code
//
function discipline(name)
{
//	Properties
 	this.name			= name ;
	this.figuresByCode	= new Array() ;	//	indexed by figures code
	this.codes			= new Array() ; //	to list the code, and also to know the number of figures as this.figuresByCode.length is wrong
	this.mirrorIsOk		= true ;
	
//	Getter methods
	this.getName = function()
	{
		return this.name ;
	}
	
	this.getNbrFigures = function()
	{
		return this.codes.length ;
	}
	
	this.getCodeAtIndex = function(index)	//	index starts at 0
	{
		return this.codes[index] ;
	}

	this.getFigureFromCode = function(code)
	{
		return this.figuresByCode[code] ;
	}
	
	this.getMirrorIsOk = function()
	{
		return this.mirrorIsOk ;
	}
	
	this.setMirrorIsOk = function (mio)
	{
		this.mirrorIsOk = mio ;
	}
	
//	Methods to build the discipline
//	TBD file is linked to themes
	this.addNewFigure = function(code,name,file)
	{
		fig = new figure(code,name,file) ;
		this.figuresByCode[code] = fig ;
		this.codes.push(code) ;
	}
}

