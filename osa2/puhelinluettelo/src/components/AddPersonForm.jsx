const AddPersonForm = (props) => {
    return (
        <form onSubmit={props.add}>
        <div>
            name: <input 
            value={props.newName}
            onChange={props.nameHandler}
            />
            <br />
            number: <input
            value={props.newNumber}
            onChange={props.numberHandler}
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
</form>
    )
}

export default AddPersonForm
