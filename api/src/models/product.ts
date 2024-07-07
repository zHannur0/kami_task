import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    image: string;
    price: number;
    status: string;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
