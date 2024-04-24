import { useRoutes, Outlet } from 'react-router-dom'
import Employee from './employee'
import Home from './home'
import Client from './clients'
import Rooms from './rooms'


export const rootRouter = [
    {
        path: '/',
        element: <><Outlet /></>,

        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <>Login</>
            },
            {
                path: '/employee',
                element: <Employee />
            },
            {
                path: '/clients',
                element: <Client />
            },
            {
                path: '/rooms',
                element: <Rooms />
            }
        ]
    }
]

export const Router = () => {
    const routes = useRoutes(rootRouter)
    return routes
}