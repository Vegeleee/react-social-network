import React from 'react'
import preloader from '../../../assets/images/preloader.gif'
import classes from './Preloader.module.scss'

const Preloader: React.FC = () => {
	return (
		<div className={classes.preloader}>
			<img src={preloader} alt="Preloader" />
		</div>
	)
}

export default Preloader
