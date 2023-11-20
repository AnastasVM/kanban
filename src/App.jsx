import React, { useState } from 'react'
import './App.css'

function App() {
	const [boards, setBoards] = useState([
		{
			id: 1,
			title: 'Новые задачи',
			items: [
				{ id: 1, title: 'Пойти в магазин' },
				{ id: 2, title: 'Выкинуть мусор' },
				{ id: 3, title: 'Покушать' },
			],
		},
		{
			id: 2,
			title: 'Сделать',
			items: [
				{ id: 4, title: 'Пойти в магазин' },
				{ id: 5, title: 'Выкинуть мусор' },
				{ id: 6, title: 'Покушать' },
			],
		},
		{
			id: 3,
			title: 'Проверить',
			items: [
				{ id: 7, title: 'Код ревью' },
				{ id: 8, title: 'Задача на факториал' },
				{ id: 9, title: 'Задачи на фибоначчи' },
			],
		},
		{
			id: 4,
			title: 'Сделано',
			items: [
				{ id: 10, title: 'Снять видео' },
				{ id: 11, title: 'Смонтировать' },
				{ id: 12, title: 'Отрендерить' },
			],
		},
	])
	// Запоминаем доску, в которой берм карточки
	const [currentBoard, setCurrentBoard] = useState(null)
	// Запоминаем текущую задачу, которую берем с доски
	const [currentItem, setCurrentItem] = useState(null)

	function dragOverHandler(e) {
		e.preventDefault()
		if (e.target.className === 'item') {
			e.target.style.boxShadow = '0 4px 3px gray'
		}
	}

	function dragLeaveHandler(e) {
		e.target.style.boxShadow = 'none'
	}
	function dragStartHandler(e, board, item) {
		// Сохраняем текущую доску и текущую задачу
		setCurrentBoard(board)
		setCurrentItem(item)
	}
	function dragEndHandler(e) {
		e.target.style.boxShadow = 'none'
	}
	function dropHandler(e, board, item) {
		e.preventDefault()
		// Необходимо получить индекс в массиве текущей карточки, которую мы держим. Обращаемся в текущей доске к полю items и вызываем ф-цию, которая возвращает индекс элемента в массиве. Индекс необходим для того, чтобы мы могли удалить элемент из массива
		const currentIndex = currentBoard.items.indexOf(currentItem)
		// удаляем этот элемент из текущей доски, первый параметр индекс элемента с которого будем производить удаление, а вторым кол-во удаленных элементов
		currentBoard.items.splice(currentIndex, 1)
		// по аналогии получаем индекс эдемента НАД которым мы держим карточку
		const dropIndex = board.items.indexOf(item)
		// у доски над которой мы держим задачу  вызываем ф-цию сплайс но с др. параметрами. Индекс увеличиваем на единицу, так как мы будем вставлять после этой задачи, количество удаленных элементов ноль, последним параметром передаем задачу, которую мы хотим вставить
		board.items.splice(dropIndex + 1, 0, currentItem)
		//доски мы изменили, далее делаем рендеринг изменив состояние, меняем старые доски на уже измененные
		setBoards(
			boards.map(b => {
				// проверяем, если текущий элемент итерации равен одному из досок, которую мы изменяли, то возвращаем измененную доску, в ином случае просто возвращаем элемент итерации
				if (b.id === board.id) {
					return board
				}

				if (b.id === currentBoard.id) {
					return currentBoard
				}
				return b
			})
		)
		e.target.style.boxShadow = 'none'
	}

	function dropCardHandler(e, board) {
		board.items.push(currentItem)
		const currentIndex = currentBoard.items.indexOf(currentItem)
		// удаляем этот элемент из текущей доски, первый параметр индекс элемента с которого будем производить удаление, а вторым кол-во удаленных элементов
		currentBoard.items.splice(currentIndex, 1)
		//доски мы изменили, далее делаем рендеринг изменив состояние, меняем старые доски на уже измененные
		setBoards(
			boards.map(b => {
				// проверяем, если текущий элемент итерации равен одному из досок, которую мы изменяли, то возвращаем измененную доску, в ином случае просто возвращаем элемент итерации
				if (b.id === board.id) {
					return board
				}

				if (b.id === currentBoard.id) {
					return currentBoard
				}
				return b
			})
		)
		e.target.style.boxShadow = 'none'
	}

	return (
		<div className='app'>
			{boards.map(board => (
				<div
					className='board'
					onDragOver={e => dragOverHandler(e)}
					onDrop={e => dropCardHandler(e, board)}
				>
					<div className='board__title'>{board.title}</div>
					{board.items.map(item => (
						<div
							onDragOver={e => dragOverHandler(e)}
							onDragLeave={e => dragLeaveHandler(e)}
							onDragStart={e => dragStartHandler(e, board, item)}
							onDragEnd={e => dragEndHandler(e)}
							onDrop={e => dropHandler(e, board, item)}
							// className='todo'
							draggable={'true'}
							className='item'
						>
							{item.title}
						</div>
					))}
				</div>
			))}
		</div>
	)
}

export default App
