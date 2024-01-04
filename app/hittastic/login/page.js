/*import LoginForm from 'app/ui/login';
function Page() {
    return (
        <div>
            <h1>Login to HitTastic!</h1>
            <LoginForm />
        </div>
    );
}

export default Page;*/
// app/hittastic/login/page.js
// app/hittastic/login/page.js
// app/hittastic/login/page.js
/*
import LoginForm from 'app/ui/login';
import Link from 'next/link'; // Import Link from Next.js

function LoginPage() {
    return (
        <div>
            <h1>Login to HitTastic!</h1>
            <LoginForm />
            <p>
              Don't have an account? 
              <Link href="/hittastic/signup">
                Sign up
              </Link>
            </p>
        </div>
    );
}

export default LoginPage;

*/


"use client"
import LoginForm from 'app/ui/login';
import Link from 'next/link';
import "app/hittastic/hittastic.css";

function LoginPage() {

    return (
        <div>
            <LoginForm onLoginSuccess={() => {}} />
            <p id="signupText">
                Don't have an account?
                <Link href="/hittastic/signup">
                    Sign up
                </Link>
            </p>
        </div>
    );
}

export default LoginPage;
