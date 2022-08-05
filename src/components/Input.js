import React from 'react'
import styles from '../style/input.module.sass'


export default function Input({valueFilter, setValueFilter}) {
	return (
		<input className={styles.input} placeholder='Введите значение' value={valueFilter} onChange={(e) => setValueFilter(e.target.value)}/>
	)
}
