"use client"
import React from 'react'

const Footer = () => {
  return (
    <footer className='h-40 bg-blue-500 mt-5'> 
        <div className='flex p-5 justify-around'>
            <div className='text-center flex flex-col justify-center'>
                <h1 className='text-3xl'>Welcome to work manager</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, sit.</p>
            </div>
            <div className='text-center'>
                <h1 className='font-bold'>Important Links</h1>
                <ul>
                    <li>
                        <a href="">Project X</a>
                    </li>
                    <li>
                        <a href="">Project Y</a>
                    </li>
                    <li>
                        <a href="">Project Z</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer