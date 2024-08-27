require('dotenv').config();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const handleOrder = async (req, res) => {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_SECRET;
    const razorpay = new Razorpay({
        key_id: key_id,
        key_secret: key_secret,
    });
    const options = req.body;

    try{
        const order = await razorpay.orders.create(options);
    
        if(!order) {
            return res.status(500).json({
                message: "Some error occurred"
            });
        }
    
        return res.status(200).json(order);
    }
    catch(err){
        return res.status(500).json({
            message: "Some error occurred"
        });
    }
}

const handleOrderValidation = async (req, res) => {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

    const sha = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const digest = sha.digest('hex')
    if(digest !== razorpay_signature){
        return res.status(400).json({
            message: "Transaction is Invalid"
        });
    }
    res.status(200).json({
        message: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
    });
}

module.exports = {
    handleOrder,
    handleOrderValidation
}