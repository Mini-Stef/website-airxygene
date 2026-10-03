
function populateSelectElementWithOptionNames(selectId,nameArray,valueArray)
{
	sel = document.getElementById(selectId) ;
	//	remove all options from the selection
	while (sel.length>0)
	{
		sel.remove(0) ;
	}
					
	for (d in nameArray)
	{
		var option		= document.createElement('option') ;

		if (valueArray!=null)
		{
			option.value	= valueArray[d] ;	
		}
		else
		{
			option.value	= d ;
		}

		try
		{
			// standards compliant
			sel.add(option,null) ;
		}
		catch(e)
		{
			// IE only
			sel.add(option) ;
		}

		option.innerHTML		= nameArray[d] ;
	}
}
