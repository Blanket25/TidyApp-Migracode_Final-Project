
import '../index.css';
import Nav from './sharedComponents/Nav';
import Footer from '../pages/sharedComponents/Footer';
import printer from '../img/printer.svg';
import { useState } from 'react';

function Board() {
	const tasks = [
		{
			name: 'Elmira',
			task: 'clean the kitchen',
		},
		{
			name: 'Omar',
			task: 'buy food',
		},
		{
			name: 'Bianca',
			task: 'clean the living room',
		},
	];
	const handleChange = (index) => {
		console.log(`changed task ${index}`);
	};
	return (
		<div>
			<div className='board-header'>
				<Nav />
				<button className='purple-btn print-btn'>
					<img src={printer} alt='printer icon' />
					<p>Print it!</p>
				</button>
			</div>
			<div className='card-container'>
				<div className='card'>
					{tasks.map((item, index) => {
						return (
							<div className='task-container' key={index} id={index}>
								<p>{item.name}</p>
								<div>
									<p>{item.task}</p>
								</div>
								<input type='checkbox' onChange={() => handleChange(index)} />
							</div>
						);
					})}
				</div>
			</div>
			<Footer />
		</div>
	);

import "../index.css";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";
import printer from "../img/printer.svg";
import ContentToPrint from "./ContentToPrint";
import React, { useRef } from 'react';
import ReactToPrint from "react-to-print";

function Board() {
  class ComponentToPrint extends React.Component {
    render() {
      return (
        <div>
          <ContentToPrint/>
        </div>
      )
    }
  }

  const componentRef = useRef();
  
  return (
    <div>
      <div className="board-header">
        <Nav />
        <ReactToPrint
          trigger={() => <button className="purple-btn print-btn">
          <img src={printer} alt="printer icon" />
          <p>Print it!</p> </button>}
          content={() => componentRef.current} />
      </div>
      <ComponentToPrint ref={componentRef}/>
      <Footer />
    </div>
  );

}

export default Board;
