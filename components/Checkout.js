import { useEffect, useState } from 'react'
import styles from '../styles/Checkout.module.css'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Checkout() {

    const [items, setItems] = useState([])
    const [currPrice, setCurrPrice] = useState(0)

    useEffect(()=>{
        let arr = []
        if (JSON.parse(localStorage.getItem('cheapfoodsItems'))) {
            const storageItems = JSON.parse(localStorage.getItem('cheapfoodsItems'))
            storageItems.map((item) => {
                arr.push(item)
            })
        setItems(arr)
       }
       setCurrPrice(localStorage.getItem('cheapfoodsPrice'))
       console.log(currPrice)
    }, [])

    useEffect(()=>{
        localStorage.setItem('cheapfoodsItems', JSON.stringify(items))
        localStorage.setItem('cheapfoodsPrice', currPrice)
    },[items, currPrice])

    function removeFromBasket(index) {
        toast.success('Koszyk zaktualizowany!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            });
        let dummyArr = items.slice()
        dummyArr.splice(index, 1)
        setItems(dummyArr)
        let priceToRemove = items[index].price
        setCurrPrice((currPrice -= priceToRemove).toFixed(2))
    }

    return (
        <div className={styles.checkout}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={styles.header}>
                <h1>Koszyk</h1>
                <hr />
            </div>
            {items.length === 0 &&
                <div className={styles.emptyBasket}>
                    <h1>Koszyk jest pusty</h1>
                </div>
            }
            {items.length > 0 &&
                items.map((item, index) => {
                    return (
                        <div key={item.id} className={styles.basketItemCard}>
                            <div className={styles.basketItemCardPhoto}>
                                <Image width='150%' height='100%' src={item.photo} />
                            </div>
                            <div className={styles.basketItemCardInfo}>
                                <h1>{item.name}&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                                <h1>Rozmiar: {item.size}&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                                <h1>Cena: {item.price} pln.&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                            </div>
                            <div className={styles.removeBtnContainer}>
                             <div onClick={()=>{removeFromBasket(index)}} className={styles.removeBtn}><h1>X</h1></div>
                            </div>
                        </div>
                    )
                })
            }
            <hr />
            <div className={styles.priceToPay}>
                <h1>Kwota: {currPrice} pln.</h1>
            </div>
            <div className={styles.customerData}>
                <div className={styles.customerDataHeader}>
                    <h1>Dane odbiorcy</h1>
                </div>
                <div className={styles.customerDataInputs}>
                <form action="/checkout" method="post">
                    <input type="text" id="fname" name="fname" placeholder='Imię' required />
                    <input type="text" id="lname" name="lname" placeholder='Nazwisko' required/><br />
                    <input style={{width: 'calc(90% + 20px)'}} type="text" id="adres" name="adres" placeholder='Adres' required/><br />
                    <input type="text" id="kodPocztowy" name="kodPocztowy" placeholder='Kod pocztowy' required />
                    <input type="text" id="miasto" name="miasto" placeholder='Miasto' required/><br />
                    <input style={{width: 'calc(90% + 20px)'}} type="text" id="numer" name="numer" placeholder='Numer telefonu' required/><br />
                    <input style={{width: 'calc(90% + 20px)'}} type="email" id="email" name="email" placeholder='Email' required/><br />
                    <input id='sbmt' style={{display:'none'}} type="submit" value="Submit" />
                </form>
                </div>
            </div>
            <div onClick={()=>{document.getElementById('sbmt').click()}} className={styles.submit}>
                <h1>Zamów</h1>
            </div>
            
        </div>
    )
}

export default Checkout
