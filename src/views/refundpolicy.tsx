import React from 'react';
import Footer from './includes/Footer';
import Header from './includes/Header';

const RefundPolicy: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="refund-policy-container">
      <div className="refund-policy-box">
        <h1>Refund Policy</h1>

        <p>
          Returns is a scheme provided by respective sellers directly under this policy in terms of which the option of exchange, replacement and/or refund is offered by the respective sellers to you. All products listed under a particular category may not have the same returns policy. For all products, the returns/replacement policy provided on the product page shall prevail over the general returns policy. Do refer to the respective item's applicable return/replacement/cancellation policy on the product page for any exceptions to this returns policy and the table below.
        </p>

        <p>
          The return policy is divided into three parts; Do read all sections carefully to understand the conditions and cases under which returns will be accepted.
        </p>

        <h3>Note:</h3>
        <ul>
          <li>Items sold up to Rs. 200/- are not eligible for returns/exchange as per the seller's Returns Policy.</li>
          <li>Items sold greater than Rs. 200/- have Replacement with the same product/exchange with the size only as per the seller's Returns Policy.</li>
          <li>For products priced above Rs. 200/-, a return fee of Rs. 40/- is applicable when customers return the product. The refund amount paid to the customer will have a deduction of Rs. 40/- as a return fee. However, replacement and exchange of the product are provided free of cost.</li>
          <li>Cancellations are not allowed for certain products post 24 hours from the time the order is placed by the customer until the delivery of the product by the delivery agent. Customers can cancel the product while being delivered by the delivery agent or refuse to accept the product at the time of delivery.</li>
        </ul>

        <h2>Part 1 – Category, Return Window and Actions Possible</h2>

        <table className="refund-policy-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Returns Window</th>
              <th>Actions Possible</th>
              <th>Conditions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lifestyle: Jewellery, Sari, Dress, Women’s Top, Sandal, Sweatshirt, Backpack, Blanket, Sunglass, Women’s Ethnic Gown, Jeans, Kid’s Dress</td>
              <td>3 days</td>
              <td>Replacement Only</td>
              <td></td>
            </tr>
            <tr>
              <td>Electronics: Trimmer</td>
              <td>3 days</td>
              <td>Replacement Only</td>
              <td></td>
            </tr>
            <tr>
              <td>Lifestyle: Footwear Accessories, Travel Accessories, Watch Accessories, etc.</td>
              <td>3 days</td>
              <td>Replacement Only</td>
              <td></td>
            </tr>
            <tr>
              <td>Lifestyle: Watch, Winter Wear (Blazer, Scarf, Shawl, Jacket, Coat, Sweater, Thermal, Kid’s Thermal, Track Pant, Shrugs), etc...</td>
              <td>3 days</td>
              <td>Refund, Replacement or Exchange</td>
              <td></td>
            </tr>
            <tr>
              <td>Lifestyle: T-Shirt, Footwear, Short, Kid’s (Capri, Shorts & Tops), Men’s (Ethnic Wear, Shirt, Formals, Clothing Accessory), Women’s (Ethnic Wear, Fabric, Blouse, Skirt, Trousers, Bra), Bags, Raincoat, Belt, Frame, Suitcase, Luggage, etc...</td>
              <td>3 days</td>
              <td>Refund or Replacement</td>
              <td></td>
            </tr>
            <tr>
              <td>Books (All books), Sports Equipment, Exercise & Fitness Equipment, Auto Accessories</td>
              <td>3 days</td>
              <td>Replacement Only</td>
              <td>Free replacement will be provided within 3 days if the product is delivered in defective/damaged condition or different from the ordered item.</td>
            </tr>
            <tr>
              <td>Toys, Stationary, Musical Instruments</td>
              <td>3 days</td>
              <td>Replacement Only</td>
              <td>Non-Returnable for Wind Instruments, but free replacement provided for damaged items.</td>
            </tr>
            <tr>
              <td>Mobiles (except Apple & Google phones), Electronics, Small Home Appliances</td>
              <td>7 days</td>
              <td>Replacement Only</td>
              <td>If defect is confirmed, replacement will be provided. After 7 days, customer will be directed to the brand service center.</td>
            </tr>
          </tbody>
        </table>

        <h2>Part 2 – Product Return Process</h2>
        <p>To initiate a return, please follow these steps:</p>
        <ol>
          <li>Log in to your account and go to the 'My Orders' section.</li>
          <li>Click on the 'Return' option next to the order you'd like to return.</li>
          <li>Fill in the details of the reason for return and submit the request.</li>
          <li>If eligible, our support team will guide you on how to return the product.</li>
        </ol>

        <h2>Part 3 – Refund Process</h2>
        <p>Refunds will be processed based on the following:</p>
        <ul>
          <li>If the return is approved, the refund will be processed within 7-10 business days.</li>
          <li>The refund amount will be credited to the original payment method, minus any applicable return fees.</li>
          <li>In case of an exchange, the original amount will be adjusted against the new item.</li>
        </ul>
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
