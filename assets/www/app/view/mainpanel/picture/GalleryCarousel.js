Ext.define('doli.view.mainpanel.picture.GalleryCarousel', {
  extend: 'Ext.carousel.Carousel',
  xtype: 'gallerycarousel',
  requires: ['Ext.TitleBar'],
  config: {
    fullscreen: true,
    modal: true,
    images: [],
    html: '<div class="close-gallery"  data-action="close_carousel"></div>',
    cls: 'gallery-carousel',
    showAnimation: 'popIn',
    hideAnimation: 'popOut',
    indicator: false,
    listeners: {
      // Call image count checker for each image change
      activeitemchange: function (carousel, newPanel) {
        this.changeImageCount(newPanel);
      },
      tap:function(){
    	  this.hide();
      }
    }
  },

  initialize: function () {
    var me = this;

    // Create a bottom bar which will show the image count
    me.bottomBar = Ext.create('Ext.TitleBar', {
      xtype: 'titlebar',
      baseCls: Ext.baseCSSPrefix + 'infobar',
      name: 'info_bar',
      title: '',
      docked: 'bottom',
      cls: 'gallery-bottombar',
      items: [{
          xtype: 'button',
          align: 'left',
          iconCls: 'nav gallery-left',
          ui: 'plain',
          handler: function () {
            me.previous();
          }
        }, {
          xtype: 'button',
          align: 'right',
          iconCls: 'nav gallery-right',
          ui: 'plain',
          handler: function () {
            me.next();
          }
        }
      ]
    });

    // Add the images as separate containers in the carousel
    for (var i = 0; i < me.getImages().length; i++) {
   
      me.add({
        xtype: 'container',
        html: '<img class="gallery-item" src="' + Ext.get(me.getImages()[i]).getAttribute('data-fullimage') + '" />',
        index: i + 1
      });
    }

    me.add(me.bottomBar);
    me.callParent(arguments);
  },

  /**
   * Change image count at bottom bar
   */
  changeImageCount: function (activePanel) {
    var me = this;
    me.bottomBar.setTitle(activePanel.config.index + ' of ' + me.getImages().length);
  }
});