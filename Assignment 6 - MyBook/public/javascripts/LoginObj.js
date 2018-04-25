function LoginObj()
{
	this.Index = "";
	this.Left = "";
	this.Top = "";
	this.Parent = "";
	this.Width = "";
	this.Height = "";
	this.Opacity = "";
	this.Login = "";
	this.Password = "";

	var Object = this;

	// Initialization

	this.Initialize = function(Index, Left , Top , Parent , Width , Height , Opacity)
	{
		this.Index = Index;
		this.Left = Left;
		this.Top = Top;
		this.Parent = Parent;
		this.Width = Width;
		this.Height = Height;
		this.Opacity = Opacity;
		this.Login = "";
		this.Password = "";

		this.Render();

	}

	this.Render = function()
	{
	// Begin User Interface

		Object.LoginPageDiv = 	
					"<div id='Login_Div"+Object.Index+"' style='position: absolute; top: "+Object.Top+"%; left: "+Object.Left+"%; height: "+Object.Height+"%; width: "+Object.Width+"%; opacity: "+Object.Opacity+"; border: 0px solid #000000;background-color:#AFC9FA; border-radius: 50px 0px 50px 0px; overflow: hidden;box-shadow: 2px 2px 20px #333333;'></div>";

		$( "#"+Object.Parent+"" ).append(Object.LoginPageDiv);
		
		Object.LoginText = "<div id='logintext' style='color:blue;font-size:1em;font-family:Garamond;font-weight:bold;text-align:center;position: absolute; left:5%;top:10%;width:40%;height:20%;line-height:300%'>Username :</div>";

		$( "#Login_Div"+Object.Index+"" ).append(Object.LoginText);

		Object.PasswordText = "<div id='passwordtext' style='color:blue;font-size:1em;font-family:Garamond;font-weight:bold;text-align:center;position: absolute; left:5%;top:35%;width:40%;height:20%;line-height:300%'>Password :</div>";

		$( "#Login_Div"+Object.Index+"" ).append(Object.PasswordText);


		Object.UserNameInput = "<input type='email' id='UserNameInput' spellcheck='false' placeholder='Enter username'/>";
		$( "#Login_Div"+Object.Index+"" ).append(Object.UserNameInput);
		$( "#UserNameInput" ).css( {"position":"absolute","top":"10%","left":"55%", "width":"40%" , "height":"20%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		$( "#UserNameInput" ).focus();

		Object.PasswordInput = "<input type='password' id='PasswordInput' spellcheck='false' placeholder='Enter Password'/>";
		$( "#Login_Div"+Object.Index+"" ).append(Object.PasswordInput);
		$( "#PasswordInput" ).css( {"position":"absolute","top":"35%","left":"55%", "width":"40%" , "height":"20%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		Object.GoButton = "<input type='button' id='GoButton' value='Go'/>";
		$( "#Login_Div"+Object.Index+"" ).append(Object.GoButton);
		$( "#GoButton" ).css( {"position":"absolute","top":"65%","left":"35%","height":"25%","width":"30%","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","color":"#FFFFFF","font-size":"1em","border-radius":"5px", "box-shadow":"2px 2px 5px #000000"});

		
	// Begin Event Handlers

		$( "#GoButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#0B197D","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#GoButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#GoButton" ).on('click',function()  //edit
		{ 
			var uname = $("#UserNameInput").val();
			var passw = $("#PasswordInput").val();
			if (uname != "" && passw != "")
			{
				//Pass the input to the server here
				$.post(server_url+"/special_login",
			    {
			        username: uname,
			        password: passw
			    },
			    function(data, status){
			        console.log("Data: " + data + "\nStatus: " + status);

			        if (data.success === true)
			        {
				        token = data.token;
				        
				        $("#HomeDiv").empty();
				        acctPage.Initialize("acctpage1", 0 , 0 , "HomeDiv" , 100 , 100 , 1, data);
				    }
				    else
				    	alert("PLease check your credentials");
			    });
			}

			else if (uname == "")
			{
				alert("Username Cannot be Left Blank");
				$("#UserNameInput").focus();
			}
			else
			{
				alert("Password cannot be left blank");
				$("#PasswordInput").focus();
			}

		});

	}
}