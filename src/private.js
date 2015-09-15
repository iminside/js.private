import Clone from "js.clone";


class Private {

  constructor( props ){
    this.props = props;
    this.key   = Math.random().toString( 36 ).replace( /^.{2}/, "_private_" );
    this.get   = this.get.bind( this );
  }

  get( context ){
    return context[ this.key ] || this.set( context );
  }

  set( context ){
    let clone = Clone( this.props );
    for( let attr in clone )
      if( clone.hasOwnProperty( attr ) && clone[ attr ] instanceof Function )
        clone[ attr ] = clone[ attr ].bind( context );
    return context[ this.key ] = clone;
  }

}


export default function( props ){
  return ( new Private( props ) ).get;
}
