import { useEffect } from "react"
import Success from "../../components/Success"

function SuccessPage() {

    useEffect(()=>{
        localStorage.setItem('cheapfoodsItems', JSON.stringify([]))
        localStorage.setItem('cheapfoodsPrice', 0)
    }, [])

    return (
        <div>
            <Success />
        </div>
    )
}

export default SuccessPage
