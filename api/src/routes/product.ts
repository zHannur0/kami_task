import {Router, Request, Response} from 'express';
import Product, {IProduct} from '../models/product';
import {upload} from "../db/upload";
import {gfs} from "../db/db";

const router = Router();


router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/', upload.single('file'), async (req: Request, res: Response) => {
    const file = req.file;
    console.log('File object:', file);
    try {
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        console.log(`Uploaded file: ${file.originalname}`);

        const newProduct: IProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            image: `http://localhost:5000/api/products/file/${file.originalname}`, // Correct URL
            price: req.body.price,
            status: req.body.status,
        });

        const product = await newProduct.save();

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/file/:filename', async (req: Request, res: Response) => {
    try {
        if (!gfs) {
            return res.status(500).send('GridFS is not initialized');
        }

        const {filename} = req.params;
        console.log(`Searching for file: ${filename}`);

        const files = await gfs.find({filename}).toArray();

        if (!files || files.length === 0) {
            console.log(`File not found: ${filename}`);
            return res.status(404).send('File not found');
        }

        console.log(`File found: ${filename}`);
        const readStream = gfs.openDownloadStreamByName(filename);
        readStream.on('error', (error) => {
            console.error('Error streaming file:', error);
            res.status(500).send('Error streaming file');
        });
        readStream.pipe(res);
    } catch (err) {
        console.error('Error retrieving file:', err);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', upload.single('file'), async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const file = req.file;

        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).send('Product not found');
        }

        let updateData = {...req.body};

        if (file) {
            const prevFilename = existingProduct.image.split('/').pop();
            updateData.image = `http://localhost:5000/api/products/file/${file.filename}`;

            if (gfs && prevFilename) {
                const files = await gfs.find({filename: prevFilename}).toArray();
                if (files.length > 0) {
                    await gfs.delete(files[0]._id);
                    console.log(`Deleted previous image: ${prevFilename}`);
                } else {
                    console.log(`Previous image file not found: ${prevFilename}`);
                }
            } else {
                console.error('GridFS is not initialized or previous filename is missing');
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {new: true});

        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }

        res.json(updatedProduct);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        let filename;
        if (product.image) {
            filename = product.image.split('/').pop();
        }

        // @ts-ignore
        await product.deleteOne();

        if (gfs && filename) {
            const files = await gfs.find({filename}).toArray();
            if (files.length > 0) {
                await gfs.delete(files[0]._id);
                console.log(`Deleted image: ${filename}`);
            } else {
                console.log(`Image file not found: ${filename}`);
            }
        } else {
            console.error('GridFS is not initialized or filename is missing');
        }

        res.sendStatus(204);
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).send('Server Error');
    }
});


export default router;
