import React from 'react'

import styles from '../style/table.module.sass'

export default function Table({columns, currentMerchant}) {
	return (
		<table className={styles.table}>
		<tr className={styles.tableRow}>
			{columns.map((column, index) => 
				<th className={styles.tableRow} key={index}>{column}</th>)}
		</tr>
		{currentMerchant.map(elem =>
			<tr className={styles.tableRow} key={elem.id}>
				{console.log(elem.date)}
				<td className={styles.tableRow}>{elem.date}</td>
				<td className={styles.tableRow}>{elem.name}</td>
				<td className={styles.tableRow}>{elem.count}</td>
				<td className={styles.tableRow}>{elem.dist}</td>
			</tr>)}
		</table>
	)
}
