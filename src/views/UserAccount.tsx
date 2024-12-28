import { useState, useEffect, SyntheticEvent, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from 'react'
import Header from './includes/Header'
import Footer from './includes/Footer'
import { Link, useNavigate } from 'react-router-dom'
import RoutePaths from '../config'
import { toggleLinkClass, User, buildCheckoutData, getTotal, removeItem } from '../Utils/Generals'
import { useGetUserQuery, useUpdateUserMutation } from '../store/apiquery/usersApiSlice'
import Spinner from '../components/Spinner'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import LoadingButton from '../components/LoadingButton'
import Swal from 'sweetalert2'
import { useGetCommandQuery } from '../store/apiquery/CommandApiSlice'
import { connect } from 'react-redux'
import { HandleResult } from "../components/HandleResult";
import { useGetCheckoutMutation, useGetUserAddressQuery } from "../store/apiquery/productApiSlice";


export const UserDashboard = () => {
    return (
        <div className="user-dashboard p-3 border border-2 text-black">
            <h3>Dashboard</h3>
            <p className="opacity-75">From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details</p>
            <aside className=''>
                <div><Link to={RoutePaths.userAccount} className={`d-block p-3 text-black ${toggleLinkClass(RoutePaths.userAccount)}`}>Dashboard<i className="bi bi-house float-end"></i></Link></div>
                <div><Link to={RoutePaths.userOrders} className={`d-block p-3 text-black ${toggleLinkClass(RoutePaths.userOrders)}`}>Orders<i className="bi bi-bookmark-fill float-end"></i></Link></div>
                <div><Link to={RoutePaths.userAdress} className={`d-block p-3 text-black ${toggleLinkClass(RoutePaths.userAdress)}`}>Address<i className="bi bi-envelope float-end"></i></Link></div>
                <div><Link to={RoutePaths.userDetails} className={`d-block p-3 text-black ${toggleLinkClass(RoutePaths.userDetails)}`}>Account Details<i className="bi bi-person float-end"></i></Link></div>
                {/* <div><a href='#' className="d-block p-3 text-black" onClick={logoutUser}>Logout<i className="bi bi-person-slash float-end"></i></a></div> */}
            </aside>
        </div>
    )
}

export const UserOrders = () => {

    const user: User = useAppSelector(state => state.user);
    // let content: React.ReactHTMLElement<HTMLElement> = <></>;
    const { data: userdata, isLoading: userloading } = useGetUserQuery({});
    const { data, isLoading } = useGetCommandQuery(userdata?.id);




    useEffect(() => {

        if (data) {
            console.log('Fetched Data:', data);
            if (userdata) {
                console.log('User Address:', userdata);
            }
        }
    }, [data]);

    if (isLoading || userloading) {
        return <Spinner />;
    }

    if (!data) {
        return <div>No orders available.</div>;
    }


    return (
        <div className="user-orders p-3 border border-2 text-black">
            <h3>Orders</h3>
            <div className="table-responsive">
                {
                    !isLoading ?
                        <table className="table table-default table-bordered text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Product image</th>
                                    {/* <th scope="col">Status</th> */}
                                    <th scope="col">Total</th>
                                    {/* <th scope="col">Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {data?.orders.map((orders: {
                                    address: any
                                    product: any; id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; date: string | number | Date; status: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; total: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined
                                }) => (
                                    <tr >
                                        <td>{orders?.address.name}</td>
                                        <td>{new Date(orders.date).toLocaleDateString()}</td>
                                        <td>{orders?.product.name}</td>
                                        {/* <td>{orders.status}</td> */}
                                        <td><img className='img-fluid overflow-scroll' style={{ maxWidth: '100px', height: 'auto' }} src={orders?.product.image} alt="Product" /></td>
                                        <td>{orders.product.price}</td>
                                        {/* <td>
                                            <Link to={`/order/${orders.id}`} >View</Link>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table> :

                        <Spinner />
                }
            </div>

        </div>
    )
}

export const UserAddress = () => {

    const user: User = useAppSelector(state => state.user);

    return (
        <div className="user-address p-3 border border-2 text-black">
            <h3>Billing Address</h3>
            <div className="opacity-75">
                <h6>{user.address}</h6>
                <h6><span className="fw-bold">Mobile:</span>(229) {user.phone}</h6>
            </div>
        </div>
    )
}

export const UserDetails = () => {

    const { data: userData, isSuccess, isError: useError } = useGetUserQuery("");
    const { data: userAddresses, isSuccess: addressSuccess, isError: addressError } = useGetUserAddressQuery(userData?.id);

    const user: User = useAppSelector((state) => state.user);
    const data = buildCheckoutData();
    const [getCheckout, result] = useGetCheckoutMutation();


    //  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //      const { value, checked } = e.target;

    //      setFormData((prevData) => ({
    //          ...prevData,
    //          payment_method: checked ? value : "",  // If checked, set value; if unchecked, set empty
    //      }));
    //  };


    const [formData, setFormData] = useState({
        address: "",
        country: "",
        State: "",
        City: "",
        post_code: "",
        email: userData?.email || "",
        name: userData?.name || "",
        phone: userData?.phone || "",

    });
    console.log("userData", userData)

    // const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);



    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // const handleAddressSelection = (index: number) => {
    //     setSelectedAddressIndex(index);
    // };

    const contact = {
        user_id: userData?.id,
        // product_id: data?.commands[0]?.product_id,
        ...formData, 
    };

    const submitCheckout = (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            console.log("Submitting Checkout:", contact);
            getCheckout(contact); 
        } catch (error) {
            console.error("Checkout Error:", error);
        }
    };

    // const [activeIndex, setActiveIndex] = useState(null);

    // const handleClick = (index: number | React.SetStateAction<null>) => {
    //     setActiveIndex(index);
    //     handleAddressSelection(index);
    // };

    console.log(contact)

    return (
        <div className="user-edit-details p-3 border border-2 text-black">
            <h3>Account Details</h3>
            <form
                action=""
                method="post"
                className="checkout-service p-3 bg-white col-12 col-lg-8 border border-1"
            >
                <h4 className="fw-bold">Billing Details</h4>
                <hr />
                <HandleResult result={result} />
                <div className="d-flex gap-2 mt-5">
                    <label className="w-100">
                        <span>Name *</span>
                        <input
                            type="text"
                            name="name"
                            // defaultValue={user.firstname }
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control w-100 rounded-0 p-2"
                        />
                    </label>
                    {/* <label className='w-50'>
                                       <span>Last Name *</span>
                                       <input type="email" name="lastname" defaultValue={user.lastname || ''}  className="form-control w-100 rounded-0 p-2" />
                                   </label> */}
                </div>
                <div className="my-4">
                    <label className="w-100">
                        <span>Email *</span>
                        <input
                            type="email"
                            name="email"
                            // defaultValue={user.email }
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control w-100 rounded-0 p-2"
                        />
                    </label>
                </div>
                <div>
                    <label className="w-100">
                        <span>Phone *</span>
                        <input
                            type="text"
                            name="phone"
                            // defaultValue={user.phone }
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control w-100 rounded-0 p-2"
                        />
                    </label>
                </div>


                <div className="my-4">
                    <label className="w-100">
                        <span>country *</span>
                        <input
                            type="country"
                            name="country"
                            // defaultValue={user.email }
                            value={formData.country}
                            onChange={handleChange}
                            className="form-control w-100 rounded-0 p-2"
                        />
                    </label>
                </div>




                <div>
                    <label className="w-100">
                        <span>State *</span>
                        <input
                            type="text"
                            name="State"
                            // defaultValue={user.phone }
                            value={formData.State}
                            onChange={handleChange}
                            className="form-control w-100 rounded-0 p-2"
                        />
                    </label>
                </div>
                <div>
                    <label className="w-100">
                        <span>City *</span>
                        <input
                            type="text"
                            name="City"
                            // defaultValue={user.phone }
                            value={formData.City}
                            onChange={handleChange}
                            className="form-control w-100 rounded-0 p-2"
                        />
                    </label>
                </div>
                <div>
                    <label className="w-100">
                        <span>Address *</span>
                        <input
                            type="text"
                            name="address"
                            // defaultValue={user.address}
                            value={formData.address}
                            onChange={handleChange}
                            className="form-control w-100 rounded-0 p-2"

                        />
                    </label>
                </div>

                <LoadingButton loadingState={result.isLoading}>
                    <div>
                        <a
                            href="#"
                            className="fd-btn w-50 text-center"
                            onClick={submitCheckout}
                        >
                            PLACE ORDER
                        </a>
                    </div>
                </LoadingButton>
            </form>
        </div>
    )
}

const UserAccount = ({ currentComponent = <UserDashboard /> }: { currentComponent?: React.ReactNode }) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutUser = (e: SyntheticEvent) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure to logout ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout it!'
        }).then((r) => {
            if (r.isConfirmed) {
                removeItem(RoutePaths.token);
                removeItem('user');
                // dispatch(logoutCurrentUser)
                navigate(RoutePaths.home)
            }
        })
    }

    return (
        <>
            <Header />
            <div className='row justify-content-between gap-3 px-3 px-lg-5 my-5 w-100'>
                <aside className='user-page col-12 col-lg-3 fw-bold border border-1 h-25'>
                    <div><Link to={RoutePaths.userAccount} className={`d-block p-3 text-black ${toggleLinkClass(RoutePaths.userAccount)}`}>Dashboard<i className="bi bi-house float-end"></i></Link></div>
                    <div><Link to={RoutePaths.userOrders} className={`d-block p-3 text-black ${toggleLinkClass(RoutePaths.userOrders)}`}>Orders<i className="bi bi-bookmark-fill float-end"></i></Link></div>
                    <div><Link to={RoutePaths.userAdress} className={`d-block p-3 text-black ${toggleLinkClass(RoutePaths.userAdress)}`}>Address<i className="bi bi-envelope float-end"></i></Link></div>
                    <div><Link to={RoutePaths.userDetails} className={`d-block p-3 text-black ${toggleLinkClass(RoutePaths.userDetails)}`}>Account Details<i className="bi bi-person float-end"></i></Link></div>
                    <div><a href='#' className="d-block p-3 text-black" onClick={logoutUser}>Logout<i className="bi bi-person-slash float-end"></i></a></div>
                </aside>
                <div className="col-12 col-lg-8 mt-3">{currentComponent}</div>
                {/* // !isFetching && !isError ? <div className="w-75 mt-3">{currentComponent}</div> :
                // <Spinner /> */}
            </div>
            <Footer />
        </>
    )
}

export default UserAccount