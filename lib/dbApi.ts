import { NewPost, supabase } from '@/lib/supabase'

export async function getPostsMain() {
  return await supabase
    .from('dd_post')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)
}

export async function getPostById(id: string) {
  return await supabase
    .from('dd_post')
    .select('*')
    .eq('id', id)
    .single()
}

export async function getPostSearchKeyword(query: string) {
    return await supabase
    .from('dd_post')
    .select('*')
    .or(`title.ilike.%${query}%,category.ilike.%${query}%,tags.cs.{${query}}`)
    .order('created_at', { ascending: false });
}


export async function getPostsByTag(categoryName: string, key: string) {
  let query = supabase
    .from('dd_post')                  // 테이블 명
    .select('title, thumbnail');      // 가져올 컬럼

  if (key !== 'latest') {
    query = query.ilike('category', `%${categoryName}%`);
  }

  const { data, error } = await query
    .order('created_at', { ascending: false })
    .limit(3);

  // 호출하는 쪽에서 편하게 쓰도록 형태 통일
  return { data, error };
}

export async function searchPosts(keyword: string) {
  return await supabase
    .from('dd_post')
    .select('*')
    .ilike('title', `%${keyword}%`)
}


export async function createPost(post: NewPost) {
  const { data, error } = await supabase
    .from('dd_post')
    .insert({
      title: post.title,
      thumbnail: post.thumbnail,
      category: post.category,
      content: post.content || '',
      tags: post.tags || [],
    });

  return { data, error }; 
}
export async function uploadThumbnail(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`; // 중복 방지를 위해 Date.now() 사용
  const filePath = `post-thumbnails/${fileName}`;

  const { error: uploadError } = await supabase.storage
      .from('thumbnails') // 본인의 Supabase Bucket 이름 확인
      .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
      .from('thumbnails')
      .getPublicUrl(filePath);

  return data.publicUrl;
}