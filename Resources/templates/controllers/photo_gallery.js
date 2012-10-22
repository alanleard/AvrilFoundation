module.exports = function(view) {
  var Slideshow = nrequire('/templates/windows/slideshow'),
      Grid = nrequire('/ui/grid'),
      Repo = nrequire('/lib/repo'),
      PropertyCache = nrequire('/lib/property_cache'),
      Confirm = nrequire('/ui/confirm');
  
  var slideshow_urls = [],
      squares = [],
      local_photos = [],
      
      openSlideShow = function(e) {
      	
        if(e.source.index === 'undefined' || e.source.index === null) return;
        var slideshow = Slideshow.render(slideshow_urls, e.source.index);
        Application.photos.open(slideshow.win);
      },
      
      clearImagePropertiesForAndroidMemory = function() {
        squares.map(function(s){
          if(s.view) { s.view.image = null; }
        });
      },
      
      resetGrid = function() {
        if(!view.photo_grid) { return; }
        if(isAndroid) { clearImagePropertiesForAndroidMemory(); }
        view.win.remove(view.photo_grid);
        view.win.remove(view.scrollable);
        squares = null;
        view.photo_grid = null;
        view.scrollable = null;
      },
      
      storeState = function(cloud_photos) {
        local_photos = cloud_photos;
        slideshow_urls = cloud_photos.map(function(p){ return p.urls.large_1024; });
      },
      
      makeGrid = function(cloud_photos) {
      	
        squares = cloud_photos.map(view.makeImageViewFromCloudPhoto);

        // view.photo_grid = Grid({top: 0},
                               // {left_padding: 10, top_padding: 10},
                               // squares.concat(view.photo_upload_btn));

        view.photo_grid = Grid({top: 0},
                               {left_padding: 10, top_padding: 10},
                               squares);

		
		  var scrollable = Ti.UI.createScrollableView({
		  	top:185+30,
		  	views:[view.photo_grid, view.video_view],
		  	showPagingControl:false,
		  	backgroundImage:'/images/gallery_background.png'
		  });
		  
		  var tabbed = new CustomTabbedBar();
		  
		  tabbed.addEventListener('change', function(e){
		  		scrollable.scrollToView(e.index);
		  });
		  
		  view.win.add(tabbed);
		  
		scrollable.addEventListener('scroll', function(e) {
			tabbed.SetSelected(e.currentPage);
		});
		
		view.scrollable = scrollable;

        view.win.add(scrollable);
        view.photo_grid.addEventListener('click', openSlideShow);
      },

      populateView = function(cloud_photos) {
        Ti.App.fireEvent('show_activity');
        resetGrid();
        storeState(cloud_photos);
        makeGrid(cloud_photos);
        Ti.App.fireEvent('hide_activity');
      },
      
      makeLocalPhotoLookLikeCloudPhotoBecauseItIsntProcessedYet = function(photo) {
        return {urls: {small_240: photo, medium_640: photo, large_1024: photo }};
      },
  
      addPhotoAndRefresh = function(photo) {
        var photo_adapter = makeLocalPhotoLookLikeCloudPhotoBecauseItIsntProcessedYet(photo);
        local_photos.push(photo_adapter);
        populateView(local_photos);
      },

      uploadPhotoToACS = function(camera_event) {
        Repo.uploadPhoto(camera_event.media, function(e){
          addPhotoAndRefresh(camera_event.media);
        });
      },
      
      hasntRenderedPage = function() {
        return slideshow_urls.length === 0;
      },

      populatePage = function() {
        if(Repo.cacheHasExpired('cloud_photos') || hasntRenderedPage()) {
          Repo.getPhotos(populateView);
        }
      },

      showCamera = function(e) {
        Ti.Media.showCamera({
          success: uploadPhotoToACS, 
          error: function() {
            alert('Could not show camera.');
          }
        });
      },

      showGallery = function(e) {
        Ti.Media.openPhotoGallery({
          success: uploadPhotoToACS,
          error: function() {
            alert('Could not show photo picker gallery.');
          }
        });
      };

  view.photo_upload_btn.addEventListener('click', function(e) {
    view.confirmation = Confirm('Add a photo', [{name: 'Take a photo', callback: showCamera }, {name: 'Choose a photo', callback: showGallery}]);
  });

  view.win.addEventListener('focus', populatePage);
};

function CustomTabbedBar(){
	
	var h = 30;
	
	var colorSelected = '#c1018d',
		colorUnselected = '#ff60d4',
		buttonFont = {fontSize:16};
	
	var view = Ti.UI.createView({
		height:h,
		zIndex:99,
		top:185
	});
	
	var btn1 = Ti.UI.createLabel({
		width:'50%',
		text:'Photos',
		textAlign:'center',
		color:'#fff',
		font:buttonFont,
		left:0,
		height:h,
		backgroundColor:colorSelected
	});
	var btn2 = Ti.UI.createLabel({
		width:'50%',
		text:'Videos',
		textAlign:'center',
		color:'#fff',
		font:buttonFont,
		right:0,
		height:h,
		backgroundColor:colorUnselected
	});
	
	view.add(btn1);
	view.add(btn2);
	
	btn1.addEventListener('click', function(){
		setSelected(0);
		view.fireEvent('change', {index:0});
	});
	
	btn2.addEventListener('click', function(){
		setSelected(1);
		view.fireEvent('change', {index:1});
	});
	
	view.SetSelected = function(index){
		setSelected(index);
	}
	
	function setSelected(index){
		if(index === 0 ){
			btn1.backgroundColor = colorSelected;
			btn2.backgroundColor = colorUnselected;
		}else{
			btn2.backgroundColor = colorSelected;
			btn1.backgroundColor = colorUnselected;
		}
	}
	
	return view;
	
	
}


