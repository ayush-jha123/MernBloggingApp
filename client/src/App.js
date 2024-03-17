import './App.css';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPages';
import Layout from './Layout'
import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './UserContext';
import CreatePost from './Pages/CreateNewPost'
import PostPage from './Pages/PostPage';
import EditPost from './Pages/EditPost';
function App() {
  return (
    <UserContextProvider >
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;