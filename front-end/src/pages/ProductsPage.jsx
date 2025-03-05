import MenuList from "../components/MenuList";
import ProductsComponent from "../components/ProductsComponent";
import FooterComponent from "../components/FooterComponent";

const Product = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <header>
                    <MenuList />
                </header>
                <main className="flex-grow flex items-center justify-center bg-gray-200">
                    <ProductsComponent />
                </main>
                <footer>
                    <FooterComponent />
                </footer>
            </div>
        </>
    )
}

export default Product