"use client";

import { useParams } from "next/navigation";
import { getPhotosByYear } from "../../data/photos";
import { useTabs } from "../../context/TabContext";

export default function PhotoYearPage() {
    const params = useParams();
    const { openTab } = useTabs();
    const year = Number(params.year);
    const photos = getPhotosByYear(year);

    return (
        <div className="animate-in fade-in duration-700">
            <h1 className="text-lg font-bold mb-4">{year}</h1>

            {/* Photos grid for this year */}
            <div className="photo-grid">
                {photos.map((photo) => (
                    <div
                        key={photo.slug}
                        className="photo-grid-item group"
                        onClick={() => {
                            openTab({
                                title: photo.filename,
                                path: `/photos/${photo.year}/${photo.slug}`,
                            });
                        }}
                    >
                        <img
                            src={photo.src}
                            alt={photo.slug}
                            loading="lazy"
                            className="photo-grid-img"
                        />
                        <div className="photo-grid-overlay">
                            <span className="text-xs font-mono opacity-70">
                                {photo.location}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
