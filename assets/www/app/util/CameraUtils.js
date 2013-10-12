Ext.define("doli.util.CameraUtils",{
	singleton: true,
	alternateClassName: 'CameraUtils',
	doliController:null,
	getPicture:function(){
	
		
		navigator.camera.getPicture(CameraUtils.cameraSuccess, CameraUtils.cameraError, 
				{ 
				  quality: 70,
		          targetWidth: 800,
		          targetHeight: 600,
		          destinationType: Camera.DestinationType.FILE_URI ,
		          saveToPhotoAlbum : true,
		         }
		
		
		
		);
	},
	getProfilePic:function(){
		DoliUtils.mixpanelTrack("Profile Edit")
		navigator.camera.getPicture(CameraUtils.profilePicSuccess, CameraUtils.profilePicError, 
				{ 
				  quality: 70,
		          targetWidth: 800,
		          targetHeight: 600,
		          destinationType: Camera.DestinationType.FILE_URI ,
		          saveToPhotoAlbum : true,
		         }
		
		
		
		);
	},
	profilePicSuccess:function(imageData){
		DoliUtils.mixpanelTrack("Profile Photo Captured ")
		//alert(imageData)
		localStorage.setItem("userpic",imageData);
		document.getElementById("user_label_img").src=localStorage.getItem("userpic");
	},
	profilePicError:function(message){
		Ext.Msg.alert("Error"+message)
		
	},
	cameraSuccess:function(imageData){
		try{
			 var comment=prompt("Add a comment to this pic");
			 if (comment === null){
				 comment="No Comments Given";
			 }
			DoliUtils.mixpanelTrack("Photo Captured ")
		    // imageData : Gives back the file location of the image
		    var imageRecord =new Object();
		    imageRecord.comment=comment;
			//imageRecord.imageurl="data:image/jpeg;base64,"+imageData;
			imageRecord.imageurl= DoliUtils.mapSpecialChars(imageData);
			var date=new Date();
			imageRecord.date= DoliUtils.mapSpecialChars(date.toString().substring(0,15));
			imageRecord.dateInt=date.getTime();
			CameraUtils.saveInDB(imageRecord.imageurl, imageRecord.comment,imageRecord.date,imageRecord.dateInt);
			Ext.ComponentQuery.query("imagelistview")[0].destroy();
			Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].removeAll(true,true);
   		    Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].add({xtype:'imagegallery'})
   		    //alert(imageRecord.imageurl)
		} catch (e) {
			alert("cameraSuccess-Error"+e.message)
			DoliUtils.mixpanelTrack("Photo Captured cancelled ")
		}
		
	},
	cameraError:function(message){
		Ext.Msg.alert("Error"+message)
		
	},
	
	saveInDB:function(imageurl,comment,date,dateInt){
		DBUtils.setImageGalleryData(imageurl,comment,date,dateInt,CameraUtils.retriveData);
	},
	
	retriveData:function(data){
		DBUtils.getCameraGalleryData(CameraUtils.updateImageStore);
	},
	updateImageStore:function(dataarray){
		try {
			var store=Ext.getStore("store_imagegallery");
			if(dataarray.length == 0){
				 store.setData(null);
			} else {
				store.setData(dataarray);
			}
			DoliUtils.removeLoadingMask();
		} catch (e) {
			// TODO: handle exception
		}
		
	}
	
});





