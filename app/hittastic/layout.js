
import "./hittastic.css";
import Link from 'next/link';

function Layout({children}) {
    return(
        <div id='container'>
        <div id='nav'>
        <Link href='/hittastic'>Main</Link>
        <br />
        <Link href='/hittastic/login'>Login</Link>
        <br />
        <Link href='/hittastic/signup'>Sign up</Link>
        <br />
        <Link href='/hittastic/product'> Add Product</Link>
        <br />
        <Link href='/hittastic/user'>User Page</Link>
        <br />
        <Link href='/hittastic/basket'>Basket</Link>
        <br />
        </div>
        <div id='main'>
        {children}
        </div>
        </div>
    );
}

export default Layout;

