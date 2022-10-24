import { FC } from "react";
import { useRouteError } from "react-router-dom";
import "../styles/ErrorPage.css";

const ErrorPage: FC = () => {
    const error = useRouteError() as Error;
    console.log(error);
    
    return (
        <div className="error-page">
            <div className="error-text">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <h2>404 - Not found</h2>
            </div>
        </div>
    );
};

export default ErrorPage;