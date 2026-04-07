"use client";
import React, { useEffect } from 'react';

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
</ul>


</div>

    <ul class="main-nav nav__list mobile-list nav__list-main">
    
        <li class="nav-item "
            data-main-nav-position="">
            <div class="nav-link-wrapper">
                <a href="https://www.rezo-zero.com/projects/"
                   rel="nofollow"
                   class="nav-link"
                   data-transition="slide-up">Projects</a>
            </div>
        </li>
    
        <li class="nav-item "
            data-main-nav-position="">
            <div class="nav-link-wrapper">
                <a href="https://www.rezo-zero.com/agency/"
                   rel="nofollow"
                   class="nav-link"
                   data-transition="slide-up">Agency</a>
            </div>
        </li>
    
        <li class="nav-item "
            data-main-nav-position="">
            <div class="nav-link-wrapper">
                <a href="https://www.rezo-zero.com/contact/"
                   rel="nofollow"
                   class="nav-link"
                   data-transition="slide-up">Contact</a>
            </div>
        </li>
    
        <li class="nav-item "
            data-main-nav-position="">
            <div class="nav-link-wrapper">
                <a href="https://www.rezo-zero.com/jobs/"
                   rel="nofollow"
                   class="nav-link"
                   data-transition="slide-up">Jobs</a>
            </div>
        </li>
    
    </ul>

    
        <ul class="nav__list mobile-list nav__lang">
        
            <li>
                <a class="no-ajax-link active"
                   href="/"
                   rel="nofollow">en</a>
            </li>
        
            <li>
                <a class="no-ajax-link "
                   href="https://www.rezo-zero.com/fr/"
                   rel="nofollow">fr</a>
            </li>
        
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

    <div class="nav__point">
        <div></div>
        <div></div>
    </div>

    <div class="breadcrumb-append"><ul class="breadcrumb nav__list">
    
    
    <li class="nav-item active" data-name="Home">
        <a href="/" class="nav-link" data-transition="slide-up"><span></span>Home</a>
    </li>

    <li class="nav-item nav-item-absolute"><a href="#" class="nav-link" data-transition="slide-up"><span></span> Home</a></li>
</ul>


</div>

    <ul class="main-nav nav__list mobile-list nav__list-main">

        
            <li class="nav-item "
                data-main-nav-position="">
                <div class="nav-link-wrapper">
                    <a href="https://www.rezo-zero.com/projects/" class="nav-link" data-transition="slide-up">Projects</a>
                </div>
            </li>
        
            <li class="nav-item "
                data-main-nav-position="">
                <div class="nav-link-wrapper">
                    <a href="https://www.rezo-zero.com/agency/" class="nav-link" data-transition="slide-up">Agency</a>
                </div>
            </li>
        
            <li class="nav-item "
                data-main-nav-position="">
                <div class="nav-link-wrapper">
                    <a href="https://www.rezo-zero.com/contact/" class="nav-link" data-transition="slide-up">Contact</a>
                </div>
            </li>
        
            <li class="nav-item "
                data-main-nav-position="">
                <div class="nav-link-wrapper">
                    <a href="https://www.rezo-zero.com/jobs/" class="nav-link" data-transition="slide-up">Jobs</a>
                </div>
            </li>
        
    </ul>

    
        <ul class="nav__list mobile-list nav__lang">
        
        <li>
            <a href="/" class="no-ajax-link active">en</a>
        </li>
        
        <li>
            <a href="https://www.rezo-zero.com/fr/" class="no-ajax-link ">fr</a>
        </li>
        
        </ul>
    

    <button type="button" class="nav-btn nav__mobile-btn">
        <span class="nav__mobile-label-wrapper">
            <span class="nav__mobile-label nav__mobile-label-close">Menu</span>
            <span class="nav__mobile-label nav__mobile-label-open">Close</span>
        </span>
    </button>
</nav>


<div id="interactive-scroller" class="interactive-scroller">
    <div class="interactive-scroller__layout interactive-scroller__layout-white">
        <div class="interactive-scroller__layout-inner">
            <div class="interactive-scroller__over-area">
                <div class="interactive-scroller__cursor-container">
                    <div class="interactive-scroller__cursor"></div>
                </div>
                <div class="interactive-scroller__line-container">
                    <div class="interactive-scroller__line"></div>
                    <div class="interactive-scroller__label">Scroll</div>
                </div>
            </div>
        </div>
    </div>
    <div class="interactive-scroller__layout interactive-scroller__layout-black">
        <div class="interactive-scroller__layout-inner">
            <div class="interactive-scroller__over-area">
                <div class="interactive-scroller__cursor-container">
                    <div class="interactive-scroller__cursor"></div>
                </div>
                <div class="interactive-scroller__line-container">
                    <div class="interactive-scroller__line"></div>
                    <div class="interactive-scroller__label">Scroll</div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="cursor" class="cursor">
        <div></div>
        <div></div>
        <span></span>
        <span></span>
        <span></span>
    </div>

    

    <main id="main-container" class="scroll-container">
        <section id="26f0b3e49832fde12ed39c2463ad30c5"
             data-background-color="white"
             class="page-content static home-page "
             data-align="left"
             data-meta-title="IELTS Wisdom"
             data-urls="/|/fr/|"
             data-node-type="home">
            <div class="page-content_inner">
                <div class="page-overlay"></div>
                <div id="scroll" class="o-scroll">
                    <div id="hidden-breadcrumb" class="hidden"><ul class="breadcrumb nav__list">
    
    
    <li class="nav-item active" data-name="Home">
        <a href="/" class="nav-link" data-transition="slide-up"><span></span>Home</a>
    </li>

    <li class="nav-item nav-item-absolute"><a href="#" class="nav-link" data-transition="slide-up"><span></span> Home</a></li>
</ul>


</div>

                    
                    
    
    
    

    <div class="js-animate"
         data-callback="scroll.changeLayout(layout:black)"
         data-viewport-offset="0.5"
         data-disable-inview-class="true"
         data-repeat="true">
        <div class="js-animate"
             data-layout="black"
             data-callback="nav.changeLayout(layout:black)"
             data-viewport-offset="0.95"
             data-disable-inview-class="true"
             data-repeat="true">

            <div id="home-socials"
                 data-node-type="HomeSocialsBlock"
                 class="home-socials page-block">
                <div class="home-socials__point"></div>
                <ul>
                
                    
                    <li><a href="https://twitter.com/rezo_zero" target="_blank" rel="noopener" data-index="0">Tw</a></li>
                    
                
                    
                    <li><a href="https://www.linkedin.com/company/rezo-zero/about/" target="_blank" rel="noopener" data-index="1">Lk</a></li>
                    
                
                    
                    <li><a href="https://www.instagram.com/rezozero_agency/" target="_blank" rel="noopener" data-index="2">In</a></li>
                    
                
                    
                    <li><a href="https://github.com/rezozero/" target="_blank" rel="noopener" data-index="3">Git</a></li>
                    
                
                </ul>
            </div>

            <figure id="texture-1"
                    class="image-opener page-block texture-1"
                    data-node-type="ImageOpenerBlock">
                <div class="mask">
                    <div class="js-animate"
                         data-position="center"
                         data-disable-inview-class="true"
                         data-speed="-2">

                         
                         
                         
                         

                         
                            <picture class="js-animate"
                                    data-position="top"
                                    data-disable-inview-class="true"
                                    data-speed="-2">
                                <source data-srcset="https://www.rezo-zero.com/home/texture-1.jpg.webp" type="image/webp">
                                
                                <source data-srcset="https://www.rezo-zero.com/home/texture-1.jpg" type="image/jpg">
                                <img data-src="https://www.rezo-zero.com/home/texture-1.jpg" alt="Texture 1" class="lazyload">
                            </picture>
                        
                    </div>
                </div>
            </figure>

            <figure id="texture-2"
                    class="image-opener page-block texture-2"
                    data-delay="1"
                    data-node-type="ImageOpenerBlock">
                <div class="mask">
                    <div class="js-animate"
                         data-position="center"
                         data-disable-inview-class="true"
                         data-speed="-2">

                        
                        
                        
                        

                        
                            
                            <div class="iframe-wrapper" style="height: 0; padding-bottom: 142.22222222222223%; position: relative;">
                                <iframe src="https://player.vimeo.com/video/423497883?background=1" width="900" height="640" frameborder="0"></iframe>
                            </div>
                        
                    </div>
                </div>
            </figure>

            <figure id="texture-3"
                    class="image-opener page-block texture-3"
                    data-delay="0.65"
                    data-node-type="ImageOpenerBlock">
                <div class="mask">
                    <div class="js-animate"
                         data-position="center"
                         data-disable-inview-class="true"
                         data-speed="-2">

                         
                         
                         
                         

                         
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
    <div class="row"><div data-node-type="Introduction"
             id="introduction-block"
             class="introduction page-block">Master every section OF THE IELTS EXAM.</div></div>
</div>

</div>
                </div>

                

<div class="page-text-content container-fluid position-relative">
    <div class="row">
        <div class="offset-1 offset-lg-2 offset-lg-2 offset-xl-3 col-10 col-sm-4 col-lg-4 col-xl-3">
            <div class="js-animate title-list show-scroll mb-4 mb-md-0"
                 data-callback="show.Scroll()">
                <h2 class="overtitle">Skills</h2>

                <ul class="js-animate show-scroll"
                    data-callback="show.Scroll()">
                    
                        <li>Strategy</li>
                    
                        <li>Brand Identities</li>
                    
                        <li>Art Direction</li>
                    
                        <li>UI/UX Design</li>
                    
                        <li>Back &amp; Front End</li>
                    
                        <li>Eshop</li>
                    
                        <li>Admin system</li>
                    
                        <li>AR /VR</li>
                    
                </ul>
            </div>
        </div>

        <div class="offset-1 offset-lg-0 col-10 col-sm-5 col-lg-4 col-xl-3 max-content-width js-animate show-scroll markdown"
             data-callback="show.Scroll()">
            <h2 class="overtitle">Mission &amp; Vision</h2><p>Reach Band 8.5+ with precision evaluations, authentic mock tests, and systematic section mastery designed by experts. We help our clients from the definition of their strategy to the realization of their digital ecosystem. At the heart of our approach is the constant search for the juncture between aesthetic beauty and technical performance. We envision each of our projects as a singular piece at the service of our clients' communication goals. We want them to be resolutely turned towards agility and simplicity to face the complex challenges of the modern world.</p>
<p><a href="https://www.rezo-zero.com/agency/">More</a></p>
</div>
    </div>
</div>

            </div>

            
            <div id="main-client-list"
                 class="container-fluid client-list page-block"
                 data-node-type="ClientList">
                <h2 class="overtitle">We worked for them</h2>

                <div class="line line-1">
                    
                    <span class="client-name">Centre national de la musique</span>
                    
                    
                    <span class="client-name">Radio France</span>
                    
                    
                    <span class="client-name">Opéra national de Lyon</span>
                    
                    
                    <span class="client-name">Centre Pompidou</span>
                    
                    
                    <span class="client-name">Metz</span>
                    
                    
                    <span class="client-name">Fondation Louis Vuitton</span>
                    
                    
                    <span class="client-name">Klépierre</span>
                    
                    
                    <span class="client-name">Blackfin</span>
                    
                    
                    <span class="client-name">Seb</span>
                    
                    
                    <span class="client-name">Théâtre de la Ville de Paris</span>
                    
                    
                    <span class="client-name">Renault</span>
                    
                    
                    <span class="client-name">Opéra national de Paris</span>
                    
                    
                    <span class="client-name">AROP</span>
                    
                    
                    <span class="client-name">Only Lyon</span>
                    
                    
                    <span class="client-name">Opéra national du Rhin</span>
                    
                    
                    <span class="client-name">Ville de Paris</span>
                    
                    
                    <span class="client-name">Ministère de la Culture</span>
                    
                    
                    <span class="client-name">Théâtre du Châtelet</span>
                    
                    
                    <span class="client-name">Auditorium de Lyon</span>
                    
                    
                    <span class="client-name">La Biennale de Lyon</span>
                    
                    
                    <span class="client-name">Teva Laboratoire</span>
                    
                    
                    <span class="client-name">Truffle Capital</span>
                    
                </div>
                <div class="line line-2">
                    
                    <span class="client-name">Centre national de la musique</span>
                    
                    
                    <span class="client-name">Radio France</span>
                    
                    
                    <span class="client-name">Opéra national de Lyon</span>
                    
                    
                    <span class="client-name">Centre Pompidou</span>
                    
                    
                    <span class="client-name">Metz</span>
                    
                    
                    <span class="client-name">Fondation Louis Vuitton</span>
                    
                    
                    <span class="client-name">Klépierre</span>
                    
                    
                    <span class="client-name">Blackfin</span>
                    
                    
                    <span class="client-name">Seb</span>
                    
                    
                    <span class="client-name">Théâtre de la Ville de Paris</span>
                    
                    
                    <span class="client-name">Renault</span>
                    
                    
                    <span class="client-name">Opéra national de Paris</span>
                    
                    
                    <span class="client-name">AROP</span>
                    
                    
                    <span class="client-name">Only Lyon</span>
                    
                    
                    <span class="client-name">Opéra national du Rhin</span>
                    
                    
                    <span class="client-name">Ville de Paris</span>
                    
                    
                    <span class="client-name">Ministère de la Culture</span>
                    
                    
                    <span class="client-name">Théâtre du Châtelet</span>
                    
                    
                    <span class="client-name">Auditorium de Lyon</span>
                    
                    
                    <span class="client-name">La Biennale de Lyon</span>
                    
                    
                    <span class="client-name">Teva Laboratoire</span>
                    
                    
                    <span class="client-name">Truffle Capital</span>
                    
                </div>
            </div>

            <div class="project-list_title js-animate show-scroll" data-callback="show.Scroll()"><span>Selected projects</span></div>
            

<div class="project-list_wrapper u-move page-block" id="project-list" data-node-type="ProjectList">
    <div class="project-line"></div>
    <div class="project-list">
    
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/memorial-de-verdun/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="0"
                   data-transition="project">
                


    
    <div id="project-image-9c3eca646c7fdc800d766ea8eb0ace4a"
         class="project-image even">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/memorial-de-verdun/thumbnail_memorial.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/memorial-de-verdun/thumbnail_memorial.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="0"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/memorial-de-verdun/thumbnail_memorial.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="0"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/memorial-de-verdun/"
                       data-transition="project"
                       data-index="0"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">Mémorial de Verdun</h2>
                    </a>
                </div>
            </div>

            
        
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/musee-des-beaux-arts-de-rennes/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="1"
                   data-transition="project">
                


    
    <div id="project-image-958098f2ee7bc9b36531abb9a3928985"
         class="project-image odd">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/musee-des-beaux-arts-de-rennes/dir_culture_musee_des_beaux_arts_3_.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/musee-des-beaux-arts-de-rennes/dir_culture_musee_des_beaux_arts_3_.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="1"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/musee-des-beaux-arts-de-rennes/dir_culture_musee_des_beaux_arts_3_.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="1"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/musee-des-beaux-arts-de-rennes/"
                       data-transition="project"
                       data-index="1"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">Musée des beaux-arts de Rennes</h2>
                    </a>
                </div>
            </div>

            
        
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/mingat/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="2"
                   data-transition="project">
                


    
    <div id="project-image-bdfc842097ea3cc51ea642e516c0098a"
         class="project-image even">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/mingat/samuel_girven_ngbtprreujy_unsplash_1_.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/mingat/samuel_girven_ngbtprreujy_unsplash_1_.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="2"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/mingat/samuel_girven_ngbtprreujy_unsplash_1_.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="2"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/mingat/"
                       data-transition="project"
                       data-index="2"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">Mingat</h2>
                    </a>
                </div>
            </div>

            
        
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/furlan-marri/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="3"
                   data-transition="project">
                


    
    <div id="project-image-29099b56838dfe2c3abd7fed24050a0a"
         class="project-image odd">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/furlan-marri/thumbnail_1.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/furlan-marri/thumbnail_1.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="3"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/furlan-marri/thumbnail_1.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="3"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/furlan-marri/"
                       data-transition="project"
                       data-index="3"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">E-commerce</div>
                        <h2 class="project-info_name">Furlan Marri</h2>
                    </a>
                </div>
            </div>

            
        
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/les-celestins-theatre-de-lyon/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="4"
                   data-transition="project">
                


    
    <div id="project-image-2078b2cd6744fe577d9338540e241527"
         class="project-image even">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/les-celestins-theatre-de-lyon/celestins_urbain_5595.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/les-celestins-theatre-de-lyon/celestins_urbain_5595.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="4"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/les-celestins-theatre-de-lyon/celestins_urbain_5595.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="4"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/les-celestins-theatre-de-lyon/"
                       data-transition="project"
                       data-index="4"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">Les Célestins, Théâtre de Lyon</h2>
                    </a>
                </div>
            </div>

            
        
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/unanime/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="5"
                   data-transition="project">
                


    
    <div id="project-image-b385c27dc79e5ac419f7d5b4679b1c1e"
         class="project-image odd">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/unanime/unanime_cover03.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/unanime/unanime_cover03.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="5"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/unanime/unanime_cover03.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="5"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/unanime/"
                       data-transition="project"
                       data-index="5"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">Unanime</h2>
                    </a>
                </div>
            </div>

            
        
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/cite-musicale-metz/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="6"
                   data-transition="project">
                


    
    <div id="project-image-83c4d85c651d66132120482b549214ff"
         class="project-image even">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/cite-musicale-metz/fullwidth1_light.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/cite-musicale-metz/fullwidth1_light.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="6"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/cite-musicale-metz/fullwidth1_light.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="6"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/cite-musicale-metz/"
                       data-transition="project"
                       data-index="6"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">Cité musicale Metz</h2>
                    </a>
                </div>
            </div>

            
        
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/creative-spirit/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="7"
                   data-transition="project">
                


    
    <div id="project-image-5b95c35c9af4d954875a703bee617efd"
         class="project-image odd">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/creative-spirit/ag_engie_21_04_22_florian_leger_294.raw.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/creative-spirit/ag_engie_21_04_22_florian_leger_294.raw.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="7"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/creative-spirit/ag_engie_21_04_22_florian_leger_294.raw.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="7"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/creative-spirit/"
                       data-transition="project"
                       data-index="7"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">Creative Spirit</h2>
                    </a>
                </div>
            </div>

            
        
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/modelec/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="8"
                   data-transition="project">
                


    
    <div id="project-image-52bdaaa2d88483308ad9a103bf65829e"
         class="project-image even">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/modelec/visual_2x.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/modelec/visual_2x.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="8"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/modelec/visual_2x.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="8"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/modelec/"
                       data-transition="project"
                       data-index="8"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">Modelec</h2>
                    </a>
                </div>
            </div>

            
        
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/centre-national-de-la-musique/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="9"
                   data-transition="project">
                


    
    <div id="project-image-40858beec861f080ad29253be9a0e4cc"
         class="project-image odd">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/centre-national-de-la-musique/cnm_poster01.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/centre-national-de-la-musique/cnm_poster01.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="9"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/centre-national-de-la-musique/cnm_poster01.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="9"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/centre-national-de-la-musique/"
                       data-transition="project"
                       data-index="9"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">Centre National de la Musique</h2>
                    </a>
                </div>
            </div>

            
        
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/eden-home/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="10"
                   data-transition="project">
                


    
    <div id="project-image-0bda2073d27666e68e8f5252aa03581e"
         class="project-image even">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/eden-home/edenhome_poster02.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/eden-home/edenhome_poster02.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="10"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/eden-home/edenhome_poster02.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="10"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/eden-home/"
                       data-transition="project"
                       data-index="10"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">Eden Home</h2>
                    </a>
                </div>
            </div>

            
        
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/centre-pompidou-metz/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="11"
                   data-transition="project">
                


    
    <div id="project-image-9bd0d4bbea1760aa632922d0f047e287"
         class="project-image odd">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/centre-pompidou-metz/cpm_poster.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/centre-pompidou-metz/cpm_poster.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="11"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/centre-pompidou-metz/cpm_poster.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="11"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/centre-pompidou-metz/"
                       data-transition="project"
                       data-index="11"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">Centre Pompidou-Metz</h2>
                    </a>
                </div>
            </div>

            
        
    
        
            <div data-image-height="0.66"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/opera-de-lyon/"
                   class="project-image-link project"
                   data-image-height="0.66"
                   data-index="12"
                   data-transition="project">
                


    
    <div id="project-image-63ce82aca554f8604cdf11ac0fc3fa11"
         class="project-image even">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/opera-de-lyon/operalyon_poster.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/opera-de-lyon/operalyon_poster.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="12"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/opera-de-lyon/operalyon_poster.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="12"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/opera-de-lyon/"
                       data-transition="project"
                       data-index="12"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">Opéra de Lyon</h2>
                    </a>
                </div>
            </div>

            
        
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/blazetype/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="13"
                   data-transition="project">
                


    
    <div id="project-image-a1af4f17000e879b2583aee1b78a2d21"
         class="project-image odd">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/blazetype/blazetype_poster.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/blazetype/blazetype_poster.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="13"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/blazetype/blazetype_poster.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="13"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/blazetype/"
                       data-transition="project"
                       data-index="13"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">eShop</div>
                        <h2 class="project-info_name">BlazeType</h2>
                    </a>
                </div>
            </div>

            
        
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/safran-groupe/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="14"
                   data-transition="project">
                


    
    <div id="project-image-b4051eb76c0dd849d39d60667f934ee0"
         class="project-image even">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/safran-groupe/saf2015_0183433_1.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/safran-groupe/saf2015_0183433_1.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="14"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/safran-groupe/saf2015_0183433_1.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="14"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/safran-groupe/"
                       data-transition="project"
                       data-index="14"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">Safran Groupe</h2>
                    </a>
                </div>
            </div>

            
        
    
        
    
        
            <div data-image-height="NaN"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/expodcast/"
                   class="project-image-link project"
                   data-image-height="NaN"
                   data-index="15"
                   data-transition="project">
                


    
    <div id="project-image-24e9d50f41b244669365a8dcd057ede7"
         class="project-image even">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/expodcast/cmbv_poster.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/expodcast/cmbv_poster.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="16"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/expodcast/cmbv_poster.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="15"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/expodcast/"
                       data-transition="project"
                       data-index="15"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Experience</div>
                        <h2 class="project-info_name">Expodcast</h2>
                    </a>
                </div>
            </div>

            
        
    
        
    
        
    
        
    
        
            <div data-image-height="0.6"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/city-of-paris/"
                   class="project-image-link project"
                   data-image-height="0.6"
                   data-index="16"
                   data-transition="project">
                


    
    <div id="project-image-cf07e8eddfb99933e7bb331653963526"
         class="project-image even">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/city-of-paris/parisfr_poster.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/city-of-paris/parisfr_poster.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="20"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/city-of-paris/parisfr_poster.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="16"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/city-of-paris/"
                       data-transition="project"
                       data-index="16"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">City of Paris</h2>
                    </a>
                </div>
            </div>

            
        
    
        
    
        
    
        
            <div data-image-height="0.66"
                 class="project-list_item">
                <a href="https://www.rezo-zero.com/projects/opera-national-du-rhin-632b374b13800/"
                   class="project-image-link project"
                   data-image-height="0.66"
                   data-index="17"
                   data-transition="project">
                


    
    <div id="project-image-e1f2d4a55515895675db1c948b6a78d6"
         class="project-image odd">
        <div class="project-image_inner">
            <div class="project-image_inner-reverse">
                <div class="js-animate o-background" data-speed="-0.8"
                     data-position="center">

                    
                        <picture>
                            
                            <source data-srcset="https://www.rezo-zero.com/projects/opera-national-du-rhin-632b374b13800/onr_header.jpg.webp" type="image/webp">
                            <source data-srcset="https://www.rezo-zero.com/projects/opera-national-du-rhin-632b374b13800/onr_header.jpg" type="image/jpeg">
                            <img data-project-list
                                 data-index="23"
                                 class="project-image_background o-background lazyload"
                                 alt=""
                                 data-src="https://www.rezo-zero.com/projects/opera-national-du-rhin-632b374b13800/onr_header.jpg">
                        </picture>
                    
                </div>
            </div>
        </div>
    </div>


                </a>
                <div class="project-info js-animate"
                     data-position="middle"
                     data-index="17"
                     data-speed="0.4">
                    <a href="https://www.rezo-zero.com/projects/opera-national-du-rhin-632b374b13800/"
                       data-transition="project"
                       data-index="17"
                       class="project-info_wrapper">
                        <div class="project-info_date overtitle">Website</div>
                        <h2 class="project-info_name">Opéra national du Rhin</h2>
                    </a>
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

                    

<footer class="footer js-animate"
        data-callback="scroll.changeLayout(layout:white)"
        data-viewport-offset="0.65"
        data-disable-inview-class="true"
        data-repeat="true">
        <div class="js-animate"
             data-callback="nav.changeLayout(layout:white)"
             data-viewport-offset="0.95"
             data-disable-inview-class="true"
             data-repeat="true">

<div id="back-to-top" class="back-to-top">
    <div class="back-to-top__el">
        <div class="back-to-top__el-top back-to-top__el-top-left"></div>
        <div class="back-to-top__el-top back-to-top__el-top-right"></div>
        <div class="back-to-top__el-bottom"></div>
    </div>
</div><div class="footer__shape lazyload" data-bg="https://www.rezo-zero.com/footer-texture.jpg"></div>

        <div class="js-animate" data-callback="show.Scroll(type:footer)"><div class="footer__content container-fluid">
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
                    <p>
                        <a href="mailto:contact@rezo-zero.com">contact@rezo-zero.com</a><br>
                    </p>
                </div>
            </div>
            <div class="row footer__line">
                <div class="footer__info footer__column col-md-6">
                    <p class="footer__label">Address</p>
                        <p>25 rue du Bât d&rsquo;Argent<br>
69001 Lyon<br>
France</p>
                    </div>
                <div class="footer__info footer__column col-md-6">
                    <p class="footer__label">Follow us</p>
                    <p class="socials">
                        
                        <a href="https://twitter.com/rezo_zero" target="_blank" rel="noopener">Tw</a>
                    
                        
                        <a href="https://www.linkedin.com/company/rezo-zero/about/" target="_blank" rel="noopener">Lk</a>
                    
                        
                        <a href="https://www.instagram.com/rezozero_agency/" target="_blank" rel="noopener">In</a>
                    
                        
                        <a href="https://github.com/rezozero/" target="_blank" rel="noopener">Git</a>
                    
                    </p>
                </div>
            </div>
        </div>

        <div class="footer__column footer__brand offset-1 offset-md-0 offset-xl-2 col-10 col-md-3 col-xl-2 show-scroll js-animate" data-callback="show.Scroll()">
            <a href="/" class="big-letter">R</a>
            <p>Founded in 2013, Rezo Zero is a digital creative agency that designs and develops unique brand identities and tailor-made digital solutions. Our teams are based in Lyon with an extension in Paris, France.</p>
        </div>
    </div>

    <div class="row footer__second-line">
        <div class="offset-1 col-10 col-md-5 col-xl-4 footer__column">
            <div class="row footer__line">
                <div class="footer__info footer__column col-md-6">
                    <div class="photos-copyright"></div>
                </div>
                <div class="footer__info footer__column col-md-6">
                    <ul class="footer__nav">
                        
                            <li><a href="https://www.rezo-zero.com/legal/"
                                   rel="nofollow"
                                   class="nav-link"
                                   data-transition="slide-up">Legals</a></li>
                        
                    </ul>
                </div>
            </div>
        </div>
        <div class="row footer__line offset-1 offset-md-0 offset-xl-2 col-12 col-md-3 col-xl-2">
            <div class="footer__info">
                © 2025 - Rezo Zero</div>
        </div>
    </div>
</div>
</div>
    </div>
</footer>

                </div>
            </div>
        </section>

        <div class="main_background generic_bg_black main_background-black"></div>
        <div class="main_background generic_bg_white main_background-white"></div>
    </main>

    <script type="module" crossorigin src="https://www.rezo-zero.com/js/modern.vendors~app.js"></script>
    <script type="module" crossorigin src="https://www.rezo-zero.com/js/modern.app.js"></script>

    <script nomodule defer crossorigin src="https://www.rezo-zero.com/js/legacy.vendors~app.js"></script>
    <script nomodule defer crossorigin src="https://www.rezo-zero.com/js/legacy.app.js"></script>

`;

const customStylesStr = `

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

    
`.replace(/@font-face\s*{/g, '@font-face { font-display: swap;');

export default function Home() {
    useEffect(() => {
        document.documentElement.className = "has-smooth-scroll";
        document.body.className = "home static";

        const style1 = document.createElement("link");
        style1.rel = "stylesheet";
        style1.href = "https://www.rezo-zero.com/css/app.css";
        document.head.appendChild(style1);

        const customStyles = document.createElement("style");
        customStyles.innerHTML = customStylesStr;
        document.head.appendChild(customStyles);

        let scripts = [
            { src: "https://www.rezo-zero.com/js/modern.vendors~app.js", type: "module", crossorigin: "anonymous" },
            { src: "https://www.rezo-zero.com/js/modern.app.js", type: "module", crossorigin: "anonymous" }
        ];

        scripts.forEach(s => {
            if (!document.querySelector("script[src='" + s.src + "']")) {
                const script = document.createElement("script");
                script.src = s.src;
                script.type = s.type;
                script.crossOrigin = s.crossorigin;
                document.body.appendChild(script);
            }
        });

        return () => {
            document.documentElement.className = "";
            document.body.className = "";
        };
    }, []);

    return (
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}