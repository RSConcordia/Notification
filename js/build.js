/*-------------------------------------------------------------------------------------------Constructor Elementos
		// return is optional
/---------------------------------------------------------------------------------------------------------------*/
	var build = {	
		div: function(name_id, classe, local){
			var div = document.createElement("div");
				div.setAttribute('name', name_id);
				div.setAttribute('id', name_id);
				div.setAttribute('class', classe);				
			document.getElementById(local).appendChild(div);
			return div;
		},
		form: function(name_id, classe, local){	
			var form = document.createElement("FORM");
				form.setAttribute('method', 'POST');
				form.setAttribute('name', name_id);
				form.setAttribute('id', name_id);				
				form.setAttribute('class', classe);				
			document.getElementById(local).appendChild(form);
			return form;
		},
		label: function(name_id, classe, text, local){
			var label = document.createElement("label");
				label.setAttribute("name", name_id);
				label.setAttribute("id", name_id);	
				label.setAttribute('class', classe);				
			var text_elem = document.createTextNode(text); 		
				label.appendChild(text_elem); 		
			document.getElementById(local).appendChild(label); 
			return label;
		},
		text: function(type, classe, text, local){
			var title = document.createElement(type);
				title.setAttribute('class', classe);
			var text_ement = document.createTextNode(text); 		
				title.appendChild(text_ement); 
			document.getElementById(local).appendChild(title);
			return title;
		},
		input: function(name_id, classe, value, local){			
			var input = document.createElement("INPUT");
				input.setAttribute('type', 'text');
				input.setAttribute('name', name_id);
				input.setAttribute('id', name_id);
				input.setAttribute('class', classe);
				input.setAttribute('value', value);				
			document.getElementById(local).appendChild(input); 
			return input;
		},
		hide: function(name_id, value, local){								
			var input = document.createElement("input");
				input.setAttribute('type', 'hidden');
				input.setAttribute('name', name_id);
				input.setAttribute('id', name_id);
				input.setAttribute('value', value);				
			document.getElementById(local).appendChild(input);
			return input;
		},
		button: function(classe, skill, text, local){ 
			var button = document.createElement("BUTTON");
				button.setAttribute('class', classe);
				button.setAttribute('onClick', skill);			
			var text_elem = document.createTextNode(text); 		
				button.appendChild(text_elem); 
			document.getElementById(local).appendChild(button);
			return button;
		},
		link: function(name_id, classe, skill, text, local){ 
			var link = document.createElement("A");
				link.setAttribute('href', '#');						
				link.setAttribute("name", name_id);
				link.setAttribute("id", name_id);	
				link.setAttribute('class', classe);
				link.setAttribute('onClick', skill);
			var text_elem = document.createTextNode(text); 		
				link.appendChild(text_elem); 			
			document.getElementById(local).appendChild(link);
			return link;
		},
		table: function(name_id, classe, local){			
			var tb = document.createElement("TABLE");
				tb.setAttribute("class", classe);				
				tb.setAttribute("name", name_id);
				tb.setAttribute("id", name_id);							
			document.getElementById(local).appendChild(tb);
			return tb;
		},
		td: function(name_id, classe, text, tr){			
			var td = document.createElement("TD");
				td.setAttribute("class", classe);				
				td.setAttribute("name", name_id);
				td.setAttribute("id", name_id);				
			var text_td = document.createTextNode(text); 		
				td.appendChild(text_td); 							
			tr.appendChild(td);
			return td;
		},
		radio: function(name_id, classe, value, change, local){	 		
			var radio = document.createElement("INPUT");
				radio.setAttribute("Type", "radio");				
				radio.setAttribute("class", classe);				
				radio.setAttribute("name", "radio");
				radio.setAttribute("id", name_id);										
				radio.setAttribute("value", value);										
				radio.setAttribute("onchange", "document.getElementById('"+change+"').value = this.value");										
			document.getElementById(local).appendChild(radio);
			return radio;
		},
		checkbox: function(name_id, classe, local){
			var checkbox = document.createElement("INPUT");
				checkbox.setAttribute('type', 'checkbox');
				checkbox.setAttribute('class', classe);
				checkbox.setAttribute('name', name_id);
				checkbox.setAttribute('id', name_id);
			document.getElementById(local).appendChild(checkbox);
			return checkbox;	
		},
		iframe: function(name_id, classe, latlon,local){
			var iframe = document.createElement("IFRAME");
				iframe.setAttribute('class', classe);
				iframe.setAttribute('name', name_id);
				iframe.setAttribute('id', name_id);
				iframe.setAttribute('src', 'https://www.google.com/maps/embed/v1/place?q='+latlon+'&key=AIzaSyAj6LuyubKgTA8wlfqsTzQHKkSlTO9ZMOc');			
			document.getElementById(local).appendChild(iframe);
			return iframe;	
		}
	}