


exports.getPlaylist = function(args){
	
Ti.API.info("connecting youtube server...")

	var args = args || {};
	
	var callback = args.callback;

	// data container for table
	var data = [];
	
	var xhr = Ti.Network.createHTTPClient();
	
	var author = 'TheAvrilLavigneFDN';
	var order  = 'published';
	
	//documentation: http://code.google.com/intl/es/apis/youtube/reference.html
	
	var channelUrl = "http://gdata.youtube.com/feeds/api/videos?author=" + author + "&format=6&orderby=" + order;
	
	xhr.open("GET", channelUrl);
	Ti.API.info('ChannelUrl: ' + channelUrl)
	
	xhr.onload = function()	{
		
		data = [];
		
	    try {
	        var doc = this.responseXML.documentElement;
	        
	        var items = doc.getElementsByTagName("entry");

			var thumnails, item, media, title, row, label, img;
			
	        for (var i = 0, j = items.length; i < j; i++){
	            item = items.item(i);
	            thumbnails = item.getElementsByTagName("media:thumbnail");
	            if (thumbnails && thumbnails.length > 0) {
	                title = item.getElementsByTagName("title").item(0).text;
	                media = thumbnails.item(0).getAttribute("url");
	                url = item.getElementsByTagName("link").item(0).getAttribute('href');		                
	            }
	            data.push({
	            	title:title,
	            	image:media,
	            	url:url
	            });
	        }
			
			if(callback) callback({data:data});
			
	    } catch(err) {
	        //Sometimes youtube query fails. In that case, we offer the user to retry load
	        callback({error:err});
	    }
	};
	
	xhr.onerror = function() {
		Ti.API.info('YouTubeQuery.js:: error on exh query');
	};
	
	xhr.send();	
};

