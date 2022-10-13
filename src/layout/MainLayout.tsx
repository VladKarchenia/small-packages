import React from "react"
import { Link, Outlet } from "react-router-dom"

export const MainLayout: React.FC = (): JSX.Element => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Main Page</Link>
          </li>
          <li>
            <Link to="/login">Login Page</Link>
          </li>
          <li>
            <Link to="/login1">Error Page</Link>
          </li>
          {/* <li>
            <Link to="/account/add">Add Account</Link>
          </li>
          <li>
            <Link to="/account/list">List Accounts</Link>
          </li>
          <li>
            <Link to="/account/1">View Account</Link>
          </li>
          <li>
            <Link to="/something-else">Not Found</Link>
          </li> */}
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
