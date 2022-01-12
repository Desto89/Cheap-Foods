import styles from '../styles/Home.module.css'
import Image from 'next/image'

function ItemCard(props) {

    function chooseProduct() {
        props.openProductInfo({
            id: props.item.id,
            name: props.item.name,
            photo: props.item.photo,
            priceSmall: props.item.priceSmall,
            smallSize: props.item.smallSize,
            priceMedium: props.item.priceMedium,
            mediumSize: props.item.mediumSize,
            priceBig: props.item.priceBig,
            bigSize: props.item.bigSize
        })
    }

    return (
        <div onClick={()=>{chooseProduct()}} key={props.item.name} className={styles.itemCard}>
          <div className={styles.itemCardPhoto}>
            <Image width={200} height={150} src={props.item.photo} />
          </div>
          <div className={styles.itemCardInfo}>
            <h3 style={{margin:'10px 0px', textAlign:'center'}}>{props.item.name}</h3>
            <p className={styles.itemPriceTag}>Cennik:</p>
            <p className={styles.itemPriceTag}>{props.item.priceSmall} zł.</p>
            <p className={styles.itemPriceTag}>{props.item.priceMedium} zł.</p>
            <p className={styles.itemPriceTag}>{props.item.priceBig} zł.</p>
            </div>
        </div>
    )
}

export default ItemCard
