import Clone from "js.clone";


class Private {

  constructor( props ){
    this.props = props;
    this.key   = `_${ Math.random().toString( 36 ).substr( 2, 7 ) }_`;
    this.get   = this.get.bind( this );
  }

  get( context ){
    return context[ this.key ] || this.set( context );
  }

  set( context ){
    let clone = Clone( this.props );
    for( let attr in clone )
      if( clone.hasOwnProperty( attr ) && clone[ attr ] instanceof Function )
        clone[ attr ] = this.bind( clone[ attr ], context );
    return context[ this.key ] = clone;
  }

  bind( method, context ){
    return function(){
      method.apply( context, arguments );
    };
  }

}


export default function( props ){
  return ( new Private( props ) ).get;
}
