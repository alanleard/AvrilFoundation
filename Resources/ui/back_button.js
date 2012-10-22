module.exports = function(win, props) {  
  var btn = UI.createButton(_.extend({
  		title: "back",
        backgroundImage: '/images/buttons/big_back.png',
        backgroundSelectedImage: '/images/buttons/big_back_p.png',
        height: 36,
        width: 320,
        zIndex: 25,
        top: 184
      }, (props || {})));
  
  if(!isAndroid) {
    btn.addEventListener('click', function() {
      win.close();
    });
  }
  
  return btn;
};
