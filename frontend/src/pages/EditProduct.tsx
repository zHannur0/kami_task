import RootLayout from "../layout/RootLayout.tsx";
import Typography from "@mui/material/Typography";
import ProductForm from "../components/ProductForm.tsx";
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {useTypedSelector} from "../hooks/useTypedSelector.ts";
import {useEffect} from "react";
import {getProductThunk} from "../store/thunks/productThunk.ts";
import {useParams} from "react-router";

function EditProduct() {
    const dispatch = useAppDispatch();
    const { productId } = useParams();
    const product = useTypedSelector((state) => state.products.product);

    useEffect(() => {
        dispatch(getProductThunk(productId || ""));
    }, [dispatch, productId]);

    return (
        <>
            <RootLayout>
                <>
                    <Typography variant="h5" gutterBottom>
                        Edit Product
                    </Typography>
                    <ProductForm isEdit={true} product={product}/>
                </>
            </RootLayout>
        </>
    );
}

export default EditProduct;
