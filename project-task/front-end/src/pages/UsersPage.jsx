import MenuList from "../components/MenuList"
import UsersComponent from "../components/UsersComponent"
import FooterComponent from "../components/FooterComponent"

const Users = () => {
    return(
        <>
            <div className="flex flex-col min-h-screen">
            <header>
                <MenuList />
            </header>
            <main className="flex-grow flex items-center justify-center bg-gray-200">
                <UsersComponent />
            </main>
            <footer>
                <FooterComponent />
            </footer>
        </div>
        </>
    )
}

export default Users