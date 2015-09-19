### Install

```
npm install js.private --save
```

### Usage

```javascript
  
import Private from "js.private";

class People {

  constructor( firstname, lastname, gender, city, street ){
    $( this ).firstname       = firstname;  // private property
    $( this ).lastname        = lastname;   // private property
    $( this ).address.country = country;    // private property
    $( this ).address.city    = city;       // private property
    this.gender               = gender;     // public  property
  }

  get name(){
    return $( this ).generateName();        // call private method
  }

  get info(){
    return this.gender + ", " + $( this ).age;
  }
  
  get address(){
    return $( this ).address.city + ", " + $( this ).address.street;
  }

}

const $ = Private({
  firstname: "", // Default values
  lastname:  "", 
  age:       28, 
  address: {
    country: "",
    city:    ""
  },
  generateName: function(){
    return $( this ).firstname + " " + $( this ).lastname;
  }
});


let ivan = new People( "Ivan", "Ivanow", "man", "Russia", "Moscow" );

ivan.name          // > "Ivan Ivanov"
ivan.info          // > "man, 28"
ivan.address       // > "Russia, Moscow"

let anna = new People( "Anna", "Ananina", "woman", "Germany", "Berlin" );

ivan.name          // > "Anna Ananina"
ivan.info          // > "woman, 28"
ivan.address       // > "Germany Berlin"

ivan.lastName      // > undefined
anna.gender        // > "woman"
ivan.generateName  // > undefined
```

