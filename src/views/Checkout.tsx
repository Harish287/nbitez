import React, { useState, useEffect } from "react";
import Header from "./includes/Header";
import Banner from "../components/Banner";
import Footer from "./includes/Footer";
import { useAppSelector } from "../hooks/redux-hooks";
import { User, buildCheckoutData, getTotal } from "../Utils/Generals";
import { HandleResult } from "../components/HandleResult";
import LoadingButton from "../components/LoadingButton";
import { useGetCheckoutMutation } from "../store/apiquery/productApiSlice";
import { useGetUserQuery } from "../store/apiquery/usersApiSlice";
import { useGetUserAddressQuery } from "../store/apiquery/productApiSlice";

const Checkout = () => {
    const { data: userData, isSuccess, isError: useError } = useGetUserQuery("");
    const { data: userAddresses, isSuccess: addressSuccess, isError: addressError } = useGetUserAddressQuery(userData?.id);

    const user: User = useAppSelector((state) => state.user);
    const data = buildCheckoutData();
    const [getCheckout, result] = useGetCheckoutMutation();


    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            payment_method: checked ? value : "",  // If checked, set value; if unchecked, set empty
        }));
    };


    // Set up state to store form data
    const [formData, setFormData] = useState({
        address: "",
        country: "",
        State: "",
        City: "",
        post_code: "",
        email: userData?.email || "",
        name: userData?.name || "",
        phone: userData?.phone || "",
        // payment_method: "",
    });
    console.log("userData", userData)

    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

    useEffect(() => {
        if (addressSuccess && userAddresses?.shippingAddress?.length > 0) {
            const selectedAddress = userAddresses.shippingAddress[selectedAddressIndex];
            setFormData({
                address: selectedAddress.address,
                country: selectedAddress.country,
                State: selectedAddress.state,
                City: selectedAddress.city,
                post_code: "",
                email: userData.email,
                name: selectedAddress.name,
                phone: selectedAddress.phone,
                // payment_method: formData.payment_method,
            });
        }
    }, [addressSuccess, selectedAddressIndex, userAddresses]);

    // Handle form input change
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddressSelection = (index: number) => {
        setSelectedAddressIndex(index);
    };

    const contact = {
        user_id: userData?.id,
        product_id: data?.commands[0]?.product_id,
        ...formData,  // Spread formData here to send all the form data
    };

    const submitCheckout = (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            console.log("Submitting Checkout:", contact);
            getCheckout(contact);  // Call your checkout mutation
        } catch (error) {
            console.error("Checkout Error:", error);
        }
    };

    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index: number | React.SetStateAction<null>) => {
        setActiveIndex(index);
        handleAddressSelection(index);
    };

    return (
        <>
            <Header />
            <Banner page="Checkout" path={["Home", "Checkout"]} />

            <div className="checkout-page row gap-3 justify-content-between px-3 px-lg-5 my-5 text-black">
                <div>
                    <h4 className="fw-bold">Billing Address</h4>

                    <div className="row">
                        {userAddresses?.shippingAddress.slice(0, 3).map((address, index) => (
                            <div key={index} className="col-12 col-md-4 mb-3">
                                <div
                                    className={`card p-3 border ${activeIndex === index ? 'active-card' : ''}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleClick(index)}
                                >
                                    <h6 className="card-title">{address.address}</h6>
                                    <p className="card-text">{address.city}, {address.state}</p>
                                    <p className="card-text">{address.country}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
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
                    {/* <div className='my-4'>
                        <label className='d-flex gap-2 w-100'>
                            <div><input type="checkbox" name="adress_skip" /></div>
                            <span>Ship to a different address?</span>
                        </label>
                    </div> */}
                    {/* <div>
                        <label>
                            <span>Orders notes (Optional)</span>
                        </label>
                        <textarea name="orderNotes" cols={100} rows={10} className='w-100 p-2 border'></textarea>
                    </div> */}
                </form>
                <div className="col-12 col-lg-3 checkout-validate">
                    <div className="bg-white p-3 border border-1">
                        <h5 className="fw-bold">Checkout Summary</h5>
                        <hr />
                        <div className="opacity-75">
                            <div>
                                <span className="fw-bold">Sutotal :</span>
                                <span className="float-end opacity-75">₹{getTotal()}</span>
                            </div>
                            <hr />
                            <div>
                                <span className="fw-bold">Coupon :</span>
                                <span className="float-end opacity-75">₹0.00</span>
                            </div>
                            <hr />
                            <div>
                                <span className="fw-bold">Total :</span>
                                <span className="float-end opacity-75">₹{getTotal()}</span>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="bg-white p-3 border border-1 mt-4">
                        <h5 className="fw-bold">Payment Method</h5>
                        <hr />
                        <form action="" method="post">
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value="direct_bank_transfer"
                                    name="payment_method"
                                    id="directBankTransfer"
                                    checked={formData.payment_method === "direct_bank_transfer"}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                                <label className="form-check-label" htmlFor="directBankTransfer">
                                    Direct bank transfer
                                </label>
                            </div>

                            <div className="form-check my-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value="cash_on_delivery"
                                    name="payment_method"
                                    id="cashOnDelivery"
                                    checked={formData.payment_method === "cash_on_delivery"}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                                <label className="form-check-label" htmlFor="cashOnDelivery">
                                    Cash on delivery
                                </label>
                            </div>

                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value="check_payments"
                                    name="payment_method"
                                    id="checkPayments"
                                    checked={formData.payment_method === "check_payments"}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                                <label className="form-check-label" htmlFor="checkPayments">
                                    Check payments
                                </label>
                            </div>

                            <div className="form-check my-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value="bank_transfer"
                                    name="payment_method"
                                    id="bankTransfer"
                                    checked={formData.payment_method === "bank_transfer"}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                                <label className="form-check-label" htmlFor="bankTransfer">
                                    Bank transfer
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
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
