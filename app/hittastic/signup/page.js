/*import SignupComponent from 'app/ui/signup';
function Page() {
    return (
        <div>
            <h1>Signup to HitTastic!</h1>
            <SignupComponent />
        </div>
    );
}

export default Page;*/
// app/hittastic/signup/page.js
// app/hittastic/signup/page.js
// app/hittastic/signup/page.js
import SignupComponent from 'app/ui/signup';
import Link from 'next/link';
import "app/hittastic/hittastic.css";

function SignupPage() {
    return (
        <div>
            <SignupComponent />
            <p id="loginText">
                Already have an account?
                <Link href="/hittastic/login">
                    Login
                </Link>
            </p>
        </div>
    );
}

export default SignupPage;
