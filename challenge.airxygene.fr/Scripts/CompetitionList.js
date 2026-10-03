//
//	CompetitionList.js
//
//	by Stef
//


//
//	A CompetitionList gathers all the possible way of picking up jumps for a discipline.
//
function competitionList()
{
//	Properties
	this.competitions		= new Array() ;	//	indexed by discipline names
	this.competitionNames	= new Array() ;	//	indexed by discipline names

//	Getter methods
	this.getCompetitionsOfDiscipline		= function(disciplineName)
	{
		return this.competitions[disciplineName] ;
	}

	this.getCompetitionNamesOfDiscipline	= function(disciplineName)
	{
		return this.competitionNames[disciplineName] ;
	}
	
	this.getCompetition	= function(disciplineName,competitionId)
	{
		return this.competitions[disciplineName][competitionId] ;
	}
	
//	Building methods
	this.addCompetitionToDiscipline		= function(disciplineName,competition)
	{
		if (typeof(this.competitions[disciplineName])=="undefined")
		{
			this.competitions[disciplineName]		= new Array() ;
			this.competitionNames[disciplineName]	= new Array() ;
		}
		this.competitions[disciplineName].push(competition) ;
		this.competitionNames[disciplineName].push(competition.getName()) ;
	}
}
