import "../index.css"

const Button = (props) => {
    return(
        <button type="submit" className="mt-6 bg-gray-600 w-90 h-10 rounded-4xl cursor-pointer text-white transform transition duration-500 hover:scale-96">{props.value}</button>
    )
}

export default Button