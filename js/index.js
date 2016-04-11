	
	var uuid = (function(){
		document.addEventListener("deviceready", function onDeviceReady(){
			var deviceId = device.uuid;
			localStorage.setItem("uuid", deviceId);
		}, false);
	})();	
	var uuid =  localStorage.getItem("uuid");
	
	var time;
	var notificationId = 0;
	
	
	var notification = {
		start: function(){
			time = setInterval(notification.display , 1000);	
		},
		
		display: function(){
			notificationId++;
			document.getElementById('news').innerHTML = notificationId;
			
			var url = "http://chat.v-id.net/Demo/VIDS/"+uuid+"/status/notice.txt";
			$.ajax({	
				url: url,
				type: "POST",
				dataType: "text",
				success: function (data){
					root.checkOff();
					data = data.split(',');
					document.getElementById('news').setAttribute('text-align', 'left');
					document.getElementById('news').innerHTML = "Viagem: "+data[0]+"<br>";
					document.getElementById('news').innerHTML += "Efetivado: "+data[1]+"<br>";
					document.getElementById('news').innerHTML += "lat: "+data[2]+"<br>";
					document.getElementById('news').innerHTML += "lon: "+data[3]+"<br>";				
				},
				error: function(){
					document.getElementById('status').innerHTML = "not found";
				}
			});	
		},
		
		stop: function(){
			clearInterval(time);			
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