function UserObject()
{
	this.Index = "";
	this.Left = "";
	this.Top = "";
	this.Parent = "";
	this.Width = "";
	this.Height = "";
	this.Opacity = "";
	// this.DetailsJSON = {};
	// this.DoctorJSON = {};
	this.UserJSON = {};
	this.ParentObj = null;
	this.add = true;
	this.media = [];

	var Object = this;

	Object.ImageURL = 'https://mybookblob.blob.core.windows.net/mybookcontainer/e79dfcb2b5aaae4efa745bde09def19255e90899';

	this.Initialize = function(Index, Left , Top , Parent , Width , Height , Opacity, UserJSON, IsEditable, parent, add, media=[])
	{
		this.Index = Index;
		this.Left = Left;
		this.Top = Top;
		this.Parent = Parent;
		this.Width = Width;
		this.Height = Height;
		this.Opacity = Opacity;
		this.IsEditable = IsEditable;
		this.UserJSON = UserJSON;

		if (this.UserJSON.hasOwnProperty('imgUrl')) {

			Object.ImageURL = this.UserJSON['imgUrl'];

		}
		this.ParentObj = parent;
		this.add = add;

		this.media = media;

		this.Render();
	}

	this.Render = function()
	{
		Object.UserDiv = 
			"<div id='User_Div"+Object.Index+"' style='position: absolute; top: "+Object.Top+"%; left: "+Object.Left+"%; height: "+Object.Height+"%; width: "+Object.Width+"%; opacity: "+Object.Opacity+"; border: 0px solid #000000;background-color:#AFC9FA; border-radius: 50px 0px 50px 0px; overflow: hidden;box-shadow: 2px 2px 20px #333333;'></div>";

		$( "#"+Object.Parent+"" ).append(Object.UserDiv);

		Object.TitleText = "<div id='titletext"+Object.Index+"' style='color:blue;font-size:1.5em;font-family:Garamond;font-weight:bold;text-align:center;position: absolute; left:35%;top:2%;width:30%;height:7%;line-height:200%'>User Details</div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.TitleText);

		Object.Unique_ID_Text = "<div id='Unique_ID_text"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:11%;width:40%;height:7%;line-height:300%'>Unique ID :</div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.Unique_ID_Text);

		Object.UserNameText = "<div id='UserNametext"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:21%;width:40%;height:7%;line-height:300%'>Name :</div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.UserNameText);

		Object.PasswordText = "<div id='Passwordtext"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:31%;width:40%;height:7%;line-height:300%'>Password :</div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.PasswordText);

		Object.DepartmentText = "<div id='Departmenttext"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:41%;width:40%;height:7%;line-height:300%'>Department :</div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.DepartmentText);

		Object.Contact_Info_Text = "<div id='Contact_Info_text"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:51%;width:40%;height:7%;line-height:300%'>Contact Info :</div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.Contact_Info_Text);

		Object.TagsText = "<div id='Tagstext"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:61%;width:40%;height:7%;line-height:300%'>Tags (CSV) :</div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.TagsText);

		Object.CourseListText = "<div id='CourseListtext"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:71%;width:40%;height:7%;line-height:300%'>Courses List :</div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.CourseListText);

		Object.ComplaintListText = "<div id='ComplaintListtext"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:81%;width:40%;height:7%;line-height:300%'>Complaints List :</div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.ComplaintListText);

		// Object.MediaText = "<div id='MediaText"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:91%;width:40%;height:7%;line-height:300%'>Media :</div>";

		// $( "#User_Div"+Object.Index+"" ).append(Object.MediaText);

		//Input Text Boxes HERE

		Object.Unique_ID_Input = "<input type='text' id='Unique_ID_Input"+Object.Index+"' spellcheck='false' placeholder='Unique ID of User' required/>";

		$( "#User_Div"+Object.Index+"" ).append(Object.Unique_ID_Input);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#Unique_ID_Input"+Object.Index+"" ).attr("readonly", true);
			$( "#Unique_ID_Input"+Object.Index+"" ).attr("value", this.UserJSON.unique_id+"");
		}

		$( "#Unique_ID_Input"+Object.Index+"" ).css( {"position":"absolute","top":"11%","left":"30%", "width":"30%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"#FFFFFF","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.UserNameInput = "<input type='text' id='UserNameInput"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#User_Div"+Object.Index+"" ).append(Object.UserNameInput);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#UserNameInput"+Object.Index+"" ).attr("readonly", true);
			$( "#UserNameInput"+Object.Index+"" ).attr("value", this.UserJSON.name+"");
		}

		$( "#UserNameInput"+Object.Index+"" ).css( {"position":"absolute","top":"21%","left":"30%", "width":"30%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"#FFFFFF","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.PasswordInput = "<input type='text' id='PasswordInput"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#User_Div"+Object.Index+"" ).append(Object.PasswordInput);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#PasswordInput"+Object.Index+"" ).attr("readonly", true);
			$( "#PasswordInput"+Object.Index+"" ).attr("value", this.UserJSON.password+"");
		}

		$( "#PasswordInput"+Object.Index+"" ).css( {"position":"absolute","top":"31%","left":"30%", "width":"30%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"#FFFFFF","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.DepartmentInput = "<input type='text' id='DepartmentInput"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#User_Div"+Object.Index+"" ).append(Object.DepartmentInput);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#DepartmentInput"+Object.Index+"" ).attr("readonly", true);
			$( "#DepartmentInput"+Object.Index+"" ).attr("value", this.UserJSON.department+"");
		}

		$( "#DepartmentInput"+Object.Index+"" ).css( {"position":"absolute","top":"41%","left":"30%", "width":"30%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"#FFFFFF","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.Contact_Info_Input = "<input type='text' id='Contact_Info_Input"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#User_Div"+Object.Index+"" ).append(Object.Contact_Info_Input);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#Contact_Info_Input"+Object.Index+"" ).attr("readonly", true);
			$( "#Contact_Info_Input"+Object.Index+"" ).attr("value", this.UserJSON.contact_info+"");
		}

		$( "#Contact_Info_Input"+Object.Index+"" ).css( {"position":"absolute","top":"51%","left":"30%", "width":"30%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"#FFFFFF","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.TagsInput = "<input type='text' id='TagsInput"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#User_Div"+Object.Index+"" ).append(Object.TagsInput);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#TagsInput"+Object.Index+"" ).attr("readonly", true);
			$( "#TagsInput"+Object.Index+"" ).attr("value", this.UserJSON.tags.toString()+"");
		}

		$( "#TagsInput" +Object.Index+"").css( {"position":"absolute","top":"61%","left":"30%", "width":"30%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"#FFFFFF","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.Course_List_Input = "<input type='text' id='Course_List_Input"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#User_Div"+Object.Index+"" ).append(Object.Course_List_Input);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#Course_List_Input"+Object.Index+"" ).attr("readonly", true);
			$( "#Course_List_Input"+Object.Index+"" ).attr("value", this.UserJSON.course_list.toString()+"");
		}

		$( "#Course_List_Input" +Object.Index+"").css( {"position":"absolute","top":"71%","left":"30%", "width":"30%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"#FFFFFF","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.Complaint_List_Input = "<input type='text' id='Complaint_List_Input"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#User_Div"+Object.Index+"" ).append(Object.Complaint_List_Input);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#Complaint_List_Input"+Object.Index+"" ).attr("readonly", true);
			$( "#Complaint_List_Input"+Object.Index+"" ).attr("value", this.UserJSON.complaint_list.toString()+"");
		}

		$( "#Complaint_List_Input"+Object.Index+"" ).css( {"position":"absolute","top":"81%","left":"30%", "width":"30%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"#FFFFFF","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//
		Object.VideoURL = "";

		$.get(Object.ImageURL,
	    function(data, status){
	        console.log("Data: " + data + "\nStatus: " + status);

	        Object.Image = "<img id='Image"+Object.Index+"' src="+ Object.ImageURL +">";
	        $( "#User_Div"+Object.Index+"" ).append(Object.Image);
	        
		    $( "#Image" + Object.Index).attr("src",data);
			$( "#Image" + Object.Index).css({"visibility":"visible", "position":"absolute", "top":"20%", "left":"65%", "width":"30%", "height":"40%"});
		    
	    });


		// Object.Video = "<Video id='Video'>";
		// $( "#User_Div"+Object.Index+"" ).append(Object.Video);
		// $( "#Video"+Object.Index ).css({"visibility":"hidden", "position":"absolute", "left":"65%", "width":"30%", "height":"40%"});

		//

		Object.SaveButton = "<input type='button' id='SaveButton"+Object.Index+"' value='Save'/>";
		$( "#User_Div"+Object.Index+"" ).append(Object.SaveButton);

		if (!this.IsEditable)
			$( "#SaveButton"+Object.Index+"" ).attr("value", 'Edit');

		$( "#SaveButton"+Object.Index+"" ).css( {"position":"absolute","bottom":"2%","left":"40%","height":"7%","width":"20%","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","color":"#FFFFFF","font-size":"1em","border-radius":"5px", "box-shadow":"2px 2px 5px #000000"});

		//

		Object.CloseButton = "<input type='button' id='CloseButton"+Object.Index+"' value='Delete'/>";
		
		//

		Object.UploadFile = "<input type='file' id='UploadFile"+Object.Index+"'>";
		Object.UploadButton = "<input type='button' id='UploadButton"+Object.Index+"' value='Upload Media'/>";


		$( "#User_Div"+Object.Index+"" ).append(Object.UploadButton);
		$( "#User_Div"+Object.Index+"" ).append(Object.UploadFile);
		$( "#User_Div"+Object.Index+"" ).append(Object.CloseButton);
		$( "#UploadFile"+Object.Index ).css({"visibility":"hidden"});
		$( "#CloseButton"+Object.Index+"" ).css( {"position":"absolute","bottom":"2%","left":"60%","height":"7%","width":"20%","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","color":"#FFFFFF","font-size":"1em","border-radius":"5px", "box-shadow":"2px 2px 5px #000000"});
		$( "#UploadButton"+Object.Index+"" ).css( {"position":"absolute","bottom":"2%","left":"60%","height":"7%","width":"20%","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","color":"#FFFFFF","font-size":"1em","border-radius":"5px", "box-shadow":"2px 2px 5px #000000"});			

		if (Object.add == true) {
			$( "#CloseButton"+Object.Index+"" ).css({"visibility":"hidden"});
			$( "#UploadButton"+Object.Index+"" ).css({"visibility":"visible"});
		}

		if(!this.IsEditable)
		{
			$( "#SaveButton" +Object.Index+"").css( {"position":"absolute","bottom":"2%","left":"20%","height":"7%","width":"20%","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","color":"#FFFFFF","font-size":"1em","border-radius":"5px", "box-shadow":"2px 2px 5px #000000"});
	    }
		else
		{
			$( "#SaveButton"+Object.Index+"" ).css( {"position":"absolute","bottom":"2%","left":"20%","height":"7%","width":"20%","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","color":"#FFFFFF","font-size":"1em","border-radius":"5px", "box-shadow":"2px 2px 5px #000000"});
		}

		$( "#SaveButton"+Object.Index+"" ).on('mouseover',function(){ $( this ).css( {"background-color": "#0B197D","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#SaveButton" +Object.Index+"").on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#CloseButton"+Object.Index+"" ).on('mouseover',function(){ $( this ).css( {"background-color": "#0B197D","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#CloseButton"+Object.Index+"" ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });
        
        $( "#UploadButton" +Object.Index+"").on('mouseover',function(){ $( this ).css( {"background-color": "#0B197D","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
        $( "#UploadButton" +Object.Index+"").on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#SaveButton" +Object.Index+"").on('click',function()
		{
			var currentText = $("#SaveButton" +Object.Index+"").val();
			if (currentText == "Save")
			{

				$( "#CloseButton"+Object.Index+"" ).css({"visibility":"visible"});
				$( "#UploadButton"+Object.Index+"" ).css({"visibility":"hidden"});

				$("#Unique_ID_Input"+Object.Index+"").attr("readonly", true);
				$("#UserNameInput"+Object.Index+"").attr("readonly", true);
				$("#PasswordInput"+Object.Index+"").attr("readonly", true);
				$("#DepartmentInput"+Object.Index+"").attr("readonly", true);
				$("#Contact_Info_Input"+Object.Index+"").attr("readonly", true);
				$("#TagsInput"+Object.Index+"").attr("readonly", true);
				$("#Course_List_Input"+Object.Index+""+Object.Index+"").attr("readonly", true);
				$("#Complaint_List_Input"+Object.Index+"").attr("readonly", true);
				

				// Make the requisite API call to add a new user and do the subsequent action on response

				if (Object.add === true)
				{
					//Hide the close button
					$( "#CloseButton"+Object.Index+"" ).css({"visibility":"hidden"});
					$( "#UploadButton"+Object.Index+"" ).css({"visibility":"visible"});

					if ($("#Unique_ID_Input"+Object.Index+"").val() != "" && $("#UserNameInput"+Object.Index+"").val() != "" && $("#PasswordInput"+Object.Index+"").val() != "" &&
							$("#DepartmentInput"+Object.Index+"").val() != "" && $("#Contact_Info_Input"+Object.Index+"").val() != "")
					{
						$.post(server_url+"/add_user",
					    {
					        unique_id: $("#Unique_ID_Input"+Object.Index+"").val(),
					        name: $("#UserNameInput"+Object.Index+"").val(),
					        password: $("#PasswordInput"+Object.Index+"").val(),
					        department: $("#DepartmentInput"+Object.Index+"").val(),
					        contact_info: $("#Contact_Info_Input"+Object.Index+"").val(),
					        tags: $("#TagsInput"+Object.Index+"").val().split(","),
					        course_list: $("#Course_List_Input"+Object.Index+"").val().split(","),
					        complaint_list: $("#Complaint_List_Input"+Object.Index+"").val().split(","),
					        token: token,
					        imgUrl: Object.ImageURL
					    },
					    function(data, status){
					        console.log("Data: " + data + "\nStatus: " + status);

					        if (data.success === true)
					        {
						        alert("User added successfully");
						        $("#ListUsersButton").click();
						    }
						    else
						    	$("#SaveButton"+Object.Index+"").attr("value", 'Edit');
						    	alert("Could not add user to database");
						    	$("#SaveButton"+Object.Index+"").click();
					    });
					}
					else
					{
					 	$("#SaveButton"+Object.Index+"").attr("value", 'Edit');
						alert("Fields cannot be left blank!!");
					 	$("#SaveButton"+Object.Index+"").click();
					}
				}
				else
				{

					if ($("#Unique_ID_Input"+Object.Index+"").val() != "" && $("#UserNameInput"+Object.Index+"").val() != "" && $("#PasswordInput"+Object.Index+"").val() != "" &&
							$("#DepartmentInput"+Object.Index+"").val() != "" && $("#Contact_Info_Input"+Object.Index+"").val() != "")
					{
						$.post(server_url+"/update_user_details",
					    {
					        unique_id: $("#Unique_ID_Input"+Object.Index+"").val(),
					        name: $("#UserNameInput"+Object.Index+"").val(),
					        password: $("#PasswordInput"+Object.Index+"").val(),
					        department: $("#DepartmentInput"+Object.Index+"").val(),
					        contact_info: $("#Contact_Info_Input"+Object.Index+"").val(),
					        tags: $("#TagsInput"+Object.Index+"").val().split(","),
					        course_list: $("#Course_List_Input"+Object.Index+"").val().split(","),
					        complaint_list: $("#Complaint_List_Input"+Object.Index+"").val().split(","),
					        token: token,
					        imgUrl: Object.ImageURL
					    },
					    function(data, status){
					        console.log("Data: " + data + "\nStatus: " + status);

					        if (data.success === true)
					        {
					        	alert("User updated successfully");
					        	$("#SaveButton"+Object.Index+"").attr("value", 'Edit');
						        $("#ListUsersButton").click();
						    }
						    else
						    	alert("Could not update user details");
					    });
					}
					else
					{
						alert("Fields cannot be left blank!!");
					}
				}


			}
			else
			{
				$( "#CloseButton"+Object.Index+"" ).css({"visibility":"hidden"});
				$( "#UploadButton"+Object.Index+"" ).css({"visibility":"visible"});

				$("#Unique_ID_Input"+Object.Index+"").attr("readonly", false);
				$("#UserNameInput"+Object.Index+"").attr("readonly", false);
				$("#PasswordInput"+Object.Index+"").attr("readonly", false);
				$("#DepartmentInput"+Object.Index+"").attr("readonly", false);
				$("#Contact_Info_Input"+Object.Index+"").attr("readonly", false);
				$("#TagsInput"+Object.Index+"").attr("readonly", false);
				$("#Course_List_Input"+Object.Index+""+Object.Index+"").attr("readonly", false);
				$("#Complaint_List_Input"+Object.Index+"").attr("readonly", false);
				
				$("#SaveButton"+Object.Index+"").attr("value", 'Save')
			}

		});

		$( "#CloseButton"+Object.Index+"" ).on('click',function()
		{
			$.post(server_url+"/delete_user",
		    {
		        unique_id: $("#Unique_ID_Input"+Object.Index+"").val(),
		        token: token
		    },
		    function(data, status){
		        console.log("Data: " + data + "\nStatus: " + status);

		        if (data.success === true)
		        {
			        alert("User deleted successfully");
			        $("#ListUsersButton").click();
			    }
			    else
			    	alert("Could not delete user from database");
		    });
		});

		function encodeImageFileAsURL(element) {
		  var file = element.files[0];
		  var reader = new FileReader();
		  reader.onloadend = function() {
		    $.post(server_url+"/upload",
		    {
		        content: reader.result
		        // path: $( "#UploadFile" +Object.Index+"").val()
		        // path: element.files[0]
		    },
		    function(data, status){
		        console.log("Data: " + data + "\nStatus: " + status);
		        Object.ImageURL = data.url
		        $.get(data.url,
			    function(data, status){
			        console.log("Data: " + data + "\nStatus: " + status);

				    $( "#Image" + Object.Index).attr("src",data);
				    
			    });

		    });
		  }
		  reader.readAsDataURL(file);
		}

		$( "#UploadFile" +Object.Index+"").on('change',function(){
			var elt = document.getElementById("UploadFile"+Object.Index+"");
			encodeImageFileAsURL(elt);
		});

		$( "#UploadButton" +Object.Index+"").on('click',function()
		{
			$( "#UploadFile"+Object.Index ).click()
		});
	}
}
