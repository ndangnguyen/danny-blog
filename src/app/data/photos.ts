export interface Photo {
    slug: string;
    filename: string;
    src: string;
    year: number;
    date: string;
    location?: string;
    aspectRatio?: "landscape" | "portrait" | "square";
}

export interface PhotoYear {
    year: number;
    photos: Photo[];
}

export const photoData: PhotoYear[] = [
    {
        year: 2025,
        photos: [
            {
                slug: "hills",
                filename: "hills.jpg",
                src: "/photos/2025/hills.jpg",
                year: 2025,
                date: "01.15.2025",
                location: "Countryside",
                aspectRatio: "landscape",
            },
            {
                slug: "premuda",
                filename: "premuda.jpg",
                src: "/photos/2025/premuda.jpg",
                year: 2025,
                date: "01.10.2025",
                location: "Croatia",
                aspectRatio: "landscape",
            },
            {
                slug: "coast",
                filename: "coast.jpg",
                src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
                year: 2025,
                date: "01.05.2025",
                location: "Pacific Coast",
                aspectRatio: "landscape",
            },
            {
                slug: "golden-gate",
                filename: "golden-gate.jpg",
                src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
                year: 2025,
                date: "01.03.2025",
                location: "San Francisco",
                aspectRatio: "landscape",
            },
            {
                slug: "heyo",
                filename: "heyo.jpg",
                src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
                year: 2025,
                date: "01.01.2025",
                location: "Mountains",
                aspectRatio: "landscape",
            },
            {
                slug: "martunis",
                filename: "martunis.jpg",
                src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
                year: 2025,
                date: "12.28.2024",
                location: "Forest",
                aspectRatio: "landscape",
            },
            {
                slug: "plymouth-hoe",
                filename: "plymouth-hoe.jpg",
                src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
                year: 2025,
                date: "12.20.2024",
                location: "Plymouth",
                aspectRatio: "landscape",
            },
            {
                slug: "eden-project",
                filename: "eden-project.jpg",
                src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80",
                year: 2025,
                date: "12.15.2024",
                location: "Cornwall",
                aspectRatio: "landscape",
            },
        ],
    },
    {
        year: 2024,
        photos: [
            {
                slug: "computer-history-museum",
                filename: "computer-history-museum.jpg",
                src: "/photos/2024/computer-history-museum.jpg",
                year: 2024,
                date: "11.20.2024",
                location: "Mountain View",
                aspectRatio: "square",
            },
            {
                slug: "train-museum",
                filename: "train-museum.jpg",
                src: "/photos/2024/train-museum.jpg",
                year: 2024,
                date: "11.15.2024",
                location: "Sacramento",
                aspectRatio: "landscape",
            },
            {
                slug: "notorious",
                filename: "notorious.jpg",
                src: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800&q=80",
                year: 2024,
                date: "10.25.2024",
                location: "City",
                aspectRatio: "portrait",
            },
            {
                slug: "sf-moma",
                filename: "sf-moma.jpg",
                src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
                year: 2024,
                date: "10.10.2024",
                location: "San Francisco",
                aspectRatio: "landscape",
            },
            {
                slug: "western-pacific",
                filename: "western-pacific.jpg",
                src: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80",
                year: 2024,
                date: "09.28.2024",
                location: "Railway",
                aspectRatio: "landscape",
            },
            {
                slug: "dayton",
                filename: "dayton.jpg",
                src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
                year: 2024,
                date: "09.15.2024",
                location: "Dayton",
                aspectRatio: "landscape",
            },
        ],
    },
    {
        year: 2023,
        photos: [
            {
                slug: "street-art",
                filename: "street-art.jpg",
                src: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80",
                year: 2023,
                date: "08.20.2023",
                location: "Urban",
                aspectRatio: "portrait",
            },
            {
                slug: "sakura-garden",
                filename: "sakura-garden.jpg",
                src: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80",
                year: 2023,
                date: "04.10.2023",
                location: "Japan",
                aspectRatio: "landscape",
            },
            {
                slug: "night-city",
                filename: "night-city.jpg",
                src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
                year: 2023,
                date: "03.15.2023",
                location: "Tokyo",
                aspectRatio: "landscape",
            },
            {
                slug: "vintage-camera",
                filename: "vintage-camera.jpg",
                src: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
                year: 2023,
                date: "02.28.2023",
                location: "Studio",
                aspectRatio: "landscape",
            },
            {
                slug: "library",
                filename: "library.jpg",
                src: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
                year: 2023,
                date: "01.20.2023",
                location: "Library",
                aspectRatio: "landscape",
            },
        ],
    },
];

export function getAllPhotos(): Photo[] {
    return photoData.flatMap((y) => y.photos);
}

export function getPhotosByYear(year: number): Photo[] {
    return photoData.find((y) => y.year === year)?.photos ?? [];
}

export function getPhoto(year: number, slug: string): Photo | undefined {
    return getPhotosByYear(year).find((p) => p.slug === slug);
}
