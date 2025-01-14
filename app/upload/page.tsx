"use client"
// app/uploadProduct/page.tsx

import { useState } from 'react';

const UploadProductPage = () => {
    const [product, setProduct] = useState({ name: '', description: '' });
    const [images, setImages] = useState<File[]>([]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImages(Array.from(event.target.files));
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch('/api/uploadProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product, images }),
        });

        const result = await response.json();
        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                required
            />
            <textarea
                placeholder="Product Description"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                required
            />
            <input type="file" multiple onChange={handleImageChange} required />
            <button type="submit">Upload Product</button>
        </form>
    );
};

export default UploadProductPage;