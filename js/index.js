	
	(function(){
		document.addEventListener("deviceready", function onDeviceReady(){
			var deviceId = device.uuid;
			alert(deviceId);
			localStorage.setItem("uuid", deviceId);
		}, false);
	})(); 
	
	var uuid =  localStorage.getItem("uuid");
	var server = "http://chat.v-id.net/Demo/";
	
	var time;
	var notificationId = 0;
	
	var notification = {
		start: function(){
			time = setInterval(notification.display , 1000);	
		},
		
		display: function(){
			alert('setInterval');
			notificationId++;
			document.getElementById('news').innerHTML = notificationId;
			
			var data = server.search();
			if(data){
				root.checkOff();
				data = data.split(';');
				document.getElementById('news').innerHTML = "Viagem: "+data[0]+"<br>";
				document.getElementById('news').innerHTML += "Efetivado: "+data[1]+"<br>";
				document.getElementById('news').innerHTML += "lat: "+data[2]+"<br>";
				document.getElementById('news').innerHTML += "lon: "+data[3]+"<br>";
			}
		},
		
		stop: function(){
			alert('clearInterval');
			clearInterval(time);			
		}
	}
	
	var server = {
		search: function(){
			$.ajax({	
				url: server + "VIDS/"+uuid+"/status/notice.txt",
				type: "POST",
				dataType: "text",
				success: function (data){
					alert('file found');
					return data;
				},
				error: function(){
					alert('file not found');
					return false;
				}
			});
		}
	}
		
	var root = {		
		load: function(){
			alert(uuid);
			if(localStorage.getItem("check_in") == 'true'){
				var status = "Ativado";
				var funcao = 'root.checkOff()';
				var classe = "notice-on";
				var btn = 'on';
			}
			else{
				var status = "Desativado";
				var funcao = 'root.checkOn()';
				var classe = "notice-off";
				var btn = 'off';
			}			
			
			var text = 'Ative para receber notificações';		
			build.text('p', 'text', text, 'window');			
			build.div('container', 'container', 'window');
			
			var status = build.text('h3', classe, status, 'container'); // ID: notice-status
				status.setAttribute('ID', 'notice-status');
				
			var checkbox = build.checkbox('checkbox', 'cbx', 'container');
				checkbox.setAttribute('style', 'display: none;');
			
			document.getElementById('checkbox').checked = localStorage.getItem("check_in");
			
			build.label('notice', 'lbl', '', 'container');
			document.getElementById('notice').setAttribute('for', 'checkbox');
			document.getElementById('notice').setAttribute('onClick', funcao);	
			build.div('div', btn, 'notice');
			
			build.div('news', 'news', 'window');
			alert('start');
		},
		
		checkOn: function(){
			alert(uuid);
			document.getElementById('div').className = '';
			document.getElementById('div').className = 'on';
			
			document.getElementById('notice-status').className = '';
			document.getElementById('notice-status').className = 'notice-on';
			document.getElementById('notice-status').innerHTML = 'Ativado';
			
			localStorage.setItem("check_in", 'true');
		
			document.getElementById('notice').setAttribute('onClick', 'root.checkOff()');
			
			notification.start();
		},
		
		checkOff: function(){
			document.getElementById('div').className = '';
			document.getElementById('div').className = 'off';
			
			document.getElementById('notice-status').className = '';
			document.getElementById('notice-status').className = 'notice-off';		
			document.getElementById('notice-status').innerHTML = 'Desativado';
			
			localStorage.setItem("check_in", 'false');
	
			document.getElementById('notice').setAttribute('onClick', 'root.checkOn()');
			notification.stop();
		},
	}
	
	root.load();