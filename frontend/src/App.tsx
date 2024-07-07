import RootLayout from './layout/RootLayout';
import ProductTable from './components/ProductsTable.tsx';

function App() {
    return (
        <>
            <RootLayout>
                <ProductTable/>
            </RootLayout>
        </>
    );
}

export default App;
