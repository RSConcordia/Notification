	
	(function(){
		document.addEventListener("deviceready", function onDeviceReady(){
			var deviceId = device.uuid;
			document.getElementById('status').innerHTML = deviceId;
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
			document.getElementById('status').innerHTML = 'setInterval';
			notificationId++;
			document.getElementById('news').innerHTML = notificationId;
			
			document.getElementById('uuid').innerHTML = uuid;			
			var data = server.search();
			document.getElementById('status').innerHTML = data;
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
			document.getElementById('status').innerHTML = 'clearInterval';
			clearInterval(time);			
		}
	}
	
	var server = {
		search: function(){
			try{
				document.getElementById('status').innerHTML = 'Search server';
				document.getElementById('uuid').innerHTML = uuid;
				$.ajax({	
					url: server + "VIDS/"+uuid+"/status/notice.txt",
					type: "POST",
					dataType: "text",
					success: function (data){
						document.getElementById('status').innerHTML = 'File found';
						alert('File found');
						return data;
					},
					error: function(){
						document.getElementById('status').innerHTML = 'File not found';
						alert('File not found');
						return false;
					}
				});
			}
			catch(err){
				root.checkOff();
				alert(err.message);
				document.getElementById('status').innerHTML = err.message;
			}
		}
	}
		
	var root = {		
		load: function(){
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
			
			build.label('status', 'status', '...', 'window');
			document.getElementById('status').innerHTML = 'Load Completed';
		},
		
		checkOn: function(){
			document.getElementById('div').className = '';
			document.getElementById('div').className = 'on';
			
			document.getElementById('notice-status').className = '';
			document.getElementById('notice-status').className = 'notice-on';
			document.getElementById('notice-status').innerHTML = 'Ativado';
			
			localStorage.setItem("check_in", 'true');
		
			document.getElementById('notice').setAttribute('onClick', 'root.checkOff()');
			
			document.getElementById('status').innerHTML = 'Start Loop';
			document.getElementById('uuid').innerHTML = uuid;
			
			notification.start();
		},
		
		checkOff: function(){
			document.getElementById('div').className = '';
			document.getElementById('div').className = 'off';
			
			document.getElementById('notice-status').className = '';
			document.getElementById('notice-status').className = 'notice-off';		
			document.getElementById('notice-status').innerHTML = 'Desativado';
			
			localStorage.setItem("check_in", 'false');
			
			document.getElementById('status').innerHTML = 'Loop Cancel';
			
			document.getElementById('notice').setAttribute('onClick', 'root.checkOn()');
			notification.stop();
		},
	}
	
	root.load();