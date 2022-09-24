import { useRouter } from "next/router";
import { useEffect } from "react";

export default function HomePage() {
  const Router = useRouter()

  const redirect = () => {
    Router.push('https://brandinate.com')
  }
  useEffect(() => {
    redirect()
  }, [redirect])
  
  return (
    <div onClick={redirect} className='cursor-pointer m-3'>If you're not redirected please click here</div>
  );
}
