import MenuList from "../components/MenuList"
import UserInfo from "../components/UserInfo"
import FooterComponent from "../components/FooterComponent"

import "../index.css"

const Profile = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <header>
                    <MenuList />
                </header>

                <main className="flex-grow flex items-center justify-center bg-gray-200">
                    <UserInfo />
                </main>

                <footer>
                    <FooterComponent />
                </footer>
            </div>

        </>
    )
}

export default Profile