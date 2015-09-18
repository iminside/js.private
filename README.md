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

const $ = Private({
	firstname: "DefaultFirstName",
	lastname:  "DefaultLastName",
    age:       28,
	generateInfo: function(){
		return `${ $( this ).firstname } ${ $( this ).lastname } (${ this.gender }, ${ $( this ).age })`;
	}
});


let man = new People( "Denis", "Churbanov", "man" );

man.info          // > "Denis Churbanov (man, 28)"
man.gender        // > "man"
man.firstname     // > undefined
man.lastname      // > undefined
man.generateInfo  // > undefined
```

