import axios from 'axios'
import { query, collection, getDocs } from "firebase/firestore";
import { db } from '../../lib/firebase';
export default function handler(req, res) {

  async function downloadData() {
    let dbProducts = []
    const q = query(collection(db, "products"))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      dbProducts.push(doc.data());
  });
  return dbProducts  
}
  
downloadData().then((dbProducts)=>{

  let price = 0
  let products = JSON.parse(req.body.items)
  let productsChecked = []

  products.map((product)=>{
    dbProducts.map((dbProduct) => {
      if (product.id === dbProduct.id) {
        if (product.price === dbProduct.priceSmall) {
          price += product.price
          productsChecked.push({'name': String(product.name), 'size': product.size, 'unitPrice': String((product.price * 100).toFixed(0)), 'quantity': '1'})
        } else if (product.price === dbProduct.priceMedium) {
          price += product.price
          productsChecked.push({'name': String(product.name), 'size': product.size, 'unitPrice': String((product.price * 100).toFixed(0)), 'quantity': '1'})
        } if (product.price === dbProduct.priceBig) {
          price += product.price
          productsChecked.push({'name': String(product.name), 'size': product.size, 'unitPrice': String((product.price * 100).toFixed(0)), 'quantity': '1'})
        }
      }
    })
  })

  // token from public PayU site for testing
  let token = 'd9a4536e-62ba-4f60-8017-6053211d3f47'

  axios.post('https://secure.snd.payu.com/api/v2_1/orders', {
    "notifyUrl": 'https://cheapfoods.vercel.app/api/notify',
    "customerIp": "127.0.0.1",
    "merchantPosId": "300746",
    "description": "Cheap Foods",
    "currencyCode": "PLN",
    "totalAmount": price.toFixed(2) * 100,
    "continueUrl": 'https://cheapfoods.vercel.app/success',

    "buyer": {
      'firstName': req.body.fname,
      'lastName': req.body.lname,
      'adres': req.body.adres,
      'miasto': req.body.miasto,
      'kod': req.body.kod,
      'phone': req.body.numer,
      'email': req.body.email,
      "language": "pl"
  },
  "products": productsChecked
  },
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`

      }
    }
  )
  .then(function (response) {
    res.redirect(response.request.res.responseUrl)
  })
  .catch(function (error) {
    res.send(error);
  });
})

   
  
}
