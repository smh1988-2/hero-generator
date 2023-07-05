import React from 'react'

function Nav({ companyName, loading }) {
    return (
        <div className='nav-container'>
            <nav>
                { !loading ?
                    <h1 className='company-wordmark'>{companyName ? companyName : "Company Name"}</h1>
                    : null}

                <a href="https://www.linkedin.com/in/sean-hurley/" className="signup-button">Sign up</a>
            </nav>
        </div>
    )
}

export default Nav