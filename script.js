 var socket = io();
 
 var ext=['jpeg','jpg','png','gif','bmp'];
 var nicks;
 var username="";

 
$('#file1').on('change', function(e){
	var file = e.originalEvent.target.files[0],
	fullPath=$('#file1').val();
	var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
	var filename = fullPath.substring(startIndex);
	if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
		filename = filename.substring(1);
	}
	filename=filename.split('.').pop();
	 var d=new Date();
 var min,hr;
	hr=d.getHours();
	min=d.getMinutes();
	if (hr <10)
		hr="0"+hr;
	if(min<10)
		min="0"+min;
	if(ext.indexOf(filename.toLowerCase())!=-1){
		reader = new FileReader();
		reader.onload = function(evt){
			socket.emit('user image', evt.target.result,username);
			$('#messages').append('<div class="nick_name">You</div><div class="time1">'+hr+ ' : '+min+'</div><div><img class="image2" src="' + evt.target.result + '"/></div>');
			$("#messages").animate({ scrollTop: $("#messages")[0].scrollHeight}, 1000);
		};
		reader.readAsDataURL(file); 
		
		$('#file1').val('');	
	}
	else{
		$('#alert_outer').show();
		$('#alert_text').html('Please try again. Make sure you are uploading a valid photo.');
		$('#file1').val('');	
	}
});

function get_nicks(){
	socket.emit('get nicks',1);
}


function close_alert(ids){
	if(ids=="prompt_outer"){
		if($('#nick_box').val().length>=4){
			if(nicks.indexOf($('#nick_box').val())!=-1){
				$('#prompt_text').html('Username is already taken.');
			}
			else{
				socket.emit('new nick',$('#nick_box').val(),username);
				username=$('#nick_box').val();
				$('#'+ids).hide();
			}
		}
		else{
			$('#prompt_text').html('Username is too short, select a longer one.');
		}
	}
	else{
		$('#'+ids).hide();
	}
}

$('form').submit(function(){
 var d=new Date();
 var min,hr;
	hr=d.getHours();
	min=d.getMinutes();
	if (hr <10)
		hr="0"+hr;
	if(min<10)
		min="0"+min;
	if($('#m').val().length!=0){
        socket.emit('chat message', $('#m').val(),username);
		$('#messages').append('<div class="text_msg1"><span class="nick_name_text1">You</span><div class="line"></div>'+$('#m').val()+'<span class="time">'+hr+ ' : '+min+'</span></div>');
		$("#messages").animate({ scrollTop: $("#messages")[0].scrollHeight}, 1000);
        $('#m').val('');
		$('#send1').hide();
		$('#file_btn').show();
	}
	return false;
});

function upload_file(){
	$('#file1').click();
}

$('#m').keyup(function(){
	if($('#m').val().length!=0){
		$('#file_btn').hide();
		$('#send1').show();
	}
	
	else{
		$('#send1').hide();
		$('#file_btn').show();
	}
});

socket.on('chat message', function(msg,nick){
 var d=new Date();
 var min,hr;
	hr=d.getHours();
	min=d.getMinutes();
	if (hr <10)
		hr="0"+hr;
	if(min<10)
		min="0"+min;
	$('#messages').append('<div class="text_msg"><span class="nick_name_text">'+nick+'</span><div class="line"></div>'+msg+'<span class="time">'+hr+ ' : '+min+'</span></div>');
	$("#messages").animate({ scrollTop: $("#messages")[0].scrollHeight}, 1000);
});

socket.on('get nicks', function(msg){
	nicks=JSON.parse(msg);
});

socket.on('user image', function (base64Image,nick) {
 var d=new Date();
 var min,hr;
	hr=d.getHours();
	min=d.getMinutes();
	if (hr <10)
		hr="0"+hr;
	if(min<10)
		min="0"+min;
	$('#messages').append('<div class="nick_name">' + nick + '</div><div class="time1">'+hr+ ' : '+min+'</div><div><img class="image1" src="' + base64Image + '"/></div>');
	$("#messages").animate({ scrollTop: $("#messages")[0].scrollHeight}, 1000);
});
	  