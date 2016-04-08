	
	var time;
	var notificationId = 0;
	
	var notification = {
		start: function(){
			time = setInterval(notification.display , 500);	
		},
		
		display: function(){
			notificationId++;
			document.getElementById('news').innerHTML = notificationId;
			
			var data = server.search();
			if(data){
				root.checkOff();
				data = data.split(';');
				document.getElementById('news').innerHTML = data[3];
			}
		},
		
		stop: function(){
			clearInterval(time);			
		}
	}
	
	var server = {
		search: function(){
			if(notificationId == 23){
				return "uuid;file;date;notice";
			}
			else{
				return false;
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
		},
		
		checkOn: function(){
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