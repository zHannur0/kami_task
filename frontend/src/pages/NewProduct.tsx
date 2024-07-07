import RootLayout from "../layout/RootLayout.tsx";
import Typography from "@mui/material/Typography";
import ProductForm from "../components/ProductForm.tsx";

function NewProduct() {

    return (
        <>
            <RootLayout>
                <>
                    <Typography variant="h5" gutterBottom>
                        Create new Product
                    </Typography>
                    <ProductForm isEdit={false}/>
                </>
            </RootLayout>
        </>
    );
}

export default NewProduct;
