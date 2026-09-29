/** @format */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchComponent from "./Search";
import BrandLogo from "./BrandLogo";

function Header() {
  const pathname = usePathname();

  // Function to check if a link should be active
  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Function to get active class name
  const getActiveClass = (href) => {
    return isActive(href) ? "active" : "";
  };

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    function calcWidth() {
      // Moving menu items causes layout shift on mobile (hurts CLS / PageSpeed)
      if (window.innerWidth < 992) return;

      const siteMenuArea = document.querySelector("#site-menu-area");
      const more = document.querySelector("#site-menu-area .more");
      const siteMenu = document.querySelector(".site-menu");

      if (!siteMenuArea || !more || !siteMenu) return;

      let navWidth = 1;
      const moreWidth = more.offsetWidth;
      const menuItems = document.querySelectorAll(
        "#site-menu-area > li:not(.more)"
      );

      menuItems.forEach((item) => {
        navWidth += item.offsetWidth;
      });

      const availableSpace = siteMenu.offsetWidth - moreWidth;

      if (navWidth > availableSpace) {
        const lastItem = menuItems[menuItems.length - 1];
        if (lastItem) {
          lastItem.setAttribute("data-width", lastItem.offsetWidth);
          more.querySelector(".more-ul").prepend(lastItem);
          calcWidth();
        }
      } else {
        const firstMoreElement = more.querySelector("li");
        if (
          firstMoreElement &&
          navWidth + parseInt(firstMoreElement.getAttribute("data-width")) <
            availableSpace
        ) {
          siteMenuArea.insertBefore(firstMoreElement, more);
        }
      }

      more.style.display =
        more.querySelectorAll("li").length > 0 ? "inline-block" : "none";
    }

    function handleResize() {
      calcWidth();
    }

    function handleLinkClick() {
      const floatMenu = document.querySelector(".site-menu-float");
      if (floatMenu) {
        floatMenu.style.display = "none";
      }
    }

    // Store references for cleanup
    let floatMenuLinks = null;
    let animationFrameId = null;

    window.addEventListener("resize", handleResize);

    // Use requestAnimationFrame to ensure DOM is ready
    animationFrameId = requestAnimationFrame(() => {
      calcWidth();
      const siteMenu = document.querySelector(".site-menu");
      if (siteMenu) {
        siteMenu.classList.remove("site-menu-prevent-overflow-onload");
      }

      const submenuLinks = document.querySelectorAll(
        ".site-menu ul li:has(ul) > a"
      );
      submenuLinks.forEach((link) => link.classList.add("site-menu-has-sub"));

      floatMenuLinks = document.querySelectorAll(".site-menu-float ul li a");
      if (floatMenuLinks) {
        floatMenuLinks.forEach((link) => {
          link.addEventListener("click", handleLinkClick);
        });
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (floatMenuLinks) {
        floatMenuLinks.forEach((link) => {
          link.removeEventListener("click", handleLinkClick);
        });
      }
    };
  }, []);
  return (
    <header
      className='header-wrapper notranslate'
      translate='no'
      role='banner'>
      <div className='header-wrapper-background'>
        <div className='header flex-row-reverse'>
          <div className='header-logo header-logo-lc-mc mc-35 lc-25 sc-hide mc-show lc-show'>
            <BrandLogo />
          </div>
          <div className='header-logo sc-120 sc-show mc-hide lc-hide'>
            <BrandLogo compact />
          </div>
          <nav
            className='site-menu sc-120 mc-85 lc-95 sc-hide mc-show lc-show site-menu-prevent-overflow-onload'
            role='navigation'>
            <ul id='site-menu-area'>
              <li>
                <Link
                  href='/'
                  className={`nav-home-link ${getActiveClass("/")}`}
                  aria-label='الرئيسية'
                  title='الرئيسية'>
                  <span className='typcn typcn-large typcn-home nav-home-icon'></span>
                  <span className='sr-only'>الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link
                  href='/alqasim'
                  className={getActiveClass("/alqasim")}>
                  القصيم بريده عنيزه
                </Link>
                <ul>
                  <li>
                    <Link
                      href='/alqasim/sayaarat'
                      className={getActiveClass("/alqasim/sayaarat")}>
                      مظلات سيارات
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/hadayiq'
                      className={getActiveClass("/alqasim/hadayiq")}>
                      مظلات حدائق
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/masabih'
                      className={getActiveClass("/alqasim/masabih")}>
                      مظلات مسابح
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/madakhil'
                      className={getActiveClass("/alqasim/madakhil")}>
                      مظلات مداخل
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/likasan'
                      className={getActiveClass("/alqasim/likasan")}>
                      مظلات لكسان
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/madaris'
                      className={getActiveClass("/alqasim/madaris")}>
                      مظلات مدارس
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/aswaq'
                      className={getActiveClass("/alqasim/aswaq")}>
                      مظلات اسواق
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/masajid'
                      className={getActiveClass("/alqasim/masajid")}>
                      مظلات مساجد
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/qumash'
                      className={getActiveClass("/alqasim/qumash")}>
                      مظلات قماش pvc
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/shinku'
                      className={getActiveClass("/alqasim/shinku")}>
                      مظلات شينكو
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  href='/sawatiralqasim'
                  className={getActiveClass("/sawatiralqasim")}>
                  القصيم بريده عنيزه
                </Link>
                <ul>
                  <li>
                    <Link
                      href='/sawatiralqasim/hadid'
                      className={getActiveClass("/sawatiralqasim/hadid")}>
                      سواتر حديد
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/sawatiralqasim/qumash1'
                      className={getActiveClass("/sawatiralqasim/qumash1")}>
                      سواتر قماش
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/sawatiralqasim/bilastik'
                      className={getActiveClass("/sawatiralqasim/bilastik")}>
                      سواتر بلاستيك
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/sawatiralqasim/likasan1'
                      className={getActiveClass("/sawatiralqasim/likasan1")}>
                      سواتر لكسان
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/sawatiralqasim/masabih1'
                      className={getActiveClass("/sawatiralqasim/masabih1")}>
                      سواتر مسابح
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  href='/manatiqalsueudia'
                  className={getActiveClass("/manatiqalsueudia")}>
                  مظلات مناطق السعودية
                </Link>
              </li>
              <li>
                <Link
                  href='/hanajiralqasim'
                  className={getActiveClass("/hanajiralqasim")}>
                  هناجر الرياض
                </Link>
              </li>
              <li>
                <Link
                  href='/jalasatwaburjulat'
                  className={getActiveClass("/jalasatwaburjulat")}>
                  مظلات جلسات وبرجولات
                </Link>
              </li>
              <li>
                <Link
                  href='/shubukalqasim'
                  className={getActiveClass("/shubukalqasim")}>
                  شبوك القصيم بريده عنيزه
                </Link>
              </li>
              <li>
                <Link
                  href='/biutshaer'
                  className={getActiveClass("/biutshaer")}>
                  بيوت شعر
                </Link>
              </li>
              <li>
                <Link
                  href='/aitasilbina'
                  className={getActiveClass("/aitasilbina")}>
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link
                  href='/wasawatirfialqasim'
                  className={getActiveClass("/wasawatirfialqasim")}>
                  مظلات وسواتر في القصيم بريده عنيزه
                </Link>
              </li>
              <li
                className='more hidden'
                data-width='50'>
                <Link
                  href='/almazid'
                  rel='more-button'
                  className={getActiveClass("/almazid")}>
                  المزيد
                </Link>
                <ul className='more-ul'></ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className='toolbar-option-wrapper'>
        <div className='toolbar-option flex-row sc-120 mc-85 lc-95'>
          <div className='sc-120 mc-40 lc-40'>
            <div>
              <SearchComponent />

              <div className='autocomplete-suggestions'></div>
            </div>
          </div>
          <div className='sc-120 sc-show mc-hide lc-hide toolbar-option-separator'></div>
          {/* header mobile menu */}
          <div className='sc-10 sc-show mc-hide lc-hide'>
            <div
              className='site-menu-float-button typcn typcn-large typcn-th-menu'
              onClick={() => {
                const floatMenu = document.querySelector(".site-menu-float");
                if (floatMenu) {
                  floatMenu.style.display = "block";
                }
              }}></div>
          </div>
          <div className='site-menu-float sc-hide mc-hide lc-hide'>
            <span
              className='typcn typcn-large typcn-delete site-menu-float-close-icon'
              onClick={() => {
                const floatMenu = document.querySelector(".site-menu-float");
                if (floatMenu) {
                  floatMenu.style.display = "none";
                }
              }}></span>
            <ul>
              <li>
                <Link
                  href='/'
                  className={`nav-home-link ${getActiveClass("/")}`}>
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href='/alqasim'
                  className={getActiveClass("/alqasim")}>
                  القصيم بريده عنيزه
                </Link>
                <ul>
                  <li>
                    <Link
                      href='/alqasim/sayaarat'
                      className={getActiveClass("/alqasim/sayaarat")}>
                      مظلات سيارات
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/hadayiq'
                      className={getActiveClass("/alqasim/hadayiq")}>
                      مظلات حدائق
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/masabih'
                      className={getActiveClass("/alqasim/masabih")}>
                      مظلات مسابح
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/madakhil'
                      className={getActiveClass("/alqasim/madakhil")}>
                      مظلات مداخل
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/likasan'
                      className={getActiveClass("/alqasim/likasan")}>
                      مظلات لكسان
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/madaris'
                      className={getActiveClass("/alqasim/madaris")}>
                      مظلات مدارس
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/aswaq'
                      className={getActiveClass("/alqasim/aswaq")}>
                      مظلات اسواق
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/masajid'
                      className={getActiveClass("/alqasim/masajid")}>
                      مظلات مساجد
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/qumash'
                      className={getActiveClass("/alqasim/qumash")}>
                      مظلات قماش pvc
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/alqasim/shinku'
                      className={getActiveClass("/alqasim/shinku")}>
                      مظلات شينكو
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  href='/sawatiralqasim'
                  className={getActiveClass("/sawatiralqasim")}>
                  القصيم بريده عنيزه
                </Link>
                <ul>
                  <li>
                    <Link
                      href='/sawatiralqasim/hadid'
                      className={getActiveClass("/sawatiralqasim/hadid")}>
                      سواتر حديد
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/sawatiralqasim/qumash1'
                      className={getActiveClass("/sawatiralqasim/qumash1")}>
                      سواتر قماش
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/sawatiralqasim/bilastik'
                      className={getActiveClass("/sawatiralqasim/bilastik")}>
                      سواتر بلاستيك
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/sawatiralqasim/likasan1'
                      className={getActiveClass("/sawatiralqasim/likasan1")}>
                      سواتر لكسان
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/sawatiralqasim/masabih1'
                      className={getActiveClass("/sawatiralqasim/masabih1")}>
                      سواتر مسابح
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  href='/manatiqalsueudia'
                  className={getActiveClass("/manatiqalsueudia")}>
                  مظلات مناطق السعودية
                </Link>
              </li>
              <li>
                <Link
                  href='/hanajiralqasim'
                  className={getActiveClass("/hanajiralqasim")}>
                  هناجر الرياض
                </Link>
              </li>
              <li>
                <Link
                  href='/jalasatwaburjulat'
                  className={getActiveClass("/jalasatwaburjulat")}>
                  مظلات جلسات وبرجولات
                </Link>
              </li>
              <li>
                <Link
                  href='/shubukalqasim'
                  className={getActiveClass("/shubukalqasim")}>
                  شبوك القصيم بريده عنيزه
                </Link>
              </li>
              <li>
                <Link
                  href='/biutshaer'
                  className={getActiveClass("/biutshaer")}>
                  بيوت شعر
                </Link>
              </li>
              <li>
                <Link
                  href='/aitasilbina'
                  className={getActiveClass("/aitasilbina")}>
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link
                  href='/wasawatirfialqasim'
                  className={getActiveClass("/wasawatirfialqasim")}>
                  مظلات وسواتر في القصيم بريده عنيزه
                </Link>
              </li>
            </ul>
          </div>
          {/* end header mobile menu */}
          <div className='sc-110 mc-80 lc-80 flex-row-reverse' style={{ alignItems: "center", justifyContent: "flex-start", gap: "8px" }}>
            <a
              className='header-cta sc-hide mc-show lc-show'
              href='https://wa.me/966500886893'
              target='_blank'
              rel='noopener noreferrer'>
              واتساب
            </a>
            <span className='header-socials flex-row-reverse'>
              <a
                href='https://www.instagram.com/farmankhan473488'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'>
                <svg viewBox='0 0 24 24' aria-hidden='true'>
                  <path
                    fill='currentColor'
                    d='M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z'
                  />
                </svg>
              </a>
              <a
                href='https://www.snapchat.com/add/f64250715'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Snapchat'>
                <svg viewBox='0 0 24 24' aria-hidden='true'>
                  <path
                    fill='currentColor'
                    d='M12.04 2c-2.2 0-3.9 1.6-3.9 3.95v.66c0 .2-.04.5-.3.62-.34.16-.86.1-1.28.35-.5.3-.46.86-.3 1.16.2.37.6.55.95.72.4.2.66.4.66.72 0 .9-.7 1.7-1.1 2.2-.55.7-1.05 1.35-.7 2.05.2.4.62.55 1.05.66.3.08.55.2.55.4 0 .9-.95 1.55-1.85 1.95-.35.15-.5.55-.3.88.15.25.45.38.75.38.55 0 1.1-.2 1.55-.2.2 0 .35.05.5.2.55.55 1.45 1.2 2.72 1.2s2.17-.65 2.72-1.2c.15-.15.3-.2.5-.2.45 0 1 .2 1.55.2.3 0 .6-.13.75-.38.2-.33.05-.73-.3-.88-.9-.4-1.85-1.05-1.85-1.95 0-.2.25-.32.55-.4.43-.11.85-.26 1.05-.66.35-.7-.15-1.35-.7-2.05-.4-.5-1.1-1.3-1.1-2.2 0-.32.26-.52.66-.72.35-.17.75-.35.95-.72.16-.3.2-.86-.3-1.16-.42-.25-.94-.19-1.28-.35-.26-.12-.3-.42-.3-.62v-.66C15.94 3.6 14.24 2 12.04 2Z'
                  />
                </svg>
              </a>
              <a
                href='https://wa.me/966500886893'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='WhatsApp'>
                <svg viewBox='0 0 24 24' aria-hidden='true'>
                  <path
                    fill='currentColor'
                    d='M17.47 14.38c-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.18.27-.72.9-.88 1.08-.16.18-.33.2-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.91-.16-.27-.02-.42.12-.55.13-.13.28-.33.42-.5.14-.16.18-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.55-.46-.47-.63-.48h-.54c-.19 0-.49.07-.75.35-.26.27-1 1-1 2.43s1.02 2.82 1.16 3.01c.14.19 2.01 3.07 4.87 4.31.68.29 1.21.47 1.62.6.68.21 1.3.18 1.79.11.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32ZM12.05 21.8h-.01a9.78 9.78 0 0 1-4.98-1.36l-.36-.21-3.7.97 1-3.61-.24-.37a9.78 9.78 0 0 1-1.5-5.22 9.82 9.82 0 0 1 9.8-9.8c2.62.01 5.08 1.02 6.93 2.87a9.74 9.74 0 0 1 2.87 6.93 9.82 9.82 0 0 1-9.8 9.8Z'
                  />
                </svg>
              </a>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
