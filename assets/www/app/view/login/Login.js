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
	config : {
		cls : 'login',
		items : [
				{
					xtype : 'label',
					itemId : 'loginscreen_imagelabel',
					cls : 'loginscreen_imagelabel',
					html : '<div ><center><img class="loginscreen_imagelabel_img" src="app/resources/img/doli.png" ></img></center><div>' //

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
						//value:'testusermm21'

					}, {
						xtype : 'spacer',
						cls : 'midspacer'
					}, {
						xtype : 'passwordfield',
						name : 'password',
						cls : 'loginscreen_password',
						itemId : 'loginscreen_password',
						placeHolder : 'Password',
						//value:'testusermm21'

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
						//html: '<img class="loginscreen_facebookbtn_img" src="img/fb_login_icon.png"/>',
						itemId : 'loginscreen_facebookbtn',

					}, {
						xtype : 'button',
						text : 'Sign-Up',
						cls : 'loginscreen_signup',
						//html: '<img class="loginscreen_facebookbtn_img" src="img/fb_login_icon.png"/>',
						itemId : 'loginscreen_signup',

					}, ],
				}

		],
	},

				});// define