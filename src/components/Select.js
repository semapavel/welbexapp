import React from 'react'
import styles from '../style/select.module.sass'

export default function Select({selectValue, setSelectValue, arr}) {
	return (
			<select className={styles.select} value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
			<option className={styles.option} selected>Выберите значение</option>
				{arr.map( (column, index) =>
					<option className={styles.option} key={index}>{column}</option>
				)}
			</select>
	)
}
