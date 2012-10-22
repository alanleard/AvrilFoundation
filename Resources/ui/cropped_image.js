module.exports = function(props) {
  var view = Ti.UI.createView(props),
    
      click_blocker = Ti.UI.createView(props),
  
      scroller = Ti.UI.createScrollView({
        showHorizontalScrollIndicator:false,
        showVerticalScrollIndicator:false
      }),
      
      image = Ti.UI.createImageView({
        image: props.image,
        index: props.index
      });
	
	view.left = 5;
	view.top = 5;
	// view.backgroundImage = '/images/shadow/screen_tablet_shadow_full.png';
	view.backgroundColor = '#fff';
	
	var border = Ti.UI.createView({
		borderWidth:5,
		borderColor:'#fff',
		zIndex:99,
		touchEnabled:false
      });
	
  if(isAndroid) {
    image.width = props.width;
    image.height = props.height;
  }

  scroller.add(image);
  view.add(scroller);
  view.add(click_blocker);
  view.image = image;
  view.add(border);

  return view;
};
