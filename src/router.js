import { useRoutes, Outlet } from 'react-router-dom'
import Employee from './employee'
import Home from './home'


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
            }
        ]
    }
]

export const Router = () => {
    const routes = useRoutes(rootRouter)
    return routes
}