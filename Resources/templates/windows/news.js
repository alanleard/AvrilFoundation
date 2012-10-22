var render = function() {
  var topBanner = nrequire('/templates/views/top_banner'), 
      Controller = nrequire('/templates/controllers/news'), 
      BorderShadows = nrequire('/ui/border_shadows'),
 	 Repo = nrequire('/lib/repo');
 		
 

  
  var self = {
        win: UI.createWindow({
          navBarHidden: true,
          backgroundImage: '/images/backgrounds/main_bg.png',
          backgroundRepeat: true
        }),

        donate_banner: topBanner.render().view,

        shadow: BorderShadows({
          top: 185
        }).view,

        table: UI.createTableView({
          top: 215,
          backgroundColor: 'transparent',
          style_id: 'list_table'
        }),
        
        toggle: UI.createView({
  			width:'100%',
		  	top:185,
		  	height:30,
		  	layout:'horizontal',
		  	backgroundColor:'transparent',
		  }),
		  foundationFeed : Ti.UI.createLabel({
		  	width: 160,
		  	height:30,
		  	text:'Foundation Feeds',
		  	textAlign:'center',
		  	color:'white',
		  	backgroundColor:'purple'
		  }),
		  
		  avrilFeed : Ti.UI.createLabel({
		  	width: 160,
		  	height:30,
		  	text:'Avril\'s Feeds',
		  	textAlign:'center',
		  	color:'white',
		  	backgroundColor:'#FF00FF'
		  })
   };

  
  

 
  
  
  self.toggle.add(self.foundationFeed);
  self.toggle.add(self.avrilFeed);
  
  
  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  self.win.add(self.table);
  self.win.add(self.toggle);

  Controller(self);
  return self;
};

module.exports = {render: render};
