import Link from 'next/link'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import { Ratio } from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server';
import { syncUser } from '@/actions/user';

async function Navbar() {

const user = await currentUser();
if (user) await syncUser();

 return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className=" flex gap-2 text-xl font-bold text-primary font-mono tracking-wider">
           <Ratio className='w-7 h-7' />
           <span className=''>PostFlow</span>
          </Link>
        </div>

        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </div>
  </nav>
 )
}

export default Navbar