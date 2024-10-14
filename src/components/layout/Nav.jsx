import { NavLink } from "react-router-dom";
import { isAdmin as checkAdmin } from '../utils/ApiFunction';


export default function Nav() {

    const isAdmin = checkAdmin();        

  return (
    <nav>
        <ul className="flex flex-col lg:flex-row gap-6">
            <li>
                <NavLink to="/" className="font-bold text-[13px] uppercase tracking-[3px] hover:text-accent-hover transition-all">Home</NavLink>
            </li>
            <li>
                <NavLink to="/rooms" className="font-bold text-[13px] uppercase tracking-[3px] hover:text-accent-hover transition-all">Room</NavLink>
            </li>
            {isAdmin && <li>
                <NavLink to="/admin" className="font-bold text-[13px] uppercase tracking-[3px] hover:text-accent-hover transition-all">Admin</NavLink>
            </li>}
        </ul>
    </nav>
  )
}
