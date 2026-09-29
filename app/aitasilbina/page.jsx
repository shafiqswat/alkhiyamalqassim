/** @format */
"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { usePosts } from "../../src/Context/postContext";
// import CardComponent from "../../src/Components/layout/Card";
// import MapEmbed from "../../src/Components/Map";

export default function Page() {
  // const { posts, loading } = usePosts();

  useEffect(() => {
    document.title = "اتصل بنا | الخيام القصيم مظلات وسواتر بريدة";
  }, []);

  return (
    <main>
      <h1 style={{ display: "none" }}>
        مظلات وسواتر القصيم
        <strong>
          للحدائق والأسطح والسيارات بخامات عالية جودة وبأفضل الخامات المستوردة
          والمحلية، كما يوجد قماش بي في دي اف بتصاميم وأشكال حديثة وجديدة للأسطح
          والحدائق، عليكم بالتواصل مع الخيام القصيم لتركيب وتصميم وتنفيذ
          أفضل وأجمل مظلات وسواتر، مظلات قماش للسيارات بأرقى وأجمل التصاميم
          والأشكال الجذابة والرائعة.
        </strong>
        <strong>
          الخيام القصيم تفصيل خيام ملكي مظلات سواتر موقف سيارت مظلات
          مدارس القصيم بريده عنيزه
        </strong>
      </h1>
      {/* Cards removed per request */}

      <ContactSection>
        <h2>
          تواصل معنا <small style={{ color: "#0f4c3a" }}>خدمة 24/7</small>
        </h2>
        <p style={{ marginTop: 6, marginBottom: 16 }}>
          يسعدنا تواصلك عبر واتساب. اكتب لنا اسمك ورسالتك وسنعاود الرد فوراً.
        </p>
        <SimpleForm
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const name = form.name.value.trim();
            const phone = form.phone.value.trim();
            const message = form.message.value.trim();

            const targetLocal = "0500886893";
            const normalized = targetLocal.replace(/^0/, "966");
            const lines = [
              `الاسم: ${name || "(غير مذكور)"}`,
              `الهاتف: ${phone || "(غير مذكور)"}`,
              `الرسالة: ${message || "أرغب بالتواصل بخصوص المظلات والسواتر"}`,
            ];
            const text = encodeURIComponent(lines.join("\n"));

            const isMobile =
              typeof window !== "undefined" &&
              /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
            const url = isMobile
              ? `https://api.whatsapp.com/send?phone=${normalized}&text=${text}`
              : `https://web.whatsapp.com/send?phone=${normalized}&text=${text}`;
            if (typeof window !== "undefined") window.location.href = url;
          }}>
          <div className='row'>
            <label htmlFor='name'>الاسم الكامل</label>
            <input
              id='name'
              name='name'
              type='text'
              placeholder='اكتب اسمك'
            />
          </div>
          <div className='row'>
            <label htmlFor='phone'>رقم الجوال</label>
            <input
              id='phone'
              name='phone'
              type='tel'
              placeholder='05xxxxxxxx'
            />
          </div>
          <div className='row'>
            <label htmlFor='message'>رسالتك</label>
            <textarea
              id='message'
              name='message'
              rows={4}
              placeholder='مثال: أريد مظلة سيارة بمقاس ...'></textarea>
          </div>
          <button
            type='submit'
            className='cta'>
            راسلنا على واتساب الآن
          </button>
          <small className='note'>الرد الفوري متاح على مدار الساعة 24/7</small>
        </SimpleForm>
      </ContactSection>
      {/* Map removed per request */}
    </main>
  );
}

const ContactSection = styled.section`
  margin: 24px 0 12px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  h2 {
    margin: 0 0 8px;
  }
`;

const SimpleForm = styled.form`
  .row {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }
  label {
    margin-bottom: 6px;
    color: #111827;
    font-weight: 600;
  }
  input,
  textarea {
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 10px 12px;
    font-size: 14px;
    outline: none;
  }
  input:focus,
  textarea:focus {
    border-color: #0f4c3a;
    box-shadow: 0 0 0 3px rgba(142, 0, 59, 0.12);
  }
  .cta {
    margin-top: 8px;
    background: #25d366;
    color: #fff;
    border: none;
    padding: 10px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 700;
  }
  .cta:hover {
    filter: brightness(0.95);
  }
  .note {
    display: block;
    color: #6b7280;
    margin-top: 8px;
  }
`;
