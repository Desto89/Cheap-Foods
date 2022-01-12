import styles from '../styles/AddProduct.module.css'
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProductPage(props) {

    const [price, setPrice] = useState(props.currentProduct.priceSmall)
    const [size, setSize] = useState(0)

    function updateSize(e) {
        setPrice(Number(e.target.value))
        setSize(e.target.selectedIndex)
    }

    function addToBasket() {
        toast.success('Koszyk zaktualizowany!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            });
        props.updateBasket('add', price, props.currentProduct.id, size, props.currentProduct.name, props.currentProduct.photo)
    }

    return (
        <div className={styles.addProductPage}>
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
            <div className={styles.productInfo}>
                <h3>{props.currentProduct.name}</h3>
            </div>
            <div className={styles.pickSize}>
                <h3>Wybierz rozmiar</h3>
                <select onChange={(e)=>{updateSize(e)}} id={styles.pickSizeMenu}>
                    <option value={props.currentProduct.priceSmall}>Mały</option>
                    <option value={props.currentProduct.priceMedium}>Średni</option>
                    <option value={props.currentProduct.priceBig}>Duży</option>
            </select>
            </div>
            <div className={styles.price}>
                <h3>Kwota: {price} zł.</h3>
            </div>
            <div onClick={()=>{addToBasket()}} className={styles.addToBasketBtn}>
                <h3>Dodaj do koszyka</h3>
            </div>
            <div className={styles.backButton}>
                <CancelIcon onClick={() => {props.closeProductInfo()}} className={styles.backIcon} fontSize='large' />
            </div>
        </div>
    )
}

export default AddProductPage
