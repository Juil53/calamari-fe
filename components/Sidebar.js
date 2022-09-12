import Image from 'next/image';
import Link from 'next/link';
// import styles from '../styles/Sidebar.module.scss'

const Sidebar = () => {
  return ( 
    <nav>
      <div className="logo">
        <Image src="/imgs/logo.svg" alt="" width={128} height={77}/>
      </div>
      <Link href="#">Apply</Link>
      <Link href="#">Calendar</Link>
      <Link href="#">Requests</Link>
      <Link href="#">Approval</Link>
      <Link href="#">Entitlement</Link>

    </nav>
   );
}
 
export default Sidebar;