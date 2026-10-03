//
//
//	A library to manage cookies
//
//	by Stef
//
//	inspired by w3schools
//
//


//
//	This function sets a cookie with an optional expiration date in days
//
function SetCookie(cookieName,cokieValue,cookieExpireDays)
{
	var exdate		= new Date() ;
	exdate.setDate(exdate.getDate() + cookieExpireDays) ;
	expireString	= (cookieExpireDays==null) ? "" : ";expires=" + exdate.toGMTString() ;

	document.cookie = cookieName + "=" + escape(cokieValue) + expireString ;
}


//
//	This function returns a cookie if it exists, or null
//
function GetCookie(cookieName)
{
	crd = null ;

	if (document.cookie.length>0)
	{
		c_start = document.cookie.indexOf(cookieName + "=") ;
 
 		if (c_start!=-1)
		{ 
			c_start	= c_start + cookieName.length + 1 ; 
			c_end	= document.cookie.indexOf(";",c_start) ;
			if (c_end==-1)
			{
				c_end = document.cookie.length ;
			}
    		crd = unescape(document.cookie.substring(c_start,c_end)) ;
		} 
	}

	return crd ;
}


//
//	This function returns a cookie typed as a boolean, or null if the cookie does not exist
//
function GetBooleanCookie(cookieName)
{
	value = GetCookie(cookieName) ;
	crd = null ;
	
	switch (value)
	{
	case "true":
	case "TRUE":
	case "True":
		crd = true ;
		break ;
	
	case "false":
	case "FALSE":
	case "False":
		crd = false ;
		break ;
	}
	return crd ;
}


