Ext.application({
    name: "doli",
    views:['login.Login','diary.Dairy','mainpanel.HomeScreen',
           'mainpanel.picture.ImageGallery','mainpanel.picture.ImageListView','mainpanel.picture.popups.ImageDetailPopup',  // 'mainpanel.picture.GalleryCarousel',
           'mainpanel.notes.NoteListView','mainpanel.notes.Notes','doli.view.mainpanel.notes.popups.TakeNotePopup',
           'mainpanel.events.Events','mainpanel.events.FullCalender','mainpanel.events.CreateEvent',
           'signup.Signup',
           
          ],
    controllers:['Doli'],
    stores:['imagegallery.ImageGallery','doli.store.notes.Notes','events.Events'],
//    startupImage: {
//    	'320x460': 'resources/startup/splash.png',
//        '640x920': 'resources/startup/splash.png',
//        '640x1096': 'resources/startup/splash.png',
//        '768x1004': 'resources/startup/splash.png',
//        '748x1024': 'resources/startup/splash.png',
//        '1536x2008': 'resources/startup/splash.png',
//        '1496x2048': 'resources/startup/splash.png'
//    },
    launch: function () {
    	navigator.splashscreen.hide();
    	var loginscreen=Ext.create("doli.view.login.Login");
    	Ext.Viewport.add(loginscreen);
    	Ext.Viewport.setActiveItem(loginscreen);
    	
    }
}); 