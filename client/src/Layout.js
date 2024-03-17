import Head from './Head'
import {Outlet} from 'react-router-dom'

export default function Layout(){
    return(
        <main>
        <Head/>
        <Outlet/>
        </main>
    )
} 