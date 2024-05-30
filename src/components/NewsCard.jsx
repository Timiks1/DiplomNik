import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";

export function NewsCard() {
    const [newsData, setNewsData] = useState(null);

    useEffect(() => {
        fetch('https://example.com/api/news')
            .then(response => response.json())
            .then(data => setNewsData(data))
            .catch(error => console.error('Error fetching news:', error));
    }, []);

    return (
        <Card className="w-full rounded-md  flex-row">
            <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
                <img
                    src={newsData ? newsData.image : 'Завантаження зображення Новини...'}
                    alt="Завантаження зображення Новини..."
                    className="h-full w-full rounded-tl-lg rounded-bl-lg object-cover"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h6" color="gray" className="mb-4 uppercase">
                    {newsData ? newsData.category : 'Завантаження категорії Новини...'}
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    {newsData ? newsData.title : 'Завантаження назви Новини...'}
                </Typography>
                <Typography color="gray" className="mb-8 font-normal">
                    {newsData ? newsData.description : 'Завантаження опису Новини...'}
                </Typography>
                <a href={newsData ? newsData.link : '#'} className="inline-block">
                    <Button variant="text" className="flex items-center gap-2">
                        Дивитись
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </Button>
                </a>
            </CardBody>
        </Card>
    );
}
