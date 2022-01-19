import Head from 'next/head'
import styles from '../styles/Home.module.css'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HelpIcon from '@mui/icons-material/Help';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState, useRef, useEffect } from 'react';
import AddProductPage from '../components/AddProductPage';
import ItemCard from '../components/ItemCard';
import CancelIcon from '@mui/icons-material/Cancel';
import { query, collection, getDocs } from "firebase/firestore";
import { db } from '../lib/firebase';
import Link from 'next/link'

export default function Home(props) {

  const pizzas = useRef(null);
  const burgers = useRef(null);
  const kebabs = useRef(null);
  const addons = useRef(null);
  const drinks = useRef(null);

  const [price, setPrice] = useState(0)
  const [help, setHelp] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [basketProducts, setBasketProducts] = useState([])

  useEffect(()=>{
    if (localStorage.getItem('cheapfoodsItems')) {
      setBasketProducts(JSON.parse(localStorage.getItem('cheapfoodsItems')))
    }
    if (localStorage.getItem('cheapfoodsPrice')) {
      setPrice(Number(localStorage.getItem('cheapfoodsPrice')))
    } else {
      setBasketProducts([])
      setPrice(0)
    }
  },[])

  useEffect(() => {
    localStorage.setItem('cheapfoodsItems', JSON.stringify(basketProducts))
    localStorage.setItem('cheapfoodsPrice', price)
  }, [basketProducts, price])

  function updateBasket(opt, val, id, size, name, photo) {
    if (opt === 'add') {
      setPrice(price += val)
      setBasketProducts([...basketProducts, {id: id, size: size, name: name, price: val, photo: photo}])
    }
  }

  function openProductInfo(item) {
    if (currentProduct === null) {
      setCurrentProduct(item)
    }
  }
  
  function closeProductInfo () {
    setCurrentProduct(null)
  }

  function scroll(item) {
    item.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    })
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>Cheap Foods</title>
        <meta name="Cheap Foods" content="Jedzenie na każdą kieszeń." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className={styles.header}>
      <HelpIcon onClick={()=>{setHelp(true)}}className={styles.navIcon} fontSize='large' />
      <div className={styles.logo}>
        <FastfoodIcon fontSize='large' />
        <h1>Cheap Foods</h1>
      </div>
      <Link href='/checkout'><ShoppingCartIcon className={styles.navIcon} fontSize='large' /></Link>
    </div>
    <hr />
    <div className={styles.navbar}>
      <div onClick={()=>{scroll(pizzas)}} className={styles.navbarBtn}><h3>PIZZA</h3></div>
      <div onClick={()=>{scroll(burgers)}} className={styles.navbarBtn}><h3>BURGERY</h3></div>
      <div onClick={()=>{scroll(kebabs)}} className={styles.navbarBtn}><h3>KEBABY</h3></div>
      <div onClick={()=>{scroll(addons)}} className={styles.navbarBtn}><h3>DODATKI</h3></div>
      <div onClick={()=>{scroll(drinks)}} className={styles.navbarBtn}><h3>NAPOJE</h3></div>
    </div>
    <hr />
    <div className={styles.products}>
    <div ref={pizzas} className={styles.productsHeader}><h3>PIZZE</h3></div>
    {props.products.map((item) => {
      if (item.type === 'pizza') {
        return (
          <ItemCard key={item.id} item={item} openProductInfo={openProductInfo} />
          ) 
        }
      })
    }
    <div ref={burgers} className={styles.productsHeader}><h3>BURGERY</h3></div>
    {props.products.map((item) => {
      if (item.type === 'burger') {
        return (
          <ItemCard key={item.id} item={item} openProductInfo={openProductInfo} />
          ) 
        }
      })
    }
    <div ref={kebabs} className={styles.productsHeader}><h3>KEBABY</h3></div>
    {props.products.map((item) => {
      if (item.type === 'kebab') {
        return (
          <ItemCard key={item.id} item={item} openProductInfo={openProductInfo} />
          ) 
        }
      })
    }
    <div ref={addons} className={styles.productsHeader}><h3>DODATKI</h3></div>
    {props.products.map((item) => {
      if (item.type === 'dodatek') {
        return (
          <ItemCard key={item.id} item={item} openProductInfo={openProductInfo} />
          ) 
        }
      })
    }
    <div ref={drinks} className={styles.productsHeader}><h3>NAPOJE</h3></div>
    {props.products.map((item) => {
      if (item.type === 'napoj') {
        return (
          <ItemCard key={item.id} item={item} openProductInfo={openProductInfo} />
          ) 
        }
      })
    }  
    </div>
    {currentProduct === null &&
      <div className={styles.addProduct}></div>
    }
    {currentProduct !== null &&
      <div className={`${styles.addProduct} ${styles.addProductSlideIn}`}>
      <AddProductPage updateBasket={updateBasket} closeProductInfo={closeProductInfo} currentProduct={currentProduct} />
    </div>
    }
    {help === false &&
      <div className={styles.help}></div>
    }
    {help === true &&
      <div className={`${styles.help} ${styles.helpSlideIn}`}>
        <div className={styles.helpInfo}>
          <div className={styles.helpInfoCredentials}>
            <h3>Kontakt</h3>
            <h3>Cheap Foods Polska Sp. z o. o.</h3>
            <h3>+48 123 456 789</h3>
            <h3>ul. Lorem Ipsum 12‑345</h3>
            <h3>Poznań</h3>
            <div className={styles.backButton}>
              <CancelIcon onClick={()=>{setHelp(false)}} className={styles.backIcon} fontSize='large' />
            </div>
          </div>
        </div>
      </div>
    }
    <Link href='/checkout'><div className={styles.priceTag}>
      <h1>Koszyk : {price.toFixed(2)} zł</h1>
    </div></Link>
    </div>
  )
}

export async function getStaticProps(context) {
  
  let products = []

  const q = query(collection(db, "products"))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });
  return {
    props: {products},
  }
}