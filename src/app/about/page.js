import React from 'react';

const takeTime = async () => {
    await new Promise((resolve) => {
        setTimeout(resolve, 3000);
    })
}

const About = async () => {
    await takeTime();
    //throw new Error("This is a manual ERROR!!!"); 
  return (
    <div>
        <h1>This is About page.</h1>
    </div>
  )
}

export default About