import { useRouteError ,Link} from "react-router-dom"

const ErrorPage = () => {

    const error = useRouteError();

    if(error.status === 404){
         return (
           <main className="grid min-h-screen place-items-center">
             <div className="text-center">
               <p className="text-9xl font-semibold text-primary">404</p>
               <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
                 Page not found
               </h1>
               <p className="mt-6 text-lg leading-7">
                 Sorry, we couldn’t find the page you’re looking for.
               </p>
               <div className="mt-10">
                 <Link to="/" className="btn btn-secondary">
                   Back to home
                 </Link>
               </div>
             </div>
           </main>
         );
    }

   return (
     <main className="grid min-h-screen place-items-center">
       <h4 className="text-center font-bold text-4xl">There was an error</h4>
     </main>
   );
  
}

export default ErrorPage