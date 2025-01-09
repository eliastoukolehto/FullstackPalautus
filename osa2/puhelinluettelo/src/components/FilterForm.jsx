
const FilterForm = ({ handler }) => {
    return (
        <div>
            filter: <input
        onChange={handler}
      /> 
        </div>
    )
}

export default FilterForm