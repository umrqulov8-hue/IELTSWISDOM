"use client";

import { useEffect, useRef } from "react";
import Head from "next/head";

const htmlContent = `
<div class="nav__background nav-white"></div>
<div class="nav__background nav-black"></div>

<div id="nav__overlay" class="nav__overlay"></div>

<nav class="nav nav-white static">
    <div class="nav__loading nav__list" aria-hidden="true">Loading</div>

    <div class="nav__point">
        <div></div>
        <div></div>
    </div>

    <div class="breadcrumb-append"><ul class="breadcrumb nav__list">
    <li class="nav-item active" data-name="Home">
        <a href="/" class="nav-link" data-transition="slide-up"><span></span>Home</a>
    </li>
    <li class="nav-item nav-item-absolute"><a href="#" class="nav-link" data-transition="slide-up"><span></span> Home</a></li>
</ul></div>

    <ul class="main-nav nav__list mobile-list nav__list-main">
        <li class="nav-item " data-main-nav-position="">
            <div class="nav-link-wrapper"><a href="https://www.rezo-zero.com/projects/" rel="nofollow" class="nav-link" data-transition="slide-up">Projects</a></div>
        </li>
        <li class="nav-item " data-main-nav-position="">
            <div class="nav-link-wrapper"><a href="https://www.rezo-zero.com/agency/" rel="nofollow" class="nav-link" data-transition="slide-up">Agency</a></div>
        </li>
        <li class="nav-item " data-main-nav-position="">
            <div class="nav-link-wrapper"><a href="https://www.rezo-zero.com/contact/" rel="nofollow" class="nav-link" data-transition="slide-up">Contact</a></div>
        </li>
        <li class="nav-item " data-main-nav-position="">
            <div class="nav-link-wrapper"><a href="https://www.rezo-zero.com/jobs/" rel="nofollow" class="nav-link" data-transition="slide-up">Jobs</a></div>
        </li>
    </ul>

    <ul class="nav__list mobile-list nav__lang">
        <li><a class="no-ajax-link active" href="/" rel="nofollow">en</a></li>
        <li><a class="no-ajax-link " href="https://www.rezo-zero.com/fr/" rel="nofollow">fr</a></li>
    </ul>

    <button type="button" class="nav-btn nav__mobile-btn">
        <span class="nav__mobile-label-wrapper">
            <span class="nav__mobile-label nav__mobile-label-close">Menu</span>
            <span class="nav__mobile-label nav__mobile-label-open">Close</span>
        </span>
    </button>
</nav>

<nav class="nav nav-black static">
    <div class="nav__loading nav__list">Loading</div>
    <div class="nav__point"><div></div><div></div></div>
    <div class="breadcrumb-append"><ul class="breadcrumb nav__list"><li class="nav-item active" data-name="Home"><a href="/" class="nav-link" data-transition="slide-up"><span></span>Home</a></li><li class="nav-item nav-item-absolute"><a href="#" class="nav-link" data-transition="slide-up"><span></span> Home</a></li></ul></div>
    <ul class="main-nav nav__list mobile-list nav__list-main">
        <li class="nav-item " data-main-nav-position=""><div class="nav-link-wrapper"><a href="https://www.rezo-zero.com/projects/" class="nav-link" data-transition="slide-up">Projects</a></div></li>
        <li class="nav-item " data-main-nav-position=""><div class="nav-link-wrapper"><a href="https://www.rezo-zero.com/agency/" class="nav-link" data-transition="slide-up">Agency</a></div></li>
        <li class="nav-item " data-main-nav-position=""><div class="nav-link-wrapper"><a href="https://www.rezo-zero.com/contact/" class="nav-link" data-transition="slide-up">Contact</a></div></li>
        <li class="nav-item " data-main-nav-position=""><div class="nav-link-wrapper"><a href="https://www.rezo-zero.com/jobs/" class="nav-link" data-transition="slide-up">Jobs</a></div></li>
    </ul>
    <ul class="nav__list mobile-list nav__lang">
        <li><a href="/" class="no-ajax-link active">en</a></li>
        <li><a href="https://www.rezo-zero.com/fr/" class="no-ajax-link ">fr</a></li>
    </ul>
    <button type="button" class="nav-btn nav__mobile-btn"><span class="nav__mobile-label-wrapper"><span class="nav__mobile-label nav__mobile-label-close">Menu</span><span class="nav__mobile-label nav__mobile-label-open">Close</span></span></button>
</nav>

<div id="interactive-scroller" class="interactive-scroller">
    <div class="interactive-scroller__layout interactive-scroller__layout-white"><div class="interactive-scroller__layout-inner"><div class="interactive-scroller__over-area"><div class="interactive-scroller__cursor-container"><div class="interactive-scroller__cursor"></div></div><div class="interactive-scroller__line-container"><div class="interactive-scroller__line"></div><div class="interactive-scroller__label">Scroll</div></div></div></div></div>
    <div class="interactive-scroller__layout interactive-scroller__layout-black"><div class="interactive-scroller__layout-inner"><div class="interactive-scroller__over-area"><div class="interactive-scroller__cursor-container"><div class="interactive-scroller__cursor"></div></div><div class="interactive-scroller__line-container"><div class="interactive-scroller__line"></div><div class="interactive-scroller__label">Scroll</div></div></div></div></div>
</div>
<div id="cursor" class="cursor"><div></div><div></div><span></span><span></span><span></span></div>

<main id="main-container" class="scroll-container">
    <section id="26f0b3e49832fde12ed39c2463ad30c5" data-background-color="white" class="page-content static home-page " data-align="left" data-meta-title="Rezo Zero • Agence digitale créative" data-urls="/|/fr/|" data-node-type="home">
        <div class="page-content_inner">
            <div class="page-overlay"></div>
            <div id="scroll" class="o-scroll">
                <div id="hidden-breadcrumb" class="hidden"><ul class="breadcrumb nav__list"><li class="nav-item active" data-name="Home"><a href="/" class="nav-link" data-transition="slide-up"><span></span>Home</a></li><li class="nav-item nav-item-absolute"><a href="#" class="nav-link" data-transition="slide-up"><span></span> Home</a></li></ul></div>

    <div class="js-animate" data-callback="scroll.changeLayout(layout:black)" data-viewport-offset="0.5" data-disable-inview-class="true" data-repeat="true">
        <div class="js-animate" data-layout="black" data-callback="nav.changeLayout(layout:black)" data-viewport-offset="0.95" data-disable-inview-class="true" data-repeat="true">

            <div id="home-socials" data-node-type="HomeSocialsBlock" class="home-socials page-block">
                <div class="home-socials__point"></div>
                <ul>
                    <li><a href="https://twitter.com/rezo_zero" target="_blank" rel="noopener" data-index="0">Tw</a></li>
                    <li><a href="https://www.linkedin.com/company/rezo-zero/about/" target="_blank" rel="noopener" data-index="1">Lk</a></li>
                    <li><a href="https://www.instagram.com/rezozero_agency/" target="_blank" rel="noopener" data-index="2">In</a></li>
                    <li><a href="https://github.com/rezozero/" target="_blank" rel="noopener" data-index="3">Git</a></li>
                </ul>
            </div>

            <figure id="texture-1" class="image-opener page-block texture-1" data-node-type="ImageOpenerBlock">
                <div class="mask">
                    <div class="js-animate" data-position="center" data-disable-inview-class="true" data-speed="-2">
                            <picture class="js-animate" data-position="top" data-disable-inview-class="true" data-speed="-2">
                                <source data-srcset="https://www.rezo-zero.com/home/texture-1.jpg.webp" type="image/webp">
                                <source data-srcset="https://www.rezo-zero.com/home/texture-1.jpg" type="image/jpg">
                                <img data-src="https://www.rezo-zero.com/home/texture-1.jpg" alt="Texture 1" class="lazyload">
                            </picture>
                    </div>
                </div>
            </figure>

            <figure id="texture-2" class="image-opener page-block texture-2" data-delay="1" data-node-type="ImageOpenerBlock">
                <div class="mask">
                    <div class="js-animate" data-position="center" data-disable-inview-class="true" data-speed="-2">
                            <div class="iframe-wrapper" style="height: 0; padding-bottom: 142.22222222222223%; position: relative;">
                                <iframe src="https://player.vimeo.com/video/423497883?background=1" width="900" height="640" frameborder="0"></iframe>
                            </div>
                    </div>
                </div>
            </figure>

            <figure id="texture-3" class="image-opener page-block texture-3" data-delay="0.65" data-node-type="ImageOpenerBlock">
                <div class="mask">
                    <div class="js-animate" data-position="center" data-disable-inview-class="true" data-speed="-2">
                            <picture>
                                <source data-srcset="https://www.rezo-zero.com/home/texture-3.jpg.webp" type="image/webp">
                                <source data-srcset="https://www.rezo-zero.com/home/texture-3.jpg" type="image/jpg">
                                <img data-src="https://www.rezo-zero.com/home/texture-3.jpg" alt="Texture 3" class="lazyload">
                            </picture>
                    </div>
                </div>
            </figure>

            <div class="container-fluid page-content_wrapper">
                <div class="row">
                    <div class="offset-1 col-10 col-lg-10">
                        <div class="container-fluid introduction_wrapper">
                            <div class="row"><div data-node-type="Introduction" id="introduction-block" class="introduction page-block">Rezo Zero is a creative agency that builds powerful digital solutions.</div></div>
                        </div>
                    </div>
                </div>

                <div class="page-text-content container-fluid position-relative">
                    <div class="row">
                        <div class="offset-1 offset-lg-2 offset-lg-2 offset-xl-3 col-10 col-sm-4 col-lg-4 col-xl-3">
                            <div class="js-animate title-list show-scroll mb-4 mb-md-0" data-callback="show.Scroll()">
                                <h2 class="overtitle">Skills</h2>
                                <ul class="js-animate show-scroll" data-callback="show.Scroll()">
                                    <li>Strategy</li><li>Brand Identities</li><li>Art Direction</li><li>UI/UX Design</li><li>Back &amp; Front End</li><li>Eshop</li><li>Admin system</li><li>AR /VR</li>
                                </ul>
                            </div>
                        </div>
                        <div class="offset-1 offset-lg-0 col-10 col-sm-5 col-lg-4 col-xl-3 max-content-width js-animate show-scroll markdown" data-callback="show.Scroll()">
                            <h2 class="overtitle">Mission &amp; Vision</h2><p>We are Rezo Zero, a digital creative agency that designs and develops unique brand identities and tailor-made digital solutions. We help our clients from the definition of their strategy to the realization of their digital ecosystem. At the heart of our approach is the constant search for the juncture between aesthetic beauty and technical performance.</p>
                            <p><a href="https://www.rezo-zero.com/agency/">More</a></p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="enquiries">
                <a href="https://www.rezo-zero.com/projects/">More projects</a>
            </div>
            
        </div>
    </div>

    <div class="main_background main_background-black"></div>
    <div class="main_background main_background-white"></div>
    <footer class="footer js-animate" data-callback="scroll.changeLayout(layout:white)" data-viewport-offset="0.65" data-disable-inview-class="true" data-repeat="true">
        <div class="js-animate" data-callback="nav.changeLayout(layout:white)" data-viewport-offset="0.95" data-disable-inview-class="true" data-repeat="true">
            <div id="back-to-top" class="back-to-top">
                <div class="back-to-top__el">
                    <div class="back-to-top__el-top back-to-top__el-top-left"></div>
                    <div class="back-to-top__el-top back-to-top__el-top-right"></div>
                    <div class="back-to-top__el-bottom"></div>
                </div>
            </div><div class="footer__shape lazyload" data-bg="https://www.rezo-zero.com/footer-texture.jpg"></div>

            <div class="js-animate" data-callback="show.Scroll(type:footer)">
                <div class="footer__content container-fluid">
                    <div class="footer__content-bg"></div>
                    <div class="row footer__first-line">
                        <div class="offset-1 col-10 col-md-5 col-xl-4 footer__column footer__info-container">
                            <a href="/" class="big-letter d-md-none">R</a>
                            <div class="row footer__line">
                                <div class="footer__info footer__column col-md-6">
                                    <p class="footer__label">Phone</p>
                                    <p>&#43;33 (0)9 72 28 04 34</p>
                                </div>
                                <div class="footer__info footer__column col-md-6">
                                    <p class="footer__label">Enquiries</p>
                                    <p><a href="mailto:contact@rezo-zero.com">contact@rezo-zero.com</a><br></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </div></div>
    </section>
    <div class="main_background generic_bg_black main_background-black"></div>
    <div class="main_background generic_bg_white main_background-white"></div>
</main>
`;

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Prepare global styles and behaviors
        document.documentElement.className = "has-smooth-scroll";
        document.body.className = "home static";

        // Add stylesheets dynamically
        const style1 = document.createElement("link");
        style1.rel = "stylesheet";
        style1.href = "https://www.rezo-zero.com/css/app.css";
        document.head.appendChild(style1);

        const customStyles = document.createElement("style");
        customStyles.innerHTML = \`
            @font-face {
                font-family: "rz-bold";
                src: url(https://www.rezo-zero.com/fonts/rezozero/rz-bold.eot);
                src: url(https://www.rezo-zero.com/fonts/rezozero/rz-bold.eot#iefix) format('embedded-opentype'),
                url(https://www.rezo-zero.com/fonts/rezozero/rz-bold.woff2) format('woff2'),
                url(https://www.rezo-zero.com/fonts/rezozero/rz-bold.woff) format('woff'),
                url(https://www.rezo-zero.com/fonts/rezozero/rz-bold.svg) format('svg');
                font-style: normal;
                font-weight: bold;
            }
            @font-face {
                font-family: "rz-regular";
                src: url(https://www.rezo-zero.com/fonts/rezozero/rz-regular.eot);
                src: url(https://www.rezo-zero.com/fonts/rezozero/rz-regular.eot?#iefix) format('embedded-opentype'),
                    url(https://www.rezo-zero.com/fonts/rezozero/rz-regular.woff2) format('woff2'),
                    url(https://www.rezo-zero.com/fonts/rezozero/rz-regular.woff) format('woff'),
                url(https://www.rezo-zero.com/fonts/rezozero/rz-regular.svg) format('svg');
                font-style: normal;
                font-weight: normal;
            }
        \`;
        document.head.appendChild(customStyles);

        // Add scripts dynamically to execute interactive parallax/animations
        const scripts = [
            { src: "https://www.rezo-zero.com/js/modern.vendors~app.js", type: "module", crossorigin: "anonymous" },
            { src: "https://www.rezo-zero.com/js/modern.app.js", type: "module", crossorigin: "anonymous" }
        ];

        scripts.forEach(s => {
            const script = document.createElement("script");
            script.src = s.src;
            script.type = s.type;
            script.crossOrigin = s.crossorigin;
            document.body.appendChild(script);
        });

        return () => {
            // Cleanup scripts on unmount to prevent memory leaks if route changes
            document.head.removeChild(style1);
            document.head.removeChild(customStyles);
            document.documentElement.className = "";
            document.body.className = "";
        };
    }, []);

    return (
        <div suppressHydrationWarning ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}
