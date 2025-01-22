import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const AnecdoteFilter = () => {
    const dispatch = useDispatch()

    const handleFilterChange = (event) => {
        const filter = event.target.value 
        dispatch(filterChange(filter))
    }
    
    return (
        <div>
            filter <input 
                name="filter"
                onChange={
                    handleFilterChange
                }
            />
        </div>
    )
}

export default AnecdoteFilter