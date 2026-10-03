//
//
//	ZoneManager.js
//
//	by Stef
//
//


	var theZoneManager = new ZoneManager() ;
	
//
//	The zone manager offer services to handle the div of the HTML page
//	Make them enter or leave the page
//
function ZoneManager()
{
//	Properties
	this.actionBarZoneId				= '' ;
		this.actionOptionDivId			= '' ;
		this.autoManualChoiceDivId		= '' ;
		this.autoPickupDivId			= '' ;
		this.manualPickupDivId			= '' ;
	this.presentationZoneId				= '' ;
		this.presentationZoneDivId		= '' ;
	this.showZoneId						= '' ;

	this.actionBarIsVisible				= true ;	//	tells whther the action is bar is visible
	this.manualOrAutoIsVisible			= 'auto' ;	//	tells which option is visible (auto or manual)
	
	this.nbrDiscInManual				= 1 ;		//	number of disciplines in hte manual specification
	
	this.currentManualDiscipline		= null ;	//	current manual discipline for the presentation zone
	this.currentManualJumpText			= null ;

//	Methods
	this.initialiseState	= function(	actionBarZoneId,actionOptionDivId,autoManualChoiceDivId,autoPickupDivId,manualPickupDivId,
										presentationZoneId,presentationZoneDivId,
										showZoneId)
	{
		this.actionBarZoneId			= actionBarZoneId ;
		this.actionOptionDivId			= actionOptionDivId ;
		this.autoManualChoiceDivId		= autoManualChoiceDivId ;
		this.autoPickupDivId			= autoPickupDivId ;
		this.manualPickupDivId			= manualPickupDivId ;
		this.presentationZoneId			= presentationZoneId ;
		this.presentationZoneDivId		= presentationZoneDivId ;
		this.showZoneId					= showZoneId ;

		this.actionBarIsVisible			= true ;
		this.manualOrAutoIsVisible		= 'auto' ;
		
		enterLeft = new animationEnterLeft(this.actionOptionDivId,50) ;
		addAnimationToRun(this.actionBarZoneId,enterLeft) ;
		enterLeft2 = new animationEnterLeft(this.autoManualChoiceDivId,50) ;
		addAnimationToRun(this.actionBarZoneId,enterLeft2) ;
		enterLeft3 = new animationEnterLeft(this.autoPickupDivId,50) ;
		addAnimationToRun(this.actionBarZoneId,enterLeft3) ;		
	}
	
	//
	//	Discipline to competition menu callback
	//
	this.changeCompetitionMenuBasedOnSelectedDiscipline	= function(discMenuId,competMenuId)
	{
		//	get the selected discipline
		disciplineSelect = document.getElementById(discMenuId) ;
		selectionDisciplineName = disciplineSelect.options[disciplineSelect.selectedIndex].text ;

		//	get the discipline competition names
		nameArray = globalCompetitionList.getCompetitionNamesOfDiscipline(selectionDisciplineName) ;
	
		//	build the select
		populateSelectElementWithOptionNames(competMenuId,nameArray,null) ;
	}
	
	//
	//	Show Hide button callback
	//
	this.showHideCallback	= function(showHideButtonId)
	{
		var anim1 ;
		var anim2 ;
		showHideButton = document.getElementById(showHideButtonId) ;
		
		if (this.actionBarIsVisible)	//	move out
		{
			//	Action bar
			if (this.manualOrAutoIsVisible == 'auto')
			{
				anim1 = new animationExitLeft(this.autoPickupDivId, 50) ;
			}
			else
			{
				anim1 = new animationExitLeft(this.manualPickupDivId,50) ;
				
				exitAnim2 = new animationExitRight(this.presentationZoneDivId,100) ;
				addAnimationToRun(this.presentationZoneId,exitAnim2) ;
			}
			anim2 = new animationExitLeft(this.autoManualChoiceDivId,50) ;
			this.actionBarIsVisible = false ;
			showHideButton.value = '>>' ;
		}
		else	//	move in
		{
			anim1 = new animationEnterLeft(this.autoManualChoiceDivId,50) ;
			if (this.manualOrAutoIsVisible == 'auto')
			{
				anim2 = new animationEnterLeft(this.autoPickupDivId, 50) ;
			}
			else
			{
				anim2 = new animationEnterLeft(this.manualPickupDivId,50) ;
				
				enterAnim2 = new animationEnterRight(this.presentationZoneDivId,100) ;
				addAnimationToRun(this.presentationZoneId,enterAnim2) ;
			}
			this.actionBarIsVisible = true ;
			showHideButton.value = '<<' ;
		}
		
		addAnimationToRun(this.actionBarZoneId,anim1) ;
		addAnimationToRun(this.actionBarZoneId,anim2) ;
	}
	
	//
	//	Auto/Manual menu callback
	//
	this.autoManualChoiseMenuCallback	= function(autoManualChoiseMenuId)
	{
		autoManualSelect = document.getElementById(autoManualChoiseMenuId) ;
		value = autoManualSelect.options[autoManualSelect.selectedIndex].value ;
							
		switch (value)
		{
			case "automatic":
				if (this.manualOrAutoIsVisible=="manual")
				{
					//	Make action bar leave on the left
					exitAnim = new animationExitLeft(this.manualPickupDivId,50) ;
					addAnimationToRun(this.actionBarZoneId,exitAnim) ;
					enterAnim = new animationEnterLeft(this.autoPickupDivId,50) ;
					addAnimationToRun(this.actionBarZoneId,enterAnim) ;
					this.manualOrAutoIsVisible = "auto" ;
					
					//	Make presentation leave on the right
					exitAnim2 = new animationExitRight(this.presentationZoneDivId,100) ;
					addAnimationToRun(this.presentationZoneId,exitAnim2) ;
				}
				break ;
								
			case "manual":
				if (this.manualOrAutoIsVisible=='auto')
				{
					//	Make action bar enter on the left
					exitAnim = new animationExitLeft(this.autoPickupDivId,50) ;
					addAnimationToRun(this.actionBarZoneId,exitAnim) ;
					enterAnim = new animationEnterLeft(this.manualPickupDivId,50) ;
					addAnimationToRun(this.actionBarZoneId,enterAnim) ;
					this.manualOrAutoIsVisible = 'manual' ;
					
					//	Make presentation enter on the right
					enterAnim2 = new animationEnterRight(this.presentationZoneDivId,100) ;
					addAnimationToRun(this.presentationZoneId,enterAnim2) ;
				}
				break ;
		}
	}
	
	//
	//	Auto Pikup Callback
	//
	this.autoPickupGoCallback	= function (autoPickupDiscMenuId,autoPickupNbrMenuId,autoPickupCompetMenuId)
	{
		disciplineSelect = document.getElementById(autoPickupDiscMenuId) ;
		disciplineName = disciplineSelect.options[disciplineSelect.selectedIndex].value ;
							
		nbrSelect = document.getElementById(autoPickupNbrMenuId) ;
		nbr = nbrSelect.options[nbrSelect.selectedIndex].value ;
							
		competitionSelect = document.getElementById(autoPickupCompetMenuId) ;
		competitionId = competitionSelect.options[competitionSelect.selectedIndex].value ;
							
		competition = globalCompetitionList.getCompetition(disciplineName,competitionId) ;
		aProgram = competition.pickUpProgram(nbr) ;
					
		printThisProgramInThisDivId(aProgram,this.showZoneId) ;
	}
	
	//
	//	Management of the discipline blocks in the manual jumps
	//
	this.getNbrDiscInManual		= function()
	{
		return this.nbrDiscInManual ;
	}
	
	this.addDiscInManualJump	= function(divClass,id,htmlString)
	{
		newDiv = document.createElement("div") ;
		newDiv.className	= divClass ;
		newDiv.id			= id ;
		newDiv.innerHTML	= htmlString ;

		newDiv.style.display	= "none" ;
		newDiv.style.position	= "relative" ;
		newDiv.style.right		= "100%" ;
	
		actionBar = document.getElementById(this.manualPickupDivId) ;
		actionBar.appendChild(newDiv) ;

		enterAnim = new animationEnterLeft(id,50) ;
		addAnimationToRun(this.actionBarZoneId,enterAnim) ;
	
		this.nbrDiscInManual++ ;
	}

	this.removeDiscInManualJump	= function(id)
	{	
		exitAnim = new animationExitLeft(id,50,theZoneManager.removeEndCallback,id) ;
		addAnimationToRun(this.actionBarZoneId,exitAnim) ;
	}

	this.removeEndCallback = function(id)
	{
		oldDiv = document.getElementById(id) ;
		actionBar = document.getElementById(theZoneManager.manualPickupDivId) ;
		actionBar.removeChild(oldDiv) ;
		
		theZoneManager.buildAndShowManualJump() ;
	}
			
	this.buildAndShowManualJump	= function()
	{
		aProgram = new program() ;
		
		//	Loop through each sub-block of the manual block
		manualDiv = document.getElementById(this.manualPickupDivId) ;
		
		for (childDiv = manualDiv.firstChild ;
				childDiv ;
				childDiv = childDiv.nextSibling)
		{
			if (childDiv.nodeType==1)
			{
				//	Get the subblock number
				nbr = childDiv.id.match(/\d+/)[0] ;
				
				selectOfDiv		= document.getElementById("manual-pickup-disc-menu-" + nbr) ;
				disciplineName	= selectOfDiv.value ;
				aDisc			= globalDisciplineList.getDisciplineWithName(disciplineName) ;
				
				textOfDiv		= document.getElementById("manual-pickup-edit-" + nbr) ;
				jumpString		= textOfDiv.value ;
				
				aProgram.appendJumpsFromString(aDisc,jumpString) ;
			}
		}
		
		printThisProgramInThisDivId(aProgram,this.showZoneId) ;
	}
	
	this.buildAndShowURLJump = function(type,jump)
	{
		var aProgram	= new program() ;
		var aDisc		= globalDisciplineList.getDisciplineWithName(type) ;
		var jumpString	= jump ;
		aProgram.appendJumpsFromString(aDisc,jumpString) ;
		printThisProgramInThisDivId(aProgram,this.showZoneId) ;
	}
	
	this.prettyPrintInThisURLAndDiv	= function(url,divId,headerTextId)
	{
		headerTextInput = document.getElementById(headerTextId) ;
		headerString	= headerTextInput.value ;
		
		var completeUrl	= url + "?header=" + encodeURI(headerString) ;
		var aJump		= thePrinterShownProgram.getFirstJump() ;
		var	nbr			= 1 ;

		while (aJump)
		{
			completeUrl += "&type" + nbr + "=" + aJump.getDiscipline().getName() ;
			completeUrl += "&jump" + nbr + "=" + aJump.getString() ;
			
			aJump = thePrinterShownProgram.getNextJump() ;
			nbr++ ;
		}
		completeUrl += "&nbr=" + (nbr-1) ;
		
		newWindow	= window.open(completeUrl,"_target") ;
	}
	
	//
	//	Management of the help zone
	//
	this.toggleHelp	= function(id)
	{
		div = document.getElementById(id) ;
		
		if (div.style.display=="block")
		{
			//	help is shown, hide it
			this.closeHelp(id) ;
		}
		else
		{
			//	show the help
			div.style.display = "block" ;
		}

	}

	this.closeHelp	= function(id)
	{
		div = document.getElementById(id) ;
		div.style.display = "none" ;
	}
	
	//
	//	Management of the presentation zone
	//
	this.filterToPictures	= function(filterMenuId,pictureZoneId)
	{
		filterSelect		= document.getElementById(filterMenuId) ;
		filterString		= filterSelect.options[filterSelect.selectedIndex].value ;
		filter				= new RegExp(filterString) ;

		string = "" ;

		imax = this.currentManualDiscipline.getNbrFigures() ;
		for (var i=0;i<imax;i++)
		{
			code	= this.currentManualDiscipline.getCodeAtIndex(i) ;
			fig		= this.currentManualDiscipline.getFigureFromCode(code) ;
			
			if (code.match(filter))
			{
				callback	="theZoneManager.presentationFigureClick('" + code + "')" ;
				figId		= "pres-fig-" + i ;
				string		+= getFigureImg(this.currentManualDiscipline,fig,figId,false,false,callback) ;
				string		+= "<br />" ;
			}
		}
		
		div = document.getElementById(pictureZoneId) ;
		div.innerHTML = string ;
		
	}
	
	this.menuToPictures	= function(discMenuId,filterMenuId,editID,pictureZoneId)
	{
		disciplineSelect	= document.getElementById(discMenuId) ;
		disciplineName		= disciplineSelect.options[disciplineSelect.selectedIndex].text ;
		aDisc				= globalDisciplineList.getDisciplineWithName(disciplineName) ;
		
		this.currentManualDiscipline	= aDisc ;
		this.currentManualJumpText		= document.getElementById(editID) ;
		
		this.filterToPictures(filterMenuId,pictureZoneId) ;
	}
	
	this.presentationFigureClick	= function(code)
	{
		if (this.currentManualJumpText.value.length!=0)
		{
			if (this.currentManualJumpText.value.charAt(this.currentManualJumpText.value.length-1)!=';')
			{
				this.currentManualJumpText.value += '-' ;
			}
		}
		this.currentManualJumpText.value += code ;
		
		this.buildAndShowManualJump() ;
	}
	
	this.addJumpSeparator	= function()
	{
		this.currentManualJumpText.value += ';' ;
	}
	
	this.printCurrentDisciplineProgram	= function()
	{
		function PrintAPool(discipline,poolRegexp,figuresPerPage)
		{
			s = "" ;
			
			freePool = createPoolOFDisciplineWithRegexp(discipline,poolRegexp) ;
			freePool.reset() ;
			freePoolNbrCodes = freePool.getNbrFigureCodes() ;
			for (i=0 ; i<freePoolNbrCodes ; i++)
			{
				if ((i%figuresPerPage)==0)
				{
					s += "<div class=\"page-breaker\"><p class=\"small\">Imprim&eacute; gr&acirc;ce &agrave; http://challenge.airxygene.fr</p><table class=\"program-table\">"
				}
				
				if ((i%4)==0)
				{
					s += "<tr>" ;
				}
				
				code	= freePool.getCodeAtIndex(i) ;
				figure	= discipline.getFigureFromCode(code) ;
				s += "<td class=\"program-table-jump\">" + getFigureImg(discipline,figure,'',false,false,'') + "</td>" ;
				
				if ((i%4)==3)
				{
					s += "</tr>" ;
				}
				
				if (((i%figuresPerPage)==(figuresPerPage-1))
				||	(i==(freePoolNbrCodes-1)))
				{
					s += "</table></div>" ;
				}
			}
			
			return s ;
		}
		
		newWindow	= window.open("PrintReady.html","_target") ;
		
		s1 = "<html><head><title></title><link rel=\"stylesheet\" type=\"text/css\" href=\"CSS/SeparateProgram.css\" /></head><body>" ;
		newWindow.document.write(s1) ;
		
		s2  = "<h1>" + this.currentManualDiscipline.getName() + " - Libres</h1>"
		s2 += PrintAPool(this.currentManualDiscipline,poolFreeFiguresRegexp,24) ;
		newWindow.document.write(s2) ;
		
		s2  = "<h1>" + this.currentManualDiscipline.getName() + " - Blocs</h1>"
		s2 += PrintAPool(this.currentManualDiscipline,poolBlockFiguresRegexp,8) ;
		newWindow.document.write(s2) ;

		s3 = "</body></html>" ;
		newWindow.document.write(s3) ;
	}
}

