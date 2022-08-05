import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Pagination from './components/Pagination';
import Select from './components/Select';
import Input from './components/Input';
import Button from './components/Button';
import Table from './components/Table';

function App() {

	const columns = ['Дата', 'Название', 'Количество', 'Расстояние']
	const signs = ['Равно', 'Содержит', 'Больше', 'Меньше']

	const [selectName, setSelectName] = useState('Выберите значение')
	const [selectSign, setSelectSign] = useState('Выберите значение')
	const [valueFilter, setValueFilter] = useState('')
	const [searchOnTable, setSearchOnTable] = useState(false)
	const [currentPage, setCurrentPage] =useState(1)
	const [merchantsPerPage] =useState(4)
  const [merchants, setMerchants] = useState([]);
	const [filterMerchants, setFilterMerchants] = useState([]);

	const lastMerchantIndex = currentPage * merchantsPerPage
	const firstMerchantIndex = lastMerchantIndex - merchantsPerPage
	const currentMerchant = merchants.slice(firstMerchantIndex, lastMerchantIndex)
	const currentFilterMerchants = filterMerchants.slice(firstMerchantIndex, lastMerchantIndex)

	// Получение данных с сервера
  useEffect(() => {
		getMerchant();
  }, []);
	const getMerchant = async() => {
		const response = await axios.get('http://localhost:3001')
		setMerchants(response.data);
	}

	// Фильтрация
	 function filterColumn() {
		setSearchOnTable(false)
		if (selectName === 'Название') {
			if (selectSign === 'Содержит') {
				setFilterMerchants(merchants.filter((elem) => (elem.name.toLowerCase().includes(valueFilter.toLowerCase()))))
			} else if (selectSign === 'Равно') {
				setFilterMerchants(merchants.filter((elem) => elem.name.toLowerCase() === valueFilter.toLowerCase()))
			} else if (selectSign === 'Больше') {
				setFilterMerchants(merchants.filter((elem) => elem.name.toLowerCase() > valueFilter.toLowerCase()))
			} else if (selectSign === 'Меньше') {
				setFilterMerchants(merchants.filter((elem) => elem.name.toLowerCase() < valueFilter.toLowerCase()))
			}
		} else if (selectName === 'Количество') {
			if (selectSign === 'Содержит') {
				setFilterMerchants(merchants.filter((elem) => String(elem.count).includes(valueFilter)))
			} else if (selectSign === 'Равно') {
				setFilterMerchants(merchants.filter((elem) => elem.count === Number(valueFilter)))
			} else if (selectSign === 'Больше') {
				setFilterMerchants(merchants.filter((elem) => elem.count > Number(valueFilter)))
			} else if (selectSign === 'Меньше') {
				setFilterMerchants(merchants.filter((elem) => elem.count < Number(valueFilter)))
			}
		} else if (selectName === 'Расстояние') {
			if (selectSign === 'Содержит') {
				setFilterMerchants(merchants.filter((elem) => String(elem.dist).includes(valueFilter)))
			} else if (selectSign === 'Равно') {
				setFilterMerchants(merchants.filter((elem) => elem.dist === Number(valueFilter)))
			} else if (selectSign === 'Больше') {
				setFilterMerchants(merchants.filter((elem) => elem.dist > Number(valueFilter)))
			} else if (selectSign === 'Меньше') {
				setFilterMerchants(merchants.filter((elem) => elem.dist < Number(valueFilter)))
			}
	}
	setSearchOnTable(true)
	}
	// Удаление фильтров
	function deleteFilter(){
		setValueFilter('')
		setSearchOnTable(false)
	}
	// Пагинация
	function paginate(pageNumbers){
		setCurrentPage(pageNumbers)
	}

	//Рендеринг компонентов
  return (
	<div className='container'>
		<Select
			selectValue = {selectName}
			setSelectValue = {setSelectName}
			arr	= {columns.slice(1)}
		/>
		<Select
			selectValue = {selectSign}
			setSelectValue = {setSelectSign}
			arr	= {signs}
		/>
		<Input
			valueFilter={valueFilter}
			setValueFilter={setValueFilter}
		/>
		<Button
			onClickButton={filterColumn}
			btnName='Поиск'
		/>
		<Button
			onClickButton={deleteFilter}
			btnName='Сбросить фильтр'
		/>
		<Table
			columns={columns}
			currentMerchant={(searchOnTable && valueFilter)?currentFilterMerchants:currentMerchant}
		/>
		<Pagination
			merchantsPerPage={merchantsPerPage}
			totalMerchants={(searchOnTable && valueFilter) ? filterMerchants.length: merchants.length}
			paginate={paginate}
		/>
	</div>
	);
}

export default App;
