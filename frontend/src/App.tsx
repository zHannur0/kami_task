import './App.css';
import RootLayout from './layout/RootLayout';
import ProductTable from './components/Products.tsx';

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
