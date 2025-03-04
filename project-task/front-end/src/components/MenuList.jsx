import "../index.css"

const MenuList = () => {
    return (
        <div className="flex justify-around items-center bg-gray-200">
            <div>
                <h1 className="text-2xl"><a href="/profile">project task</a></h1>
            </div>
            <div>
                <ul className="flex p-2">
                    <li className="p-2 transition duration-200 hover:text-blue-700"><a href="/profile">Home</a></li>
                    <li className="p-2 transition duration-200 hover:text-blue-700"><a href="/products">Products</a></li>
                    <li className="p-2 transition duration-200 hover:text-blue-700"><a href="/users">Users</a></li>
                    <li className="p-2 transition duration-200 hover:text-blue-700"><a href="#">Settings</a></li>
                </ul>
            </div>
        </div>
    )
}

export default MenuList