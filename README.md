### Install

```
npm install js.private --save
```

### Usage

```javascript

import Private from "js.private";

class People {

	constructor( firstname, lastname, gender ){
		$( this ).firstname = firstname;  // private property
		$( this ).lastname  = lastname;   // private property
		this.gender         = gender;     // public  property
	}

	get info(){
		return $( this ).generateInfo();  // call private method
	}

}

let $ = Private({
	firstname: "DefaultFirstName",
	lastname:  "DefaultLastName",
	generateInfo: function(){
		return $( this ).firstname + " " + $( this ).lastname + " (" + this.gender + ")";
	}
});


let man = new People( "Denis", "Churbanov", "man" );

man.info          // > "Denis Churbanov (man)"
man.gender        // > "man"
man.firstname     // > undefined
man.lastname      // > undefined
man.generateInfo  // > undefined
```

