import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import paypalClient from '../config/paypal.js'
import checkoutNodeJssdk from '@paypal/checkout-server-sdk'

// global variables
const currency = 'inr'
const deliveryCharge = 10

const markTraditionalProductsOutOfStock = async (items) => {
    const traditionalItems = items.filter(item => item.category === "Traditional");

    const updatePromises = traditionalItems.map(async (item) => {
        await productModel.findByIdAndUpdate(item._id, { outOfStock: true });
    });

    await Promise.all(updatePromises);
};

// Placing orders using COD Method
const placeOrder = async (req,res) => {
    
    try {
        
        const { userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await markTraditionalProductsOutOfStock(items)

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const verifyPaypal = async (req,res) => {
    try {
        
        const { userId, paypal_order_id  } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({ success: true, message: "Payment Successful" })
        } else {
             res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const capturePaypalOrder = async (req, res) => {
  try {
    const { orderID } = req.body;
    const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await paypalClient().execute(request);

    if (capture.result.status === "COMPLETED") {
      const receipt = capture.result.purchase_units[0].payments.captures[0].id;

      // Marchează plata ca efectuată
      await orderModel.findOneAndUpdate({ paymentMethod: "PayPal", payment: false, 'items.0': { $exists: true } }, { payment: true });

      res.json({ success: true, receipt });
    } else {
      res.json({ success: false, message: "Not Completed" });
    }

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


const createPaypalOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "PayPal",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await markTraditionalProductsOutOfStock(items);

    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: amount.toFixed(2)
        }
      }]
    });

    const order = await paypalClient().execute(request);
    res.json({ success: true, orderID: order.result.id });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



// All Orders data for Admin Panel
const allOrders = async (req,res) => {

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// User Order Data For Forntend
const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// update order status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const getTopCustomers = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    const userStats = {};

    for (const order of orders) {
      const uid = order.userId;
      if (!userStats[uid]) {
        userStats[uid] = { userId: uid, totalAmount: 0, orderCount: 0 };
      }
      userStats[uid].totalAmount += order.amount;
      userStats[uid].orderCount += 1;
    }

    const sorted = Object.values(userStats).sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 3);

    const enriched = await Promise.all(
      sorted.map(async (entry) => {
        const user = await userModel.findById(entry.userId).select('fullName');
        return {
          userId: entry.userId,
          fullName: user ? user.fullName : 'Unknown User',
          totalAmount: entry.totalAmount,
          orderCount: entry.orderCount
        };
      })
    );

    res.json({ success: true, customers: enriched });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


export {capturePaypalOrder, createPaypalOrder,placeOrder, allOrders, userOrders, updateStatus,getTopCustomers}