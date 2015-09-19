### Install

```
npm install js.private --save
```

### Usage

```javascript

import Clone from "js.clone";


class Private {

  constructor( props ){
    this._key_   = `_${ Math.random().toString( 36 ).substr( 2, 7 ) }_`;
    this._props_ = this.prepare( props );
  }

  prepare( props ){
    for( let attr in props )
      if( props.hasOwnProperty( attr ) && typeof props[ attr ] === `function` )
        props[ attr ] = this.bind( this._key_, props[ attr ] );
    return props;
  }

  bind( key, method ){
    return function(){
      return method.apply( this[ key ], arguments );
    };
  }

  get( context ){
    return context[ this._key_ ] || this.set( context );
  }

  set( context ){
    let props = Object.create( this._props_, this.descriptor( this._key_, context ) );
    for( let attr in this._props_ )
      if( this._props_.hasOwnProperty( attr ) && typeof this._props_[ attr ] === `object` )
        props[ attr ] = Clone( this._props_[ attr ] );
    return Object.defineProperties( context, this.descriptor( this._key_, props ) )[ this._key_ ];
  }

  descriptor( name, value, configurable = false, writable = false, enumerable = false ){
    return { [ name ]: { value, configurable, writable, enumerable } };
  }

}


export default function( props ){
  let instance = new Private( props );
  return function( context ){
    return instance.get( context );
  };
}

  
  
  
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

