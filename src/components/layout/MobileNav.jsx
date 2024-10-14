import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { FaBars } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import { isAdmin as checkAdmin } from '../utils/ApiFunction';

export default function MobileNav() {

    const isAdmin = checkAdmin();  

  return (
    <Sheet>
        <SheetTrigger className='text-2xl text-primary felx items-center'>
            <FaBars />
        </SheetTrigger>
        <SheetContent side='left' className='flex justify-center items-center' aria-describedby={undefined}>
            <SheetTitle>
            <nav className='flex flex-col gap-8 text-center'>
                <NavLink to="/" className='text-2xl font-primary text-primary hover:text-accent-hover transition-all'>
                    Home
                </NavLink>
                <NavLink to="/rooms" className='text-2xl font-primary text-primary hover:text-accent-hover transition-all'>
                    Room
                </NavLink>
                {isAdmin && <NavLink to="/admin" className='text-2xl font-primary text-primary hover:text-accent-hover transition-all'>
                    Admin
                </NavLink>}
            </nav>
            </SheetTitle>
        </SheetContent>
    </Sheet>
  )
}
