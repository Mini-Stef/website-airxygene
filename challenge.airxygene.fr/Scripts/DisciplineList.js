//
//	DisciplineList.js
//
//	by Stef
//


//
//	A DisciplineList gathers all the disciplines handled by the program and allows to retrieve them from their name
//
function disciplineList()
{
//	Properties
	this.disciplines			= new Array() ;	//	indexed by disciplines name

//	Getter methods
	this.getListOfDisciplineNames		= function()
	{
		names = new Array() ;
		
		for (n in this.disciplines)
		{
			names.push(n) ;
		}
		return names ;
	}
	
	this.getDisciplineWithName = function(name)
	{
		return this.disciplines[name] ;
	}

//	Building methods
	this.addDiscipline = function(discipline)
	{
		this.disciplines[discipline.getName()]	= discipline ;
	}
}






