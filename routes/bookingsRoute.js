const express = require('express');
const router = express.Router();
const Booking = require("../models/booking");
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const Room = require('../models/room');
const stripe = require('stripe')('sk_test_51JZLbOSCixW7mz9zJSTTaK5DxsdJz1uuGOCLn4SDBdxNFwa8Ri8qQ3TiMvhTJG6PrbeCtRzi3H7LqDo6J5uRIT4g00RsmMRzco')




router.post('/bookroom', async (req, res) => {

    const {
        room,
        userid,
        fromDate,
        toDate,
        totalAmount,
        totalDays,
        token
    } = req.body

    try {
        
        const customer = await stripe.customers.create({
            email : token.email,
            source : token.id
        })

        const payment = await stripe.charges.create(
            
            {
                amount : totalAmount*100,
                customer : customer.id,
                currency : 'INR',
                receipt_email : token.email
            },{
                idempotencyKey : uuidv4()
            }
        )

        if(payment){

            
                const newbooking = new Booking({
                    room: room.name,
                    roomid: room._id,
                    userid,
                    fromDate: moment(fromDate).format('DD-MM-YYYY'),
                    toDate: moment(toDate).format('DD-MM-YYYY'),
                    totalAmount,
                    totalDays,
                    transactionId: '1234'
                })
        
                const booking = await newbooking.save()
        
                const roomtemp = await Room.findOne({_id: room._id})
        
                roomtemp.currentbookings.push({ 
                    bookingid: booking._id, 
                    fromDate: moment(fromDate).format('DD-MM-YYYY'), 
                    toDate: moment(toDate).format('DD-MM-YYYY'), 
                    userid : userid, status : booking.status });
        
                await roomtemp.save()
        
                res.send('Room booked succesfully');
        
            
        }

        res.send('Payment Successful, Your Room is Booked')

    } catch (error) {
        return res.status(400).json({ error });
    }



    

});

router.post("/getbookingsbyuserid", async(req, res) => {
    
    const userid = req.body.userid

    try {
        const bookings = await Booking.find({ userid : userid })
        res.send(bookings)
    } catch (error) {   
        return res.status(400).json({ error })
    }

});

router.post("/cancelbooking", async(req, res) => {
    const {bookingid , roomid} = req.body

    try {
        const bookingitem = await Booking.findOne({_id : bookingid})

        bookingitem.status = 'cancelled'
        await bookingitem.save()

        const room = await Room.findOne({ _id : roomid })

        const bookings = room.currentbookings

        const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)
        room.currentbookings = temp

        await room.save()

        res.send('Your Booking Has Been Cancelled Successfully')



    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.get("/getallbookings", async(req, res) => {

    try {
        const bookings = await Booking.find()
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error });
    }

});

module.exports = router;