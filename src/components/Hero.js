import React from 'react'

function Hero({ headingResult, subheadingResult, loading }) {
    return (
        <section className="hero">
            <div className="hero-text-container">
                { !loading ?
                    <>
                        <h1>{headingResult ? headingResult : "Placeholder for the heading text."}</h1>

                        <p>{subheadingResult ? subheadingResult : "Placeholder for the subheading text."}</p>
                    </> : null}
            </div>


        </section>
    )
}

export default Hero