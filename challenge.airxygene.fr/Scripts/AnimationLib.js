//
//	AnimationLib.js
//
//	by Stef
//



//
//	This global variable will contain all the animation lists, identified by an id.
//	An animation list is a queue of animations that will be executed one after another.
//	Animations can be queued in a list at any time. They will start as soon as the previous animation
//	in the list is complete (or immediately if there is no animation running for that list).
//
//	To insert an animation, use the addAnimationToRun function with the list id.
//
//	Animations are object that must fulfill the following protocole :
//		animation.start()
//		boolean animation.performOneStep() returns true if the animation is complete
//		int animation.getTimer() return the delay (in ms) between 2 steps
//
	var	AnimationLibAnimationLists = new Array() ;


//
//	This function will add an animation to an animation list identified with an id.
//	If the animation list does not exist yet, it is created.
//	It is the only function that needs to be accessed externally.
//
function addAnimationToRun(listId,animation)
{
	if (typeof(AnimationLibAnimationLists[listId])=='undefined')
	{
		AnimationLibAnimationLists[listId] = new animationList(listId) ;
	}

	AnimationLibAnimationLists[listId].addAnimationToRun(animation) ;
}


//	Internals


//
//	Runs the current animation from the list.
//	Used as callback from timers.
//
function runAnimation(poolId)
{
	AnimationLibAnimationLists[poolId].runAnimation() ;
}

//
//	The animation list class
//
function animationList(id)
{
	this.inUse				= false ;			//	tells whether an animation is running
	this.list				= new Array() ;		//	queue of animations
	this.currentAnimation	= -1 ;				//	currently running animation
	this.id					= id ;				//	id of the list
	
	//	add an animation in the queue, and start running it if it is the first one
	this.addAnimationToRun = function(animation)
	{
		if (this.inUse)
		{
			//	an animation is already running, put this one in the queue
			this.list.push(animation) ;
		}
		else
		{
			//	this the first animation, initialise a new queue and start running
			this.inUse	= true ;
			this.list	= new Array() ;
			this.list.push(animation) ;
			this.currentAnimation = 0 ;
			
			animation.start() ;
			this.runAnimation() ;
		}
	}
	
	//	run one step of the current animation, if the animation is complete, program next animation to run
	this.runAnimation = function()
	{
		isComplete = this.list[this.currentAnimation].performOneStep() ;

		if (isComplete)
		{
			//	end of the animation look if another one must start
			this.currentAnimation++ ;
		}
		
		//	continue running if the current animation is not complete, or if another
		//	one is waiting
		if ((!isComplete) || (this.list.length>this.currentAnimation))
		{
			if (isComplete)
			{
				//	This is a new animation, so start it
				this.list[this.currentAnimation].start();
			}
			fct = "runAnimation('" + this.id + "')" ;
			window.setTimeout(fct,this.list[this.currentAnimation].getTimer()) ;
		}
		else
		{
			this.inUse = false ;
		}
	}
}
