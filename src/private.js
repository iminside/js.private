import Clone from "js.clone";


class Private {

  constructor( props ){
    this.props       = props;
    this.owners      = [];
    this.values      = [];
    this.get         = this.get.bind( this );
    this.get.destroy = this.destroy.bind( this );
  }

  get( context ){
    let key = this.owners.indexOf( context );
    if( key < 0 ) key = this.set( context );
    return this.values[ key ];
  }

  set( context ){
    let clone = Clone( this.props );
    for( let attr in clone )
      if( clone.hasOwnProperty( attr ) && clone[ attr ] instanceof Function )
        clone[ attr ] = clone[ attr ].bind( context );
    this.owners.push( context );
    return this.values.push( clone ) - 1;
  }

  destroy( context ){
    let key = this.owners.indexOf( context );
    return delete this.owners[ key ] && delete this.values[ key ];
  }

}


export default function( props ){
  return ( new Private( props ) ).get;
}
