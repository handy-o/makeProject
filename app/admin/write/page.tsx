'use client'

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    ImageIcon, X, Bold, Heading2,
    Type, List, ListOrdered, Undo, Redo
} from 'lucide-react';

// 카테고리 목록
const CATEGORIES = ['저축', '부동산', '대출', '생활', '상식', '뉴스', '투자'];

export default function WritePage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. TipTap 에디터 설정
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>내용을 입력하세요...</p>',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[400px] max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2',
            },
        },
    });

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const uploadThumbnail = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`; // 중복 방지를 위해 Date.now() 사용
        const filePath = `post-thumbnails/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('thumbnails') // 본인의 Supabase Bucket 이름 확인
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('thumbnails')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const handleSubmit = async () => {
        if (!title || !editor || selectedCategories.length === 0) {
            alert('제목, 카테고리, 내용을 모두 입력해주세요.');
            return;
        }

        setIsSubmitting(true);

        try {
            let finalThumbnailUrl = '';

            // 이미지가 선택되어 있다면 업로드 실행
            if (thumbnailFile) {
                finalThumbnailUrl = await uploadThumbnail(thumbnailFile);
            }

            // DB(dd_post)에 저장
            const { error: dbError } = await supabase
                .from('dd_post')
                .insert({
                    title: title,
                    thumbnail: finalThumbnailUrl, // 업로드된 실제 URL 저장
                    category: selectedCategories.join(', '),
                    content: editor.getHTML(),
                    views: 0,
                    shares: 0,
                    tags: selectedCategories, // 선택한 카테고리를 태그로도 활용
                });

            if (dbError) throw dbError;

            alert('게시글이 성공적으로 등록되었습니다!');
            router.push('/donday');
        } catch (error: any) {
            console.error('Error saving post:', error.message);
            alert('저장 중 오류가 발생했습니다: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!editor) return null;

    return (
        <div className="min-h-screen bg-zinc-50 pb-20">
            {/* 상단 네비게이션 */}
            <nav className="sticky top-0 z-10 bg-white border-b border-zinc-200 px-4 py-3">
                <div className="max-w-2xl mx-auto flex justify-between items-center">
                    <button onClick={() => router.back()} className="text-zinc-500 hover:text-zinc-800 transition">취소</button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-sm disabled:bg-zinc-400"
                    >
                        {isSubmitting ? '등록 중...' : '등록하기'}
                    </button>
                </div>
            </nav>

            <main className="max-w-2xl mx-auto mt-8 px-4">
                {/* 이미지 업로드 섹션 */}
                <section className="mb-8">
                    <div className="relative aspect-[16/9] w-full rounded-2xl border-2 border-dashed border-zinc-300 bg-white flex flex-col items-center justify-center overflow-hidden transition-all hover:border-blue-400">
                        {thumbnailPreview ? (
                            <div className="relative w-full h-full">
                                <img src={thumbnailPreview} className="w-full h-full object-cover" alt="preview" />
                                <button
                                    onClick={() => { setThumbnailPreview(null); setThumbnailFile(null); }}
                                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ) : (
                            <label className="cursor-pointer flex flex-col items-center">
                                <ImageIcon className="text-zinc-400 mb-2" size={32} />
                                <span className="text-zinc-600 font-medium text-sm">대표 이미지 업로드</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setThumbnailFile(file);
                                            setThumbnailPreview(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </label>
                        )}
                    </div>
                </section>

                {/* 제목 & 카테고리 */}
                <section className="mb-8">
                    <input
                        type="text"
                        placeholder="제목을 입력하세요 (최대 40자)"
                        maxLength={40}
                        className="w-full text-3xl font-bold bg-transparent border-none outline-none placeholder:text-zinc-300 px-0 focus:ring-0"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2 mt-4">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => toggleCategory(cat)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selectedCategories.includes(cat)
                                    ? 'bg-zinc-800 border-zinc-800 text-white'
                                    : 'bg-white border-zinc-200 text-zinc-500'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 에디터 UI */}
                <section className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
                    <div className="flex items-center flex-wrap gap-1 p-2 border-b border-zinc-100 bg-zinc-50/50">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            active={editor.isActive('heading', { level: 2 })}
                            icon={<Heading2 size={18} />}
                        />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setParagraph().run()}
                            active={editor.isActive('paragraph')}
                            icon={<Type size={18} />}
                        />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            active={editor.isActive('bold')}
                            icon={<Bold size={18} />}
                        />
                        <div className="w-[1px] h-4 bg-zinc-200 mx-1" />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            active={editor.isActive('bulletList')}
                            icon={<List size={18} />}
                        />
                        <div className="ml-auto flex gap-1">
                            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={<Undo size={16} />} />
                            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={<Redo size={16} />} />
                        </div>
                    </div>
                    <EditorContent editor={editor} />
                </section>
            </main>
        </div>
    );
}
// 툴바 버튼 컴포넌트
function ToolbarButton({ onClick, active, icon }: { onClick: () => void; active?: boolean; icon: React.ReactNode }) {
    return (
        <button
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`p-2 rounded transition-colors ${active ? 'bg-white text-blue-600 shadow-sm' : 'text-zinc-500 hover:bg-white'}`}
        >
            {icon}
        </button>
    );
}
