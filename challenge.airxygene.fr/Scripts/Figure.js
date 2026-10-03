//
//	Figure.js
//
//	by Stef
//


//
//	A Figure is the atomic element of a jump. It defines the position and grips that skydivers have to achieve.
//	A Figure is defined by a code that must be unique in a discipline, and a name.
//	TBD : file for the picture or list files ? must be somhow linked to themes...
//
function figure(code,name,file)
{
//	Properties
	this.code	= code ;
	this.name	= name ;
	this.file	= file ;
	this.points = code2points(code) ;
	
//	Getter methods
	this.getCode	= function()
	{
		return this.code ;
	}
	
	this.getName	= function()
	{
		return this.name ;
	}
	
	this.getPoints	= function()
	{
		return this.points ;
	}
	
	//	TBD theme
	this.getFile	= function()
	{
		return this.file ;
	}
}

function code2points(code)
{
	if (code.match(/[A-Z]/))
	{
		//	Letter, this is a single figure
		return 1 ;
	}
	else
	{
		//	Must be a number => block
		return 2 ;
	}
}
