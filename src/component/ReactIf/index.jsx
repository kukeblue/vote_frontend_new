import React  from 'react'

export  function ReactIf({children, show}) {
    return <div style={show ?{} : {display:'none'}}>
        {children}
    </div>
}
