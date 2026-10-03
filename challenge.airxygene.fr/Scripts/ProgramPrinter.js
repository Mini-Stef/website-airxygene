/*
 * untitled.js
 * Empty
 *
 * Created by Stef MILLET on 22/08/08.
 * Copyright 2008 AirXygène. All rights reserved.
 */



var thePrinterPreferences		= new PrinterPreferences() ;
var thePrinterShownProgram		= "" ;
var thePrinterShowDivId			= "" ;


function PrinterPreferences ()
{
	this.printPictures		= ((tmp=GetBooleanCookie("vr2.pref.printPictures"))==null)		? true	: tmp ;
	this.printSetName		= ((tmp=GetBooleanCookie("vr2.pref.printSetName"))==null)		? true	: tmp ;
	this.printProgram		= ((tmp=GetBooleanCookie("vr2.pref.printProgram"))==null)		? false	: tmp ;
	this.printJumpPoints	= ((tmp=GetBooleanCookie("vr2.pref.printJumpPoints"))==null)	? false	: tmp ;
	this.printExitFigure	= ((tmp=GetBooleanCookie("vr2.pref.printExitFigure"))==null)	? false	: tmp ;
	this.printColors		= ((tmp=GetBooleanCookie("vr2.pref.printColors"))==null)		? false	: tmp ;
	this.exitFigureCode		= ((tmp=GetCookie("vr2.pref.exitFigureCode"))==null)			? 'M'	: tmp ;
	this.nbrWide			= ((tmp=GetCookie("vr2.pref.nbrWide"))==null)					? 3		: tmp ;


	this.getPrintPictures	= function()
	{
		return this.printPictures ;
	}	
	
	this.getPrintSetName	= function()
	{
		return this.printSetName ;
	}	
	
	this.getPrintProgram	= function()
	{
		return this.printProgram ;
	}	
	
	this.getPrintJumpPoints	= function()
	{
		return this.printJumpPoints ;
	}	
	
	this.getPrintColors	= function()
	{
		return this.printColors ;
	}	
	
	this.getPrintExitFigure	= function()
	{
		return this.printExitFigure ;
	}	
	
	this.getExitFigureCode	= function()
	{
		return this.exitFigureCode ;
	}	
	
	this.getNbrWide			= function()
	{
		return this.nbrWide ;
	}
	
	this.setPrintPictures	= function(id)
	{
		checkBox = document.getElementById(id) ;
		this.printPictures	= checkBox.checked ;
		SetCookie("vr2.pref.printPictures",this.printPictures,365*2) ;
		reprintLastProgram() ;
	}
	
	this.setPrintSetName	= function(id)
	{
		checkBox = document.getElementById(id) ;
		this.printSetName	= checkBox.checked ;
		SetCookie("vr2.pref.printSetName",this.printSetName,365*2) ;
		reprintLastProgram() ;
	}
	
	this.setPrintProgram	= function(id)
	{
		checkBox = document.getElementById(id) ;
		this.printProgram	= checkBox.checked ;
		SetCookie("vr2.pref.printProgram",this.printProgram,365*2) ;
		reprintLastProgram() ;
	}
	
	this.setPrintJumpPoints	= function(id)
	{
		checkBox = document.getElementById(id) ;
		this.printJumpPoints= checkBox.checked ;
		SetCookie("vr2.pref.printJumpPoints",this.printJumpPoints,365*2) ;
		reprintLastProgram() ;
	}
	
	this.setPrintColors	= function(id)
	{
		checkBox = document.getElementById(id) ;
		this.printColors= checkBox.checked ;
		SetCookie("vr2.pref.printColors",this.printColors,365*2) ;
		reprintLastProgram() ;
	}
	
	this.setPrintExitFigure	= function(id)
	{
		checkBox = document.getElementById(id) ;
		this.printExitFigure = checkBox.checked ;
		SetCookie("vr2.pref.printExitFigure",this.printExitFigure,365*2) ;
		reprintLastProgram() ;
	}
	
	this.setExitFigureCode	= function(id)
	{
		text = document.getElementById(id) ;
		this.exitFigureCode = text.value ;
		SetCookie("vr2.pref.exitFigureCode",this.exitFigureCode,365*2) ;
		reprintLastProgram() ;
	}
	
	this.setNbrWide	= function(id)
	{
		text = document.getElementById(id) ;
		this.nbrWide = text.value ;
		SetCookie("vr2.pref.nbrWide",this.nbrWide,365*2) ;
		reprintLastProgram() ;
	}
}


function reprintLastProgram()
{
	if (thePrinterShownProgram!="")
	{
		printThisProgramInThisDivId(thePrinterShownProgram,thePrinterShowDivId) ;
	}
}


function printThisProgramInThisDivId(aProgram,aDivId)
{
	thePrinterShownProgram	= aProgram ;
	thePrinterShowDivId		= aDivId ;
	
	divElement = document.getElementById(aDivId) ;
	
	tableString = programToString(aProgram) ;
	
	divElement.innerHTML = tableString ;
}


function programToString(aProgram)
{
	string = "" ;
	
	isColored = thePrinterPreferences.printColors ;

		nbrColumn	= thePrinterPreferences.nbrWide ;
		if (nbrColumn<1)
		{
			nbrColumn = 1 ;	//	Just in case
		}
		nbrJumps	= aProgram.getNbrJumps() ;
		nbrLines	= Math.floor(aProgram.getNbrJumps() / nbrColumn) ;
		
		if ((nbrJumps%nbrColumn)!=0)
		{
			nbrLines++ ;
		}

		aJump = aProgram.getFirstJump() ;
		figNum	= 0 ;
		
		for (line=0 ; line<nbrLines ; line++)
		{
			string += "<div class=\"page-breaker\"><table class=\"program-table\"><tr class=\"program-table-line\">" ;
				for (col=0 ; col<nbrColumn ; col++)
				{
					string += "<td class=\"program-table-jump\">" ;
						if (aJump)
						{
							discipline		= aJump.getDiscipline() ;
							aFigure			= aJump.getFirstFigure() ;
							pointsInJump	= aJump.getPoints() ;
							currentPoint	= 1 ;
							
							string += "<table>" ;
							string2 = "" ;
							firstCodeInString2 = true ;
							
								//	Option for the set name
								if (thePrinterPreferences.printSetName)
								{
									string += "<tr><td class=\"program-set-name\">Manche " + (line*nbrColumn+col+1) + "</td></tr>" ;
								}
								
								//	Option for printing the program
								if (thePrinterPreferences.printProgram)
								{
									string2 = "<tr><td class=\"program-set-name\">" ;
								}
								
								//	Option for the exit figure
								string3 = "" ;
								if (thePrinterPreferences.printExitFigure)
								{
									exitFigure = discipline.getFigureFromCode(thePrinterPreferences.exitFigureCode) ;

									string3 += "<tr><td class=\"program-set-name\">" ;
									if (thePrinterPreferences.printJumpPoints)
									{
										string3 += "<table><tr><td valign=\"top\" class=\"program-set-name\">" ;
											string3 += currentPoint + "<br />" ;
										string3 += "</td><td class=\"program-set-name\">" ;
										currentPoint += exitFigure.getPoints() ;
									}

									figNum++ ;
									figureId	= "fig_" + figNum ;
									callback	= "mirrorCallback('" + figureId + "')" ;
									string3 	+= getFigureImg(discipline,exitFigure,figureId,false,isColored,callback) ;

									if (thePrinterPreferences.printJumpPoints)
									{
										string3 += "</td></tr></table>" ;
									}
									string3 += "</td></tr>" ;
								}
							
								while (aFigure)
								{
									if (thePrinterPreferences.printProgram)
									{
										if (!firstCodeInString2)
										{
											string2 += "-";
										}
										firstCodeInString2 = false;
										string2 += aFigure.getCode();
									}
									
									//	Option for printing the pictues
									if (thePrinterPreferences.printPictures)
									{
										string3 += "<tr><td class=\"program-set-name\">";
										if (thePrinterPreferences.printJumpPoints) {
											string3 += "<table><tr><td valign=\"top\">";
											for (n = 0; n < 6; n++) {
												string3 += currentPoint + n * pointsInJump + "<br />";
											}
											string3 += "</td><td>";
											currentPoint += aFigure.getPoints();
										}
										
										figNum++;
										figureId = "fig_" + figNum;
										callback = "mirrorCallback('" + figureId + "')";
										string3 += getFigureImg(discipline, aFigure, figureId, false, isColored, callback);
										
										if (thePrinterPreferences.printJumpPoints) {
											string3 += "</td></tr></table>";
										}
										string3 += "</td></tr>";
									}

									aFigure = aJump.getNextFigure();										
								}
								
								if (thePrinterPreferences.printProgram)
								{
									string2 += "</td></tr>" ;
								}

							string += string2 + string3 + "</table>" ;
							aJump = aProgram.getNextJump() ;
						}
					string += "</td>" ;
				}
			string += "</tr></table></div>" ;
		}
	
	return string ;
}

