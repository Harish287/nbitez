import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setItem } from "../Utils/Generals";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../config";

interface ResultError {
    message?: string;
    errors?: string[];
}

interface ResultData {
    _token?: string;
    user?: {
        admin?: boolean;
    };
}

interface Result {
    isError: boolean;
    isSuccess: boolean;
    error?: { data?: ResultError };
    data?: {
        message: string;
        data?: ResultData;
    };
}

interface HandleResultProps {
    result: any;
}

export const HandleResult: React.FC<HandleResultProps> = ({ result }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (result.isError) {
            const errorMessage = result.error?.data?.message || "An unexpected error occurred.";
            toast.error(errorMessage);
            console.log("result.error?.data?.errors", result.error?.data?.errors);

            // result.error?.data?.errors?.forEach((err: any) => toast.error(err));
        }

        if (result.isSuccess && result.data) {
            // const { _token, user } = result.data.data || {};
            // let tokendata = result.data.token.replace('"', "")

            if (result.data.token) {
                setItem('token', result.data.token);

                setItem(RoutePaths.token, result.data.token);
                setItem('user', result.data.user);

                // navigate(user.admin ? RoutePaths.admin : RoutePaths.userAccount);
                // 

            }

            toast.success(result.data.message);
            // navigate(RoutePaths.userAccount);
        }
    }, [result, navigate]);

    return (
        <ToastContainer />
    );
};






// new

// import React, { useEffect } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { setItem } from "../Utils/Generals";
// import { useNavigate } from "react-router-dom";
// import RoutePaths from "../config";

// interface ResultError {
//     message?: string;
//     errors?: string[] | any;  // Make sure errors can be any type, not just an array
// }

// interface ResultData {
//     _token?: string;
//     user?: {
//         admin?: boolean;
//     };
// }

// interface Result {
//     isError: boolean;
//     isSuccess: boolean;
//     error?: { data?: ResultError };
//     data?: {
//         message: string;
//         data?: ResultData;
//     };
// }

// interface HandleResultProps {
//     result: any;
// }

// export const HandleResult: React.FC<HandleResultProps> = ({ result }) => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (result.isError) {
//             const errorMessage = result.error?.data?.message || "An unexpected error occurred.";
//             toast.error(errorMessage);

//             // Check if errors is an array before using forEach
//             const errors = result.error?.data?.errors;
//             if (Array.isArray(errors)) {
//                 errors.forEach((err: any) => toast.error(err));  // Show each error if it's an array
//             } else if (errors && typeof errors === 'string') {
//                 toast.error(errors);  // If errors is a single string
//             }
//         }

//         if (result.isSuccess && result.data) {
//             const { token, user, message } = result.data;

//             if (token) {
//                 const cleanToken = token.replaceAll('"', "");

//                 // Log the token (remove in production)
//                 console.log("Received token:", cleanToken);

//                 // Store token and user information
//                 setItem('token', cleanToken);
//                 setItem(RoutePaths.token, cleanToken);
//                 setItem('user', user);

//                 // Redirect based on user type (admin or normal user)
//                 if (user?.admin) {
//                     navigate(RoutePaths.admin); // Admin redirect
//                 } else {
//                     navigate(RoutePaths.userAccount); // Regular user redirect
//                 }

//                 // Show success message
//                 toast.success(message || "Operation successful");
//             }
//         }
//     }, [result, navigate]);

//     return <ToastContainer />;
// };
