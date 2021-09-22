import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';

function Bookingscreen({ match }) {
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [room, setroom] = useState();
    const [totalAmount, settotalAmount] = useState(); 

    const roomid = match.params.roomid
    const fromDate = moment(match.params.fromDate, 'DD-MM-YYYY')
    const toDate = moment(match.params.toDate, 'DD-MM-YYYY')

    const totalDays = moment.duration(toDate.diff(fromDate)).asDays()+1;
    
    
    useEffect(async () => {

        if(!localStorage.getItem('currentUser')){
            window.location.reload='/login'; 
        }

        try {
            setloading(true);
            const data = (await axios.post("/api/rooms/getroombyid", { roomid: match.params.roomid })).data;

            settotalAmount(data.rentperday * totalDays)
            setroom(data);
            setloading(false);
        } catch (error) {
            seterror(true);
            setloading(false);

        }
    }, []);

    

    async function onToken(token){
        console.log(token);
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromDate,
            toDate,
            totalAmount,
            totalDays,
            token
        }

        try {
            setloading(true);
            const result = await axios.post('/api/bookings/bookroom', bookingDetails);
            setloading(false);
            Swal.fire('Congratulations' , 'Your Room Booked Successfully' , 'success').then(result => {
                window.location.href='/bookings';
            })
               
        } catch (error) {
            setloading(false);
            Swal.fire('Oops!' , 'Something went wrong' , 'error')
        }
    }

    return (
        <div className='m-4'>
            {loading ? (<Loader/>) : error ? (<Error/>) : (<div>


                <div className='row justify-content-center mt-5 bs'>
                    <div className='col-md-6'>
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg' />
                    </div>

                    <div className='col-md-6'>
                        
                        <div style={{textAlign: 'right'}}>
                            <b>
                            <h1>Booking Details</h1>
                            <hr />
                            <p>Name :{" "}{JSON.parse(localStorage.getItem("currentUser")).name}</p>
                            <p>From Date : {match.params.fromDate} </p>
                            <p>To Date : {match.params.toDate} </p>
                            <p>Max Count : {room.maxcount} </p>
                            </b>
                        </div>

                        <div style={{textAlign: 'right'}}>
                            <h1>Amount : </h1>
                            <hr />
                            <p>Total Days : {totalDays}  </p>
                            <p>Rent per day : {room.rentperday} </p>
                            <p>Total Amount : {totalAmount}  </p>

                            <div style={{ float: 'right' }}>
                                
                                <StripeCheckout
                                    amount={totalAmount*100}
                                    token={onToken}
                                    currency='inr'
                                    stripeKey="pk_test_51JZLbOSCixW7mz9zhsUdbGfNADwTh4FMjjotnnnOntKRHi9jpdOrfG8Svx4aD2G4MlvTwNCERifnVgIRRKKOgN5Q00j6MFZrch"
                                    
                                    >
                                        <button className='btn btn-primary'>Pay Now{" "}</button>
                                </StripeCheckout>
                            </div>

                        </div>

                    </div>

                </div>

            </div>)}
        </div>
    );
}

export default Bookingscreen;

