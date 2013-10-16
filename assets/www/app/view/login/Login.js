/*
 *         Author : Madhusudhan Mahale
 *         email  : mahale.labs@gmail.com
 *         Copyright : Doli Diaries 2013
 * 
 * 
 */
Ext.define("doli.view.login.Login",{
	extend : 'Ext.Panel',
	alias : 'widget.loginscreen',
	xtype:'loginscreen',
	requires:['Ext.Video'],
	config : {
		cls : 'login',
		items : [
				{
					xtype : 'panel',
					cls : 'loginscreen_imagelabel',
					items:[{
						xtype : 'video',
						itemId : 'loginscreen_imagelabel',
						
						//fullscreen:true,
						url:['app/resources/video/promo.mp4'],
						posterUrl:['app/resources/img/doli.png'],
						//html : '<div ><center><img class="loginscreen_imagelabel_img" src="app/resources/img/doli.png" ></img></center><div>' //

					}]
					
				},

				{
					xtype : 'panel',
					cls : 'loginscreen_panel',
					items : [ {
						xtype : 'textfield',
						itemId : 'loginscreen_name',
						placeHolder : 'Username / email ',
						cls : 'loginscreen_name',
						name : 'name',
						listeners:{
							activate:function(self,eOpts){
								self.setValue(DoliUtils.getCurrentUser());
							}
						}
						//value:DoliUtils.getCurrentUser(),

					}, {
						xtype : 'spacer',
						cls : 'midspacer'
					}, {
						xtype : 'passwordfield',
						name : 'password',
						cls : 'loginscreen_password',
						itemId : 'loginscreen_password',
						placeHolder : 'Password',
						//value:'password'
						

					}, {
						xtype : 'button',
						text : 'Login',
						ui  : 'confirm',
						cls : 'loginscreen_loginbtn',
						itemId : 'loginscreen_loginbtn',
						

					},

					{
						xtype : 'button',
						//text : 'Facebook-Login',
						cls : 'loginscreen_facebookbtn',
						hidden : true,
						//html: '<img class="loginscreen_facebookbtn_img" src="img/fb_login_icon.png"/>',
						itemId : 'loginscreen_facebookbtn',
						handler:function(){
	
							FBUtils.login();
						}

					}, {
						xtype : 'button',
						text : 'Sign-Up',
						cls : 'loginscreen_signup',
						//html: '<img class="loginscreen_facebookbtn_img" src="img/fb_login_icon.png"/>',
						itemId : 'loginscreen_signup',

					},
					
					{
						xtype:'label',
						html:'<div class="version_tag"><center> &copy; 2013 Doli Diaries , Beta v 0.1</center></div>'
					}
					
					],
				}

		],
	},

				});// define
