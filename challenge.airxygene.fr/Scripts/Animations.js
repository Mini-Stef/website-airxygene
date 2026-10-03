

function animationEnterLeft(divId,timer)
{
	this.id		= divId ;
	this.timer	= timer ;
	
	this.start = function()
	{
		div = document.getElementById(this.id);
		
		//	Set the position of the animated div completely left
		div.style.right = "100%";
		div.style.display = "block";
	}
	
	this.performOneStep = function()
	{
		crd = false ;	//	continue
		div = document.getElementById(this.id) ;
		
		pos = parseInt(div.style.right.match(/[\d]+/)[0]) ;
		pos = pos - 10 ;

		if (pos <= 0)
		{
			//	This is the end
			pos = 0 ;
			crd = true ;
		}
		
		div.style.right = pos + "%" ;
		return crd ;
	}
	
	this.getTimer = function()
	{
		return timer ;
	}
}


function animationExitLeft(divId,timer,endCallbackOpt,endCallbackArgsOpt)
{
	this.id					= divId ;
	this.timer				= timer ;
	this.endCallback		= endCallbackOpt ;
	this.endCallbackArgs	= endCallbackArgsOpt ;
	
	this.start = function()
	{}
	
	this.performOneStep = function()
	{
		crd = false ; //	continue
		div = document.getElementById(this.id) ;
		
		pos = parseInt(div.style.right.match(/[\d]+/)[0]) ;
		pos = pos + 10 ;
		
		if (pos >= 100)
		{
			//	This is the end, release the semaphore
			pos = 100 ;
			crd = true ;
		}
		
		div.style.right = pos + "%" ;
		
		if (pos >= 100)
		{
			div.style.display = "none" ;
		}
		
		if (crd)
		{
			if (this.endCallback)
			{
				this.endCallback(this.endCallbackArgs) ;
			}
		}
		
		return crd ;
	}
	
	this.getTimer = function()
	{
		return timer ;
	}
}


function animationEnterRight(divId,timer)
{
	this.id		= divId ;
	this.timer	= timer ;
	
	this.start = function()
	{
		div = document.getElementById(this.id);
		
		//	Set the position of the animated div completely left
		div.style.left = "100%";
		div.style.display = "block";
	}
	
	this.performOneStep = function()
	{
		crd = false ;	//	continue
		div = document.getElementById(this.id) ;
		
		pos = parseInt(div.style.left.match(/[\d]+/)[0]) ;
		pos = pos - 10 ;

		if (pos <= 0)
		{
			//	This is the end
			pos = 0 ;
			crd = true ;
		}
		
		div.style.left = pos + "%" ;
		return crd ;
	}
	
	this.getTimer = function()
	{
		return timer ;
	}
}


function animationExitRight(divId,timer,endCallbackOpt,endCallbackArgsOpt)
{
	this.id					= divId ;
	this.timer				= timer ;
	this.endCallback		= endCallbackOpt ;
	this.endCallbackArgs	= endCallbackArgsOpt ;
	
	this.start = function()
	{}
	
	this.performOneStep = function()
	{
		crd = false ; //	continue
		div = document.getElementById(this.id) ;
		
		pos = parseInt(div.style.left.match(/[\d]+/)[0]) ;
		pos = pos + 10 ;
		
		if (pos >= 100)
		{
			//	This is the end, release the semaphore
			pos = 100 ;
			crd = true ;
		}
		
		div.style.left = pos + "%" ;
		
		if (pos >= 100)
		{
			div.style.display = "none" ;
		}
		
		if (crd)
		{
			if (this.endCallback)
			{
				this.endCallback(this.endCallbackArgs) ;
			}
		}
		
		return crd ;
	}
	
	this.getTimer = function()
	{
		return timer ;
	}
}


function animationMirrorImage(imgId,toSrc,timer)
{
	this.id					= imgId ;
	this.timer				= timer ;
	this.toSrc				= toSrc ;
	this.img				= null ;
	this.originalWidth		= 0 ;
	this.currentWidth		= 0 ;
	this.deltaWidth			= 0 ;
	this.originalHeight		= 0 ;
	
	this.start = function()
	{
		this.img			= document.getElementById(this.id) ;
		this.originalWidth	= this.img.width ;
		this.currentWidth	= this.originalWidth ;
		this.deltaWidth		= -this.originalWidth/5 ;
		this.originalHeight	= this.img.height ;
	}

	this.performOneStep = function()
	{
		crd = false ; //	continue
		
		this.currentWidth	+= this.deltaWidth ;
		
		if (this.currentWidth<=0)
		{
			//	End of reduction phase
			this.currentWidth	= 0 ;
			this.deltaWidth		= -this.deltaWidth ;
			this.img.src		= this.toSrc ;
		}
		if (this.currentWidth>=this.originalWidth)
		{
			//	End of animation
			this.currentWidth	= this.originalWidth ;
			crd					= true ;
		}
		
		this.img.width	= this.currentWidth ;
		this.img.height	= this.originalHeight ;
			
		return crd ;
	}

	this.getTimer = function()
	{
		return timer ;
	}
}

