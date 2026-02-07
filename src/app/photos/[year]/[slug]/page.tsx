"use client";

import { useParams } from "next/navigation";
import { getPhoto, getAllPhotos } from "../../../data/photos";
import { useTabs } from "../../../context/TabContext";
import { useMemo } from "react";

export default function PhotoPage() {
    const params = useParams();
    const { replaceTab } = useTabs();

    const year = Number(params.year);
    const slug = params.slug as string;
    const photo = getPhoto(year, slug);
    const allPhotos = useMemo(() => getAllPhotos(), []);

    if (!photo) {
        return (
            <div className="flex items-center justify-center h-full text-white/40">
                Photo not found
            </div>
        );
    }

    // Find previous and next photos across ALL years
    const currentIndex = allPhotos.findIndex(
        (p) => p.year === year && p.slug === slug
    );
    const prevPhoto = currentIndex > 0 ? allPhotos[currentIndex - 1] : null;
    const nextPhoto =
        currentIndex < allPhotos.length - 1 ? allPhotos[currentIndex + 1] : null;

    const navigateTo = (p: { slug: string; filename: string; year: number }) => {
        replaceTab({
            title: p.filename,
            path: `/photos/${p.year}/${p.slug}`,
        });
    };

    return (
        <div className="photo-viewer animate-in fade-in duration-500">
            {/* Navigation arrows */}
            <div className="photo-viewer-nav">
                <button
                    className="photo-nav-btn"
                    disabled={!prevPhoto}
                    onClick={() => prevPhoto && navigateTo(prevPhoto)}
                    title="Previous photo"
                >
                    ‹
                </button>
                <button
                    className="photo-nav-btn"
                    disabled={!nextPhoto}
                    onClick={() => nextPhoto && navigateTo(nextPhoto)}
                    title="Next photo"
                >
                    ›
                </button>
            </div>

            {/* Photo display */}
            <div className="photo-viewer-frame">
                <img
                    src={photo.src}
                    alt={photo.slug}
                    className="photo-viewer-img"
                />
            </div>

            {/* Photo info */}
            <div className="photo-viewer-info">
                <span className="font-mono text-[11px] text-white/40">
                    {photo.date}
                </span>
                {photo.location && (
                    <span className="font-mono text-[11px] text-white/40">
                        📍 {photo.location}
                    </span>
                )}
            </div>
        </div>
    );
}
