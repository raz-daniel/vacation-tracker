import './Card.css'
import Item from '../../../models/item/Item'
import itemsServices from '../../../services/items'
import { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast'

interface CardProps {
    item: Item
    removeItem(id: string): void
    isNew?: boolean
}

export default function Card(props: CardProps): JSX.Element {

    const toast = useRef<Toast | null>(null)
    const { id, name, isRecycled, date, price, discount, category } = props.item
    const { isNew } = props
    const [highlight, setHighlight] = useState(isNew || false)

    useEffect(() => {
        if (isNew) {
            setHighlight(true)
            const timer = setTimeout(() => {
                setHighlight(false)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [isNew])

    async function deleteMe() {
        try {
            if (confirm("Are you sure you want to delete this item?")) {
                await itemsServices.remove(id)
                props.removeItem(id)
            }
        } catch {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: `Failed to delete card`,
                life: 3000
            })
        }
    }

    return (
        <div className={`Card ${highlight ? 'highlight' : ''}`}>
            <Toast ref={toast} />
            <h4>{name}</h4>
            <p>Recycled: {isRecycled ? 'Yes' : 'No'}</p>
            <p>Date: {new Date(date).toLocaleDateString()}</p>
            <p>{category.name}</p>
            <p>Price: ${price}, Discount: {discount}%</p>
            <p>Total Price: ${(price * (1 - discount / 100)).toFixed(2)}</p>
            <div>
                <button onClick={deleteMe}>delete</button>
            </div>
        </div>

    )
}