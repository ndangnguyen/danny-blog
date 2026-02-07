"use client";

import Link from "next/link";
import { photoData } from "../data/photos";
import { useTabs } from "../context/TabContext";
import { useState } from "react";

export default function PhotosPage() {
    const allPhotos = photoData.flatMap((y) => y.photos);
    const { openTab } = useTabs();

    return (
        <div className="animate-in fade-in duration-700" style={{ padding: 0 }}>
            <h1 className="text-lg font-bold mb-6 px-2">Photos</h1>

            <div className="photo-grid">
                {allPhotos.map((photo) => (
                    <div
                        key={`${photo.year}-${photo.slug}`}
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
