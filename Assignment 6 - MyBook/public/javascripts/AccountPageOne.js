function AccountPageOne()
{
	this.Index = "";
	this.Left = "";
	this.Top = "";
	this.Parent = "";
	this.Width = "";
	this.Height = "";
	this.Opacity = "";
	this.AssociatedData = {};
	this.uo = new UserObject();
	this.co = new ComplaintObject();


	var Object = this;

	this.edit = function()
	{
		document.getElementById( "WelcomeName_Div"+Object.Index+"" ).innerHTML = "Welcome: "+Object.AssociatedData.name+" ";
	}

	// Initialization

	this.Initialize = function(Index, Left , Top , Parent , Width , Height , Opacity, AssociatedData)
	{
		this.Index = Index;
		this.Left = Left;
		this.Top = Top;
		this.Parent = Parent;
		this.Width = Width;
		this.Height = Height;
		this.Opacity = Opacity;
		this.AssociatedData = AssociatedData;

		this.Render();

	}

	this.Render = function()
	{

	// Begin User Interface

		Object.AccountPageDiv = 	
					"<div id='AccountPage"+Object.Index+"' style='position: absolute; top: "+Object.Top+"%; left: "+Object.Left+"%; height: "+Object.Height+"%; width: "+Object.Width+"%; opacity: "+Object.Opacity+"; border: 0px solid #000000; border-radius: 0px 0px 0px 0px; overflow: hidden;'></div>";
	
		$( "#"+Object.Parent+"" ).append(Object.AccountPageDiv);
		// $( "#"+"AccountPage"+Object.Index+"" ).css({"background": "url('./bkgacct1.jpg')"});

		Object.FunctionDiv = 	
					"<div id='Function_Div"+Object.Index+"' style='position: absolute; top: 40px; left: 0px; bottom: 0px; width: 25%; opacity: "+Object.Opacity+"; border: 2px solid rgb(0,0,255);background-color:#AFC9FA; border-radius: 0px 0px 0px 0px; overflow: hidden;'></div>";

		$( "#AccountPage"+Object.Index+"" ).append(Object.FunctionDiv);

		Object.WelcomeDiv =
					"<div id='Welcome_Div"+Object.Index+"' style='position: absolute; top: 0px; left: 0px; height: 40px; width: 100%; opacity: "+Object.Opacity+"; border: 2px solid #0B197D;background-color:#0B197D; border-radius: 0px 0px 0px 0px; overflow: hidden;'></div>"; 

		$( "#AccountPage"+Object.Index+"" ).append(Object.WelcomeDiv);

		Object.WorkAreaDiv = 	
					"<div id='WorkArea_Div"+Object.Index+"' style='position: absolute; top: 43px; left: 25%; bottom: 0px; width: 75%; opacity: "+Object.Opacity+"; border: 2px solid rgb(0,0,255);background-color:transparent; border-radius: 0px 0px 0px 0px; overflow: scroll;'></div>";

		$( "#AccountPage"+Object.Index+"" ).append(Object.WorkAreaDiv);

		Object.WelcomeNameDiv =
					"<div id='WelcomeName_Div"+Object.Index+"' style='position: absolute; top: 0px; left: 0px; height: 40px; width: 45%; opacity: "+Object.Opacity+"; border: 0px solid #0B197D;background-color:transparent; border-radius: 0px 0px 0px 0px; overflow: hidden; text-align: left; line-height: 40px; color: #FFFFFF; padding-left:10px;'>Welcome: "+Object.AssociatedData.name+" "+"</div>"; 

		$( "#Welcome_Div"+Object.Index+"" ).append(Object.WelcomeNameDiv);

		Object.LogoutButton = "<input type='button' id='LogoutButton' value='Logout' />";
		$( "#Welcome_Div"+Object.Index+"" ).append(Object.LogoutButton);
		$( "#LogoutButton" ).css( {"position":"absolute","top":"5%","right":"5px", "width":"10%" , "height":"90%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"transparent","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"0px 0px 0px #888888", "text-align":"center"});
		
		Object.AddUserButton = "<input type='button' id='AddUserButton' value='Add User' />";
		$( "#Function_Div"+Object.Index+"" ).append(Object.AddUserButton);
		$( "#AddUserButton" ).css( {"position":"absolute","top":"8%","left":"20%", "width":"60%" , "height":"15%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});

		Object.ListUsersButton = "<input type='button' id='ListUsersButton' value='List All Users' />";
		$( "#Function_Div"+Object.Index+"" ).append(Object.ListUsersButton);
		$( "#ListUsersButton" ).css( {"position":"absolute","top":"31%","left":"20%", "width":"60%" , "height":"15%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});

		Object.AddPostsButton = "<input type='button' id='AddPostsButton' value='Add Post' />";
		$( "#Function_Div"+Object.Index+"" ).append(Object.AddPostsButton);
		$( "#AddPostsButton" ).css( {"position":"absolute","top":"54%","left":"20%", "width":"60%" , "height":"15%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});

		Object.ListComplaintsButton = "<input type='button' id='ListComplaintsButton' value='List All Posts' />";
		$( "#Function_Div"+Object.Index+"" ).append(Object.ListComplaintsButton);
		$( "#ListComplaintsButton" ).css( {"position":"absolute","top":"77%","left":"20%", "width":"60%" , "height":"15%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});
		

	// Begin Event Handlers
	
		$( "#AddUserButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#0B197D","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#AddUserButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#ListUsersButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#0B197D","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#ListUsersButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#ListComplaintsButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#0B197D","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#ListComplaintsButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#AddPostsButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#0B197D","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#AddPostsButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#LogoutButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#276FF5","border":"1px solid rgb(10,10,200)", "color": "#0B197D","box-shadow":"0px 0px 10px #333333"}); });
		$( "#LogoutButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "transparent","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 0px #999999"}); });

		$( "#AddUserButton" ).on('click',function()  //edit
		{ 
			//Populate the add user object
			$("#WorkArea_Div"+Object.Index).empty();
			Object.uo.Initialize("ViewDO", 10 , 10 , "WorkArea_Div"+Object.Index , 80 , 80 , 1.0, {}, true, Object, true);
		});

		$( "#ListUsersButton" ).on('click',function()  //edit
		{ 
			//List all the users
			$.get(server_url+"/users?token="+token,
			    function(data, status){
			        console.log("Data: " + data + "\nStatus: " + status);

				        $("#WorkArea_Div"+Object.Index).empty();
				        
				        for(var i = 0; i < data.length; i++)
				        {

				        	Object.render_wa(i,data);
				        }
				    
			    });
		});

		$( "#ListComplaintsButton" ).on('click',function()  //edit
		{ 
			//List all the complaints
			$.get(server_url+"/all_complaints?token="+token,
			    function(data, status){
			        console.log("Data: " + data + "\nStatus: " + status);

				        $("#WorkArea_Div"+Object.Index).empty();
				        
				        if (data !== "Empty collection")
					        for(var i = 0; i < data.length; i++)
					        {

					        	Object.render_wac(i,data);
					        }
					    else
					    {
					    	Object.EmptyDiv =
										"<div id='Empty_Div"+Object.Index+"' style='position: absolute; top: 0px; left: 0px; height: 40px; width: 45%; opacity: "+Object.Opacity+"; border: 0px solid #0B197D;background-color:transparent; border-radius: 0px 0px 0px 0px; overflow: hidden; text-align: left; line-height: 40px; color: #000000; padding-left:10px;'>No post to show</div>"; 

							$( "#WorkArea_Div"+Object.Index+"" ).append(Object.EmptyDiv);
					    }
				    
			    });
		});

		$( "#AddPostsButton" ).on('click',function()  //edit
		{ 
			// var co = new CompaintObject();
			$("#WorkArea_Div"+Object.Index).empty();
			Object.co.Initialize("ViewCO"+Object.Index, 10 , 10 , "WorkArea_Div"+Object.Index , 80 , 80 , 1.0, {} , true, Object);	
		});

		$( "#LogoutButton" ).on('click',function()  //edit
		{ 
			document.getElementById("AccountPage"+Object.Index).remove();
			login.Initialize( "LoginObj1", 25 , 30 , "HomeDiv" , 50 , 40 , 1.0);
		});

	}

	this.render_wa = function(i,data)
	{
		var uo = new UserObject();
		uo.Initialize("ViewDO"+i, 10 , 10+90*i , "WorkArea_Div"+Object.Index , 80 , 80 , 1.0, data[i] , false, Object, false);
	}

	this.render_wac = function(i,data)
	{
		var co = new ComplaintObject();
		co.Initialize("ViewCO"+i, 10 , 10+90*i , "WorkArea_Div"+Object.Index , 80 , 80 , 1.0, data[i] , false, Object);
	}


}