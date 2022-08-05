import React from 'react'

import styles from '../style/pagination.module.sass'

export default function Pagination({merchantsPerPage, totalMerchants, paginate}) {
	const pageNumbers = []

	for (let i = 1; i <= Math.ceil(totalMerchants/merchantsPerPage); i++){
		pageNumbers.push(i)
	}

	return (
			<ul className={styles.pagination}>
				{
					pageNumbers.map(number => (
						<li className={styles.pag__item} key={number} onClick={() => paginate(number)}>
								{number}
						</li>
					))
				}
			</ul>
	)
}
