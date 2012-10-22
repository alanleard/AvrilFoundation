

var data = [
	{url:'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JFA2E3QYGTXXG', title: '$5 will help us purchase guitar picks for kids', amount:'$5'},
    {url:'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=H8ZU38G2ZRZGS', title: '$10 will help us create one cd for the Rockstar Project', amount:'$10'},
    {url:'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LN4SXQAZZNMA6', title: '$25 will help support one day of fun at a Rockstar Club', amount:'$25'},
    {url:'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZHSUDCXY3SSEW', title: '$50 will help buy a toy keyboard for a kid', amount:'$50'},
    {url:'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GS7VGZ7A3MNGG', title: '$100 will help buy supplies for a Rockstar Party!', amount:'$100'},
    {url:'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4F2VDK7F9T28E', title: '$250 will help send a treasure trunk of fun items to kids with serious illnesses or disabilities', amount:'$250'},
    {url:'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HE8V4XKNBWRXY', title: '$500 will help support a one-on-one music therapy session for a sick kid', amount:'$500'},
    {url:'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FYS4ZHPMYWE96', title: '$1,000 will help a sick kid write, record, and create their own unique song!', amount:'$1000'}
 ]

module.exports = function(){

    var win = Titanium.UI.createWindow({ 
        backgroundImage: '/images/backgrounds/main_bg.png',
        title: 'Donate!',
        barColor:'#333',
        backgroundColor:'#666'
    });
	
	var btnClose = Ti.UI.createButton({
		title:'Close'
	});
	
	btnClose.addEventListener('click', function(){
		win.close();
	});
	
	win.rightNavButton = btnClose;
	
	var rows = [];
	
	for (var i = 0, j= data.length; i< j; i++){
		rows.push(new Row(data[i]));
	}
	
	var tableview = Ti.UI.createTableView({
		data:rows,
		backgroundColor:'transparent',
		separatorColor:'transparent'
	});
	
	tableview.addEventListener('click', function(e){
		if(e.row){
			var data = e.row.data;
			
			if(data.url){
				Ti.Platform.openURL(data.url);
			}
		}
	});
	
	win.add(tableview);
	
	return win;

}


function Row(item){
	
	var row = Ti.UI.createTableViewRow({
		height:Ti.UI.SIZE,
		data: item
	});
	
	var bgView = Ti.UI.createView({
		top:10,
		height:Ti.UI.SIZE,
		right:20,
		left:20,
		backgroundColor:'#fff',
		borderColor:'#eed',
		borderWidth:5
	});
	
	var title = Ti.UI.createLabel({
		top:5,
		left:15, right:15,
		height:Ti.UI.SIZE,
		text: '\n' + item.title+'\n ',
		font:{fontSize:'14dp', fontWeight:'bold'},
		textAlign:'center'
	});
	
	bgView.add(title);
	row.add(bgView);
	
	
	
	
	return row;
	
}
