	
	var uuid = (function(){
		document.addEventListener("deviceready", function onDeviceReady(){
				localStorage.setItem("uuid", device.uuid);
			}, false);	
	})();	
	var uuid =  localStorage.getItem("uuid"); 
	
	var time;
	var notification_id = 0;	
	
	var app = {
		start: function(){
			interval = setInterval(function(){
				$.ajax({	
					url: "http://chat.v-id.net/Demo/VIDS/"+uuid+"/status/notice.txt",
					type: "POST",
					dataType: "text",
					success: function (data){
						root.checkOff();
						app.local('Demo', 'Sua bagagem foi encontrada', '1');				
						app.display(data);
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
		
		display: function(data){
			data = data.split(',');
			document.getElementById('news').setAttribute('text-align', 'left');
			document.getElementById('news').innerHTML = "Viagem: "+data[0]+"<br>";
			document.getElementById('news').innerHTML += "Efetivado: "+data[1]+"<br>";
			document.getElementById('news').innerHTML += "lat: "+data[2]+"<br>";
			document.getElementById('news').innerHTML += "lon: "+data[3]+"<br>";	
			
		},
				
		local: function(tipo, msg, indice){
			document.addEventListener('deviceready', function(){				
				var time = new Date().getTime();
				var _5_sec_from_now = new Date (time + 5 * 1000);
				var now = new Date(time);
				
				cordova.plugins.notification.local.schedule({
					id: notification_id,
					title: tipo,
					text: msg,
					at: now,
					sound: 'file://sound/bike_horn.mp3',
					icon: 'file://img/virtualID.JPEG',
					badge: notification_id			
				});				
				notification_id++;
			}, false);			
		},
	}
			
	var root = {		
		load: function(){					
			
			var text = 'Ative para receber notificações';		
			build.text('p', 'text', text, 'window');			
			build.div('container', 'container', 'window');
			
			var status = build.text('h3', "notice-off", "Desativado", 'container'); // ID: notice-status
				status.setAttribute('ID', 'notice-status');
				
			var checkbox = build.checkbox('checkbox', 'cbx', 'container');
				checkbox.setAttribute('style', 'display: none;');
			
			document.getElementById('checkbox').checked = localStorage.getItem("check_in");
			
			build.label('notice', 'lbl', '', 'container');
			document.getElementById('notice').setAttribute('for', 'checkbox');
			document.getElementById('notice').setAttribute('onClick', 'root.checkOn()');	
			build.div('div', 'off', 'notice');
			
			build.div('news', 'news', 'window');
			
			if(localStorage.getItem("check_in") == 'true'){
				root.checkOn();
			}
			else{
				root.checkOff();
			}	
			
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
			
			app.start();
		},
		
		checkOff: function(){
			document.getElementById('div').className = '';
			document.getElementById('div').className = 'off';
			
			document.getElementById('notice-status').className = '';
			document.getElementById('notice-status').className = 'notice-off';		
			document.getElementById('notice-status').innerHTML = 'Desativado';
			
			localStorage.setItem("check_in", 'false');
			
			document.getElementById('notice').setAttribute('onClick', 'root.checkOn()');
			app.stop();
		}
	}