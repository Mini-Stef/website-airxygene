


function parseURLVariables()
{
	var crd = new Array() ;

	//	Read the URL variables part
	var searchString = (document.location.search.split('?')[1] || "") ;
	
	if (searchString != "")
	{
		//	Separate variables
		var nvPairs = searchString.split("&") ;
	
		for (i = 0 ; i < nvPairs.length ; i++)
		{
			var nvPair = nvPairs[i].split("=") ;
		
			var newVar		= new Object() ;
			newVar.name		= nvPair[0] ;
			newVar.value	= nvPair[1] || "" ;
		
			crd.push(newVar) ;
			crd[newVar.name] = newVar.value ;
		}
	}
	
	return crd ;
}