import React from 'react'

function Nav({ companyName }) {
    return (
        <div className='nav-container'> 
        
        <nav>
        <h1 className='company-wordmark'>{ companyName ? companyName : "Company Name" }</h1>
           <div>
           <a href="#">Home</a>
            <a href="#">About</a>
           </div>
            
            <button className="signup-button">Sign up</button>

        </nav></div>

    )
}

export default Nav