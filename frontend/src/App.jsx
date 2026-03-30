import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import PrivateRoute from './context/PrivateRoute'
import Layout from './pages/Layout'
import { NoteProvider } from './context/NoteContext'

const App = () => {




	return (
		// <div data-theme='light'>
		// 	<AuthProvider>
		// 		<BrowserRouter>
		// 			<Routes>
		// 				<Route path='/login' element={<Login />} />
		// 				<Route path='/register' element={<Register />} />
		// 				<Route path='/' element={<PrivateRoute><NoteProvider><Layout /> </NoteProvider></PrivateRoute>} >
		// 					<Route index element={<Home />} />
		// 				</Route>
		// 			</Routes>
		// 		</BrowserRouter>
		// 	</AuthProvider>
		// </div>


		<div data-theme='light'>
			<AuthProvider>

				<BrowserRouter>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/' element={<PrivateRoute><Layout /></PrivateRoute>} >
							<Route index element={<NoteProvider><Home /></NoteProvider>} />
						</Route>

					</Routes>
				</BrowserRouter>

			</AuthProvider>
		</div>
	)
}

export default App