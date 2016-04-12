	
/*	var uuid = (function(){
		
	})();	
	var uuid =  localStorage.getItem("uuid"); */
	
	var time;
	var notificationId = 0;	
	
	var notification = {
		start: function(){
			var uuid = root.getUUID(); 
			interval = setInterval(function(){
				$.ajax({	
					url: "http://chat.v-id.net/Demo/VIDS/"+uuid+"/status/notice.txt",
					type: "POST",
					dataType: "text",
					success: function (data){				
					//	data = data.split(',');
						alert(data);
						notification.local('Demo', 'Sua bagagem foi encontrada', '1');
						notification_id++;
						alert(notification_id);						
						root.checkOff();								
					},
					error: function(){
						document.getElementById('status').innerHTML = "not found";
					}
				});				
			}, 1000);	
		},
		
		stop: function(){
			clearInterval(interval);			
		},
		
	/*	display: function(data){
			data = data.split(',');
			document.getElementById('news').setAttribute('text-align', 'left');
			document.getElementById('news').innerHTML = "Viagem: "+data[0]+"<br>";
			document.getElementById('news').innerHTML += "Efetivado: "+data[1]+"<br>";
			document.getElementById('news').innerHTML += "lat: "+data[2]+"<br>";
			document.getElementById('news').innerHTML += "lon: "+data[3]+"<br>";	
			
		},*/
				
		local: function(tipo, msg, indice){
			alert('plugin #1');
		//	var sound = 'sound/bike_horn.mp3'; //dir
		//	var icon = 'img/virtualID.JPEG'; //dir
			var time = new Date().getTime();
			var _5_sec_from_now = new Date (time + 5 * 1000);
			var now = new Date(time);
			alert(now);
			cordova.plugins.notification.local.schedule({
				id: notification_id,
				title: tipo,
				text: msg,
				at: now,
				sound: 'sound/bike_horn.mp3',
				icon: 'img/virtualID.JPEG',
				badge: notification_id			
			});			
			notification_id++;		
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
		
		getUUID: function(){
			document.addEventListener("deviceready", function onDeviceReady(){
				var deviceId = device.uuid;
				return deviceId;
			}, false);		
		}
	}