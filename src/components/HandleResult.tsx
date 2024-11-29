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
            result.error?.data?.errors?.forEach((err: any) => toast.error(err));
        }

        if (result.isSuccess && result.data) {
            const { _token, user } = result.data.data || {};

            console.log("result.data", result.data);
            if (result.data.token) {
                setItem(RoutePaths.token, result.data.token);
                setItem('user', result.data.user);

                // navigate(user.admin ? RoutePaths.admin : RoutePaths.userAccount);
                navigate(RoutePaths.userAccount);

            }

            toast.success(result.data.message);
        }
    }, [result, navigate]);

    return (
        <ToastContainer />
    );
};
