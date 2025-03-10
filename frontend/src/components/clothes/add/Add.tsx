import './Add.css'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Category from '../../../models/category/Category'
import categoriesServices from '../../../services/categories'
import Draft from '../../../models/item/Draft'
import itemsServices from '../../../services/items'
import { Toast } from 'primereact/toast'


export default function Add(): JSX.Element {

    const toast = useRef<Toast | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    useEffect(() => {
        (async () => {
            try {
                const categories = await categoriesServices.getCategories()
                setCategories(categories)
            } catch {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Failed to load categories`,
                    life: 3000
                })
            }

        })()
    }, [])

    const { register, handleSubmit, formState } = useForm<Draft>()

    const navigate = useNavigate()

    async function submit(draft: Draft) {
        try {
            const formattedDraft = {
                ...draft,
                isRecycled: (draft.isRecycled as unknown as string) === 'yes'
            }

            const newItem = await itemsServices.add(formattedDraft)

            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Item added successfully',
                life: 3000
            })
            setTimeout(() => {
            navigate('/items/list', { 
                state: { 
                    newItemId: newItem.id, 
                    categoryChosen: newItem.categoryId 
                } 
            })
        }, 1000)
        } catch {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: `Failed to submit form`,
                life: 3000
            })
        }
    }

    return (
        <div className='Add'>
            <Toast ref={toast} />
            <form onSubmit={handleSubmit(submit)}>
                <div className="input-group">
                    <input placeholder='Item name' {...register('name', {
                        required: {
                            value: true,
                            message: 'must enter name'
                        }
                    })} />
                    <span className='error'>{formState.errors.name?.message}</span>
                </div>

                <div className="input-group">
                    <input type='datetime-local' {...register('date', {
                        required: {
                            value: true,
                            message: 'must insert date'
                        }
                    })} />
                    <span className='error'>{formState.errors.date?.message}</span>
                </div>

                <div className="input-group">
                    <label>{`Is Item Recycled ? `} </label>
                    <label>
                        <input type='radio' value='yes' {...register('isRecycled', {
                            required: {
                                value: true,
                                message: 'must answer question'
                            }
                        })} />
                        {`  Yes  `}
                    </label>
                    <label htmlFor="">
                        <input type='radio' value='no' {...register('isRecycled', {
                            required: {
                                value: true,
                                message: 'must answer question'
                            }
                        })} />
                        {` No `}
                    </label>
                    <span className='error'>{formState.errors.isRecycled?.message}</span>
                </div>


                <div className="input-group">
                    <select defaultValue='' {...register('categoryId', {
                        required: {
                            value: true,
                            message: 'must choose category'
                        }
                    })}>
                        <option value="" disabled>select category...</option>
                        {categories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                    </select>
                    <span className='error'>{formState.errors.categoryId?.message}</span>
                </div>

                <div className="input-group">
                    <input type='number' step='0.01' placeholder='price' {...register('price', {
                        required: {
                            value: true,
                            message: 'must enter price'
                        },
                        min: {
                            value: 0,
                            message: 'price must be positive'
                        }
                    })} />
                    <span className='error'>{formState.errors.price?.message}</span>
                    </div>

                    <div className="input-group">
                        <input type='number' step={1} placeholder='discount' {...register('discount', {
                            required: {
                                value: true,
                                message: 'must enter discount'
                            },
                            min: {
                                value: 0,
                                message: 'discount must be positive'
                            },
                            max: {
                                value: 100,
                                message: 'value cannot exceed 100'
                            }
                        })} />
                        <span className='error'>{formState.errors.discount?.message}</span>
                        </div>

                        <button disabled={formState.isSubmitting}>Add Item</button>

                    </form>
                </div>
                )
}