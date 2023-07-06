import React from 'react'

function Hero({ headingResult, subheadingResult, loading, bgColor }) {
    return (
        <section className="hero" style={{ backgroundColor: bgColor}}>
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