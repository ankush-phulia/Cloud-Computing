function HomePage()
{
	this.Index = "";
	this.Left = "";
	this.Top = "";
	this.Parent = "";
	this.Width = "";
	this.Height = "";
	this.Opacity = "";

	var Object  = this;

	this.Initialize = function( Index, Left , Top , Parent , Width , Height , Opacity )
	{
		this.Index = Index;
		this.Left = Left;
		this.Top = Top;
		this.Parent = Parent;
		this.Width = Width;
		this.Height = Height;
		this.Opacity = Opacity;

		this.Render();
	}

	this.Render = function()
	{
		//Begin User Interface

		Object.HomePageDiv = 	
					"<div id='HomePageDiv"+Object.Index+"' style='position: absolute; top: "+Object.Top+"%; left: "+Object.Left+"%; height: "+Object.Height+"%; width: "+Object.Width+"%; opacity: "+Object.Opacity+"; border: 0px solid #000000;background-color:#FFFFFF;  border-radius: 20px 20px 20px 20px; overflow: hidden;box-shadow: 5px 5px 40px #333333 inset, 2px 2px 0 #333333;'></div>";

		$( "#"+Object.Parent+"" ).append(Object.HomePageDiv);
		
		Object.EngTitle = "<div id='engtitle' style=' color: #FFFFFF; position:absolute; top:0%; left: 22%'><h1 style='font-size:400%'>Hriday</h1></div>";
		Object.HindiTitle = "<div id='hindititle' style=' color: #FFFFFF; position:absolute; top:60%; left: 25%'><h1 style='font-size:400%'>हृदय</h1></div>";

		Object.HeartImg = "<div id='dil' style=' color:transparent; position:absolute; top: 24%; left: 20%'><img src='Picture2.png' style='float:left; width: 40%; height: 40%;'></img></div>";


		$( "#"+Object.Parent+"" ).append(Object.EngTitle);
		$( "#"+Object.Parent+"" ).append(Object.HindiTitle);
		$( "#"+Object.Parent+"" ).append(Object.HeartImg);

		Object.SignUpButton = "<input type='button' id='SignUpButton' value='Sign Up' />";
		$( "#HomePageDiv"+Object.Index+"" ).append(Object.SignUpButton);
		$( "#SignUpButton" ).css( {"position":"absolute","top":"10%","left":"20%", "width":"60%" , "height":"20%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});

		Object.LoginButton = "<input type='button' id='LoginButton' value='Login' />";
		$( "#HomePageDiv"+Object.Index+"" ).append(Object.LoginButton);
		$( "#LoginButton" ).css( {"position":"absolute","top":"40%","left":"20%", "width":"60%" , "height":"20%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});

		Object.TreatButton = "<input type='button' id='TreatButton' value='Start Treatment' />";
		$( "#HomePageDiv"+Object.Index+"" ).append(Object.TreatButton);
		$( "#TreatButton" ).css( {"position":"absolute","top":"70%","left":"20%", "width":"60%" , "height":"20%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});

		// Begin Event Handlers
	
		$( "#SignUpButton").on('mouseover',function(){ $( this ).css( {"background-color": "#0B197D","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#SignUpButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#LoginButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#0B197D","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#LoginButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#TreatButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#0B197D","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#TreatButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#TreatButton" ).on('click',function()
		{ 
			document.getElementById("HomeDiv").innerHTML = "";

			var tut = new Tutorial();
			tut.Initialize( "TutorialObj1",25,30,"HomeDiv",50,40,1.0,false);
		});

		$( "#SignUpButton" ).on('click',function()
		{ 
			// change:
			document.getElementById("HomeDiv").innerHTML = "";
			signup.Initialize("MainSU", 15 , 10 , "HomeDiv" , 70 , 80 , 1.0);
			// change end
		});

		$( "#LoginButton" ).on('click',function()
		{ 
			document.getElementById("HomeDiv").innerHTML = "";
			login.Initialize( "LoginObj1", 25 , 30 , "HomeDiv" , 50 , 40 , 1.0);
		});

	}

}