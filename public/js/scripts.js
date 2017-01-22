/*Client side script*/

var socket = io();

//funtional elements
var form = $('#chatForm');
var chatName = $('#chat_name').val();
var button = $('#submitButton');
var input = $('#chatInput');
var messageBox = $('#messages-container');

//submit button is clicked
form.submit(function(a){
	// e.preventDefault();
	var time = new Date()
	var timeToString = time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
	var data = {
		name: chatName,
		message: input.val(),
		time: timeToString
	};
	socket.emit('send message', data);
	input.val('');

	return false;
});


//new message is comming
var divs = 0; //to assign specific numbers to divs
socket.on('new message', function(data){
	//formatting the display
	messageBox.append(  "<div class='well'>	<div id='chat-head'><div id='chat-name' class='col-xs-6'>"+data.name+"</div><div id='chat-time' class='col-xs-6'>"+data.time+"</div></div> <p class='chat-list'>"+data.message+"</p></div>" );

	scrollToBottom();
	console.log(data);
});

$(document).ready(function(){
    scrollToBottom();
});
//scroll function
function scrollToBottom(){
    var el = document.getElementById("messages-container");
    el.scrollTop = el.scrollHeight;
}