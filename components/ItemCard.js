import styles from '../styles/Home.module.css'
import Image from 'next/image'

function ItemCard(props) {

    function chooseProduct() {
        props.openProductInfo({
            id: props.item.id,
            name: props.item.name,
            photo: props.item.photo,
            priceSmall: props.item.priceSmall,
            priceMedium: props.item.priceMedium,
            priceBig: props.item.priceBig,
        })
    }

    return (
        <div onClick={()=>{chooseProduct()}} key={props.item.name} className={styles.itemCard}>
          <div className={styles.itemCardPhoto}>
            <Image width='350px' height='250px' src={props.item.photo} />
          </div>
          <div className={styles.itemCardInfo}>
            <h3>{props.item.name}</h3>
            <p>Cena: {props.item.priceSmall} / {props.item.priceMedium} / {props.item.priceBig} zł.</p>
            </div>
        </div>
    )
}

export default ItemCard
