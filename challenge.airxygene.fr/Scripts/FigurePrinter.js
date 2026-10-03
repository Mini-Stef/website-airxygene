/**
 * @author Stef
 */



function buildFigureImagePath(discipline,figure,isMirrored,isColored)
{
	var string = "Images/" + discipline.getName() + "/" ;
	if (isColored)
	{
		string += "Colored/"
	}
	if (isMirrored)
	{
		string += "Mirror/" ;
	}
	string += figure.getFile() ;
	
	return string ;
}
 

function getFigureImg(discipline,figure,id,isMirrored,isColored,clicCallback)
{
	path		= buildFigureImagePath(discipline,figure,isMirrored,isColored) ;
	extension	= path.substring(path.lastIndexOf("."),path.length) ;
	
	switch (extension)
	{
	case ".gif":
		s = "<img class=\"program-image\" id=\"" + id + "\" src=\"" + path + "\" "
		if ((clicCallback)
		&&	(discipline.getMirrorIsOk()))
		{
			s += "onclick=\"" + clicCallback + "\" "
		}
		s += "/>" ;
		break ;
		
	case ".svg":
		s = "<object id=\"" + id + "\" width=\"150px\" height=\"150px\" data=\"" + path + "\" type=\"image/svg+xml\"></object>" ;
		break ;
	default:
		s = "error" ;
	}
	return s ;
}


function mirrorCallback(id)
{
	img = document.getElementById(id) ;
	src	= img.getAttribute("src") ;
	
	//	Get the file name, last directory and root
	lastSlashPos	= src.lastIndexOf("/") ;
	fileName		= src.substring(lastSlashPos+1,src.length) ;
	dirName			= src.substring(0,lastSlashPos) ;
	
	lastSlashPos	= dirName.lastIndexOf("/") ;
	fileDirectory	= dirName.substring(lastSlashPos+1,dirName.length) ;
	rooDirectory	= dirName.substring(0,lastSlashPos) ;
	
	if (fileDirectory=="Mirror")
	{
		//	The image is already mirrored
		src	= rooDirectory + "/" + fileName ;
	}
	else
	{
		//	The image is not mirrored
		src = rooDirectory + "/" + fileDirectory + "/Mirror/" + fileName ;
	}

	mirrorAnim = new animationMirrorImage(id,src,50) ;
	addAnimationToRun(id,mirrorAnim) ;
}
