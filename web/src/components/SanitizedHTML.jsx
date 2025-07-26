'use client';
import { useEffect, useState } from 'react';

export default function SanitizedHTML({ content, className = '' }) {
    const [sanitizedHTML, setSanitizedHTML] = useState('');

    useEffect(() => {
        if (content && typeof window !== 'undefined') {
            import('dompurify').then((DOMPurify) => {
                setSanitizedHTML(DOMPurify.default.sanitize(content));
            });
        }
    }, [content]);

    if (!sanitizedHTML) return null;

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />
    );
}