

var	YouTubeQuery = require('/templates/controllers/YouTubeQuery');

var MAX_VIDEOS = 25;

// var TEST_FEED = 'https://gdata.youtube.com/feeds/api/playlists/734F6C7C9BA755E4?v=2';

var TEST_FEED = 'http://gdata.youtube.com/feeds/api/videos?author=shawellnessclinic1&format=6';

var VideoRow = function(args) {
		
	var args = args || {};
	
    var row = Ti.UI.createTableViewRow({
		height:160,
		className:'videoRow',
		layout:'vertical',
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.GRAY
   });
    
    var label = Ti.UI.createLabel({
        top:5,
        textAlign:'center',
        color:'#333',
		shadowColor:'#fff',
		left:20, right:20,
		shadowOffset:{x:0,y:1},
        font: {
			fontSize:'16dp', 
			fontFamily:'chalkduster'
		},           
   		text:args.title
   	});
    
    var img = Ti.UI.createImageView({
        top:10,
        width:120,height:90,
   		image: args.image
   	});
    
   
    row.add(img);
    row.add(label);
    
    row.url = args.url;
    row.youTubeTitle = args.title;
    
    return row;
};

module.exports =  function(args){
	
	var _view = Ti.UI.createView(args);
	
	var _tableView = Titanium.UI.createTableView({
		width:Ti.UI.FILL, height:Ti.UI.FILL,
		separatorColor:'transparent',
		backgroundColor:'eee',
		border:10,
		bottom:30
	});
	
	var actInd = Ti.UI.createActivityIndicator({
		top:0, left:0, right:0, bottom:0
	});
	
	_view.add(_tableView);
	_view.add(actInd);
	
	actInd.show();
	
	//callback function called from youTube connection model
	function updateVideoList(response) {
		
		Ti.API.info('response received: ' + JSON.stringify(response));
		
    	if(response.error){
    		errorList();
    		return;
    	}
		
		var data = response.data || [];
		var rows = [];

	    try {
	        for (var i = 0, j = data.length; i < j && i < MAX_VIDEOS; i++) {
                rows.push(new VideoRow(data[i]));
	        }
	        _tableView.data = rows;
			
	        _tableView.addEventListener('click',function(e) {
				openVideo({url: e.row.url, title:e.row.youTubeTitle});
				
	        });

	        actInd.hide();
	        
	    } catch(err) {
	    	Ti.API.info('err; ' + JSON.stringify(err));
			errorList();
	        actInd.hide();
	    }
	};
	
	function errorList(){
        //Sometimes youtube query fails. In that case, we offer the user to retry load
        var rows = [{title:''},{title:'Refresh list...', color:'#fff'}];
        _tableView.data = rows;
		
		if(Ti.Network.online){
	        _tableView.addEventListener('click',function(e) {
				YouTubeQuery.getPlaylist({
					url:'',
					callback:updateVideoList
				});
	        });
	    }else{
	    	alert('No network available');
	    }
	}
	
	// auto initialize
	
	// setTimeout(function(){
		// YouTubeQuery.getPlaylist({
			// url: TEST_FEED,
			// callback:updateVideoList
		// });		
	// }, 500);
	
	_view.loadPlayList = function(playlistFeed){
		
		_tableView.data = [];
		
		actInd.show();
		
		YouTubeQuery.getPlaylist({
			callback:updateVideoList
		});
	}
	
	_view.loadPlayList();
	
	Ti.API.info('HERE IS OK')
	
	return _view;	
};



function openVideo(args) {

    var modal = Titanium.UI.createWindow({ 
        backgroundColor:'#333',     
        title: args.title,
        barColor:'#333'
    });

    var actInd = Ti.UI.createActivityIndicator();
    modal.add(actInd);
    actInd.show();

    var btn = Ti.UI.createButton({
    	title:L('close')
    });
    btn.addEventListener('click', function() {
    	modal.close();
    });		    
    modal.rightNavButton=btn;
	
	var webViewer = Ti.UI.createWebView({
		url: args.url,
		top:0, left:0, right:0,	bottom:0
	});
	modal.add(webViewer);

    modal.open({
		modal: true,
		modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
		modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_CURRENT_CONTEXT
	});	
	
	webViewer.addEventListener('load', function(){
		actInd.hide();
	});
}

