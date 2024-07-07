import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Chip,
    Grid,
    IconButton,
} from '@mui/material';
import axios from 'axios';
import { Product } from '../types/types.ts';
import ClearIcon from '@mui/icons-material/Clear';

interface ProductFormProps {
    isEdit: boolean;
    product?: Product;
}

interface ProductFormValues {
    name: string;
    description: string;
    price: number;
    status: string;
}

const initialValues: ProductFormValues = {
    name: '',
    description: '',
    price: 0,
    status: 'active',
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name of product is required'),
    description: Yup.string().required('Description of product is required'),
    price: Yup.number().required('Price is required').positive('Price should be positive'),
    status: Yup.string().required('Status is required'),
});

const ProductForm: React.FC<ProductFormProps> = ({ isEdit, product }) => {
    const navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);
    const [currImage, setCurrImage] = useState<string>("");
    const [formValues, setFormValues] = useState<ProductFormValues>(initialValues);

    useEffect(() => {
        if (isEdit && product) {
            setFormValues({
                name: product.name || "",
                description: product.description || "",
                price: product.price || 0,
                status: product.status || "",
            });
            setCurrImage(product.image || "");
        }
    }, [isEdit, product]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            const file = event.currentTarget.files[0];
            setImage(file);
        }
    };

    const handleSubmit = async (values: ProductFormValues, actions: FormikHelpers<ProductFormValues>) => {
        try {
            const formData = new FormData();
            formData.append('file', image ? image : '');
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('price', String(values.price));
            formData.append('status', values.status);

            if (!isEdit) {
                const response = await axios.post('http://localhost:5000/api/products', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Product created successfully:', response.data);
            } else {
                const response = await axios.put(`http://localhost:5000/api/products/${product?._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Product updated successfully:', response.data);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving product:', error);
            actions.setErrors({ submit: error.message });
        }
    };

    return (
        <Formik
            initialValues={formValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, setFieldValue, values }) => (
                <Form>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            {currImage ? (
                                <Box
                                    position="relative"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexDirection="column"
                                >
                                    <img src={currImage} alt="Current" style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }} />
                                    <IconButton
                                        onClick={() => setCurrImage('')}
                                        color="error"
                                        style={{ position: 'absolute', top: 8, right: 8 }}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </Box>
                            ) : (
                                <FormControl fullWidth>
                                    <FormLabel>Product Image</FormLabel>
                                    <input
                                        accept="image/*"
                                        style={{display: 'none'}}
                                        id="raised-button-file"
                                        type="file"
                                        onChange={(event) => {
                                            handleFileChange(event);
                                            setFieldValue('image', event.currentTarget.files ? event.currentTarget.files[0] : null);
                                        }}
                                    />
                                    <label htmlFor="raised-button-file">
                                        <Button variant="contained" color="primary" component="span">
                                            Upload Image
                                        </Button>
                                    </label>
                                    {image && (
                                        <Box mt={1}>
                                            <Chip
                                                label={image.name}
                                                onDelete={() => {
                                                    setImage(null);
                                                    setFieldValue('image', null);
                                                }}
                                                variant="outlined"
                                                color="primary"
                                            />
                                        </Box>
                                    )}
                                    <ErrorMessage name="image" component="div" style={{color: 'red'}}/>
                                </FormControl>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Field
                                    as={TextField}
                                    name="name"
                                    label="Name of the product"
                                    variant="outlined"
                                    error={touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                    fullWidth
                                />
                                <Field
                                    as={TextField}
                                    name="description"
                                    label="Description of the product"
                                    variant="outlined"
                                    error={touched.description && !!errors.description}
                                    helperText={touched.description && errors.description}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                                <Field
                                    as={TextField}
                                    name="price"
                                    label="Price"
                                    variant="outlined"
                                    type="number"
                                    error={touched.price && !!errors.price}
                                    helperText={touched.price && errors.price}
                                    fullWidth
                                />
                                <FormControl component="fieldset" error={touched.status && !!errors.status}>
                                    <FormLabel component="legend">Status</FormLabel>
                                    <RadioGroup
                                        name="status"
                                        row
                                        value={values.status}
                                        onChange={(event) => setFieldValue('status', event.target.value)}
                                    >
                                        <FormControlLabel value="active" control={<Radio />} label="Active" />
                                        <FormControlLabel value="archived" control={<Radio />} label="Archive" />
                                    </RadioGroup>
                                    <ErrorMessage name="status" component="div" style={{ color: 'red' }} />
                                </FormControl>
                                {errors.submit && (
                                    <Box color="red" mt={1}>
                                        {errors.submit}
                                    </Box>
                                )}
                                <Box display="flex" justifyContent="space-between" mt={2}>
                                    <Button variant="contained" color="primary" type="submit">
                                        Save
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default ProductForm;
