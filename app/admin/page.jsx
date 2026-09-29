/** @format */
"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { useUser } from "../../src/Context/userContext";
import { usePosts } from "../../src/Context/postContext";
import { uploadToCloudinary } from "../../src/helpers/cloudinary";

const emptyForm = {
  title: "",
  span: "",
  description: "",
  imageFile: null,
};

export default function AdminPage() {
  const { isOwner, user, loginOwner, logout, loading } = useUser();
  const { posts, createPost, updatePost, deletePost, loading: postsLoading } =
    usePosts();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginOwner(email, password);
    } catch (err) {
      setError(err?.message || "Login failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!editingId && !form.imageFile) {
      setError("الرجاء اختيار صورة");
      return;
    }

    try {
      setSubmitting(true);
      let imageUrl;
      if (form.imageFile) {
        imageUrl = await uploadToCloudinary(form.imageFile);
      }

      if (editingId) {
        const updates = {
          title: form.title,
          span: form.span,
          description: form.description,
        };
        if (imageUrl) updates.imageUrl = imageUrl;
        await updatePost(editingId, updates);
        setSuccess("تم تحديث المنشور بنجاح");
      } else {
        await createPost({
          title: form.title,
          span: form.span,
          description: form.description,
          imageUrl,
        });
        setSuccess("تم إنشاء المنشور بنجاح");
      }
      resetForm();
    } catch (err) {
      setError(err?.message || "فشل حفظ المنشور");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setForm({
      title: post.title || "",
      span: post.span || "",
      description: post.description || "",
      imageFile: null,
    });
    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المنشور؟")) return;
    setError("");
    setSuccess("");
    try {
      await deletePost(id);
      if (editingId === id) resetForm();
      setSuccess("تم حذف المنشور بنجاح");
    } catch (err) {
      setError(err?.message || "فشل حذف المنشور");
    }
  };

  if (!isOwner) {
    return (
      <Container>
        <h2>تسجيل دخول المالك</h2>
        <form onSubmit={handleLogin}>
          <Label>البريد الإلكتروني</Label>
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='owner@example.com'
            required
          />
          <Label>كلمة المرور</Label>
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <ErrorMsg role='alert'>{error}</ErrorMsg>}
          <Button
            type='submit'
            disabled={loading}>
            {loading ? "جارٍ الدخول..." : "دخول"}
          </Button>
        </form>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderBar>
        <strong>لوحة التحكم</strong>
        <div>
          <span>{user?.email}</span>
          <Button
            type='button'
            $secondary
            onClick={logout}
            style={{ marginInlineStart: 12, marginTop: 0 }}>
            خروج
          </Button>
        </div>
      </HeaderBar>

      <Section>
        <h3>{editingId ? "تعديل منشور" : "إنشاء منشور"}</h3>
        <form onSubmit={handleSubmit}>
          <Label>العنوان</Label>
          <Input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
          />
          <Label>العنوان الفرعي</Label>
          <Input
            value={form.span}
            onChange={(e) => setForm((f) => ({ ...f, span: e.target.value }))}
          />
          <Label>الوصف</Label>
          <Textarea
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
          />
          <Label>
            الصورة {editingId ? "(اختياري — اتركها فارغة للإبقاء على الحالية)" : ""}
          </Label>
          <Input
            type='file'
            accept='image/*'
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                imageFile: e.target.files?.[0] || null,
              }))
            }
          />
          {error && <ErrorMsg role='alert'>{error}</ErrorMsg>}
          {success && <SuccessMsg role='status'>{success}</SuccessMsg>}
          <ButtonRow>
            <Button
              type='submit'
              disabled={submitting}>
              {submitting
                ? "جارٍ الحفظ..."
                : editingId
                  ? "تحديث"
                  : "حفظ"}
            </Button>
            {editingId && (
              <Button
                type='button'
                $secondary
                onClick={resetForm}>
                إلغاء التعديل
              </Button>
            )}
          </ButtonRow>
        </form>
      </Section>

      <Section style={{ marginTop: 24 }}>
        <h3>المنشورات ({posts.length})</h3>
        {postsLoading && posts.length === 0 ? (
          <p>جارٍ التحميل...</p>
        ) : posts.length === 0 ? (
          <p>لا توجد منشورات بعد</p>
        ) : (
          <PostList>
            {posts.map((post) => (
              <PostItem key={post.id}>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title || ""}
                  />
                )}
                <PostMeta>
                  <strong>{post.title || "بدون عنوان"}</strong>
                  {post.span ? <small>{post.span}</small> : null}
                </PostMeta>
                <PostActions>
                  <IconButton
                    type='button'
                    aria-label='تعديل'
                    title='تعديل'
                    onClick={() => startEdit(post)}>
                    <span
                      className='typcn typcn-large typcn-edit'
                      aria-hidden='true'
                    />
                  </IconButton>
                  <IconButton
                    type='button'
                    $danger
                    aria-label='حذف'
                    title='حذف'
                    onClick={() => handleDelete(post.id)}>
                    <span
                      className='typcn typcn-large typcn-trash'
                      aria-hidden='true'
                    />
                  </IconButton>
                </PostActions>
              </PostItem>
            ))}
          </PostList>
        )}
      </Section>
    </Container>
  );
}

const Container = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 1rem 1rem 2.5rem;
`;

const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0.85rem 1rem;
  background: linear-gradient(135deg, #0f4c3a 0%, #083328 100%);
  color: #fff;
  border-radius: 14px;
  box-shadow: 0 10px 24px rgba(142, 0, 59, 0.22);

  strong {
    font-size: 1.1rem;
  }

  span {
    opacity: 0.9;
    font-size: 0.9rem;
  }
`;

const Section = styled.section`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 14px;
  padding: 1.15rem 1.2rem 1.35rem;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.04);

  h3 {
    margin: 0 0 0.85rem;
    color: #1a1a1a;
    font-size: 1.1rem;
  }
`;

const Label = styled.label`
  display: block;
  margin: 0.65rem 0 0.35rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.85rem;
  margin-bottom: 0.85rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0f4c3a;
    box-shadow: 0 0 0 3px rgba(15, 76, 58, 0.12);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.7rem 0.85rem;
  margin-bottom: 0.85rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-sizing: border-box;
  resize: vertical;
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0f4c3a;
    box-shadow: 0 0 0 3px rgba(15, 76, 58, 0.12);
  }
`;

const Button = styled.button`
  margin-top: 0;
  margin-bottom: 0.85rem;
  padding: 0.7rem 1.25rem;
  border: none;
  background: ${(p) =>
    p.$danger
      ? "linear-gradient(135deg, #c62828, #8e0000)"
      : p.$secondary
        ? "#5a5a5a"
        : "linear-gradient(135deg, #0f4c3a, #0a3d2e)"};
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.16);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 0.5rem;
  margin-bottom: 0.85rem;

  ${Button} {
    margin-bottom: 0;
  }
`;

const ErrorMsg = styled.div`
  color: #b00020;
  margin: 0 0 0.85rem;
  font-size: 0.92rem;
`;

const SuccessMsg = styled.div`
  color: #0b8f2e;
  margin: 0 0 0.85rem;
  font-size: 0.92rem;
`;

const PostList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PostItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 12px;
  background: #fafafa;
  transition: background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: #fff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  }

  img {
    width: 76px;
    height: 76px;
    object-fit: cover;
    border-radius: 10px;
    flex-shrink: 0;
  }
`;

const PostMeta = styled.div`
  flex: 1;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    color: #1a1a1a;
    font-size: 0.98rem;
  }

  small {
    color: #777;
  }
`;

const PostActions = styled.div`
  display: flex;
  gap: 8px;
  margin-inline-start: auto;
`;

const IconButton = styled.button`
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${(p) =>
    p.$danger
      ? "linear-gradient(145deg, #e53935, #b71c1c)"
      : "linear-gradient(145deg, #0f4c3a, #083328)"};
  color: #fff;
  font-size: 1.4rem;
  line-height: 1;
  flex-shrink: 0;
  box-shadow: 0 6px 14px
    ${(p) =>
      p.$danger ? "rgba(183, 28, 28, 0.28)" : "rgba(142, 0, 59, 0.28)"};
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  .typcn {
    display: block;
    line-height: 1;
  }

  &:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 18px
      ${(p) =>
        p.$danger ? "rgba(183, 28, 28, 0.35)" : "rgba(142, 0, 59, 0.35)"};
  }
`;
